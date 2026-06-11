import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const HF_MODEL = "damo-vilab/text-to-video-ms-1.7b";

export async function POST(req: NextRequest) {
  const token = process.env.HF_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error:
          "Pro text-to-video is not configured on this deployment. Add a free " +
          "Hugging Face token as the HF_API_TOKEN environment variable to enable it. " +
          "You can still use the AI Slideshow video generator below, which works without any setup.",
        code: "NOT_CONFIGURED",
      },
      { status: 501 }
    );
  }

  let body: { prompt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = (body.prompt || "").trim();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const upstream = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const contentType = upstream.headers.get("content-type") || "";

    if (!upstream.ok || contentType.includes("application/json")) {
      const data = await upstream.json().catch(() => ({}));
      if (data?.estimated_time) {
        return NextResponse.json(
          {
            error: `The video model is warming up. Try again in about ${Math.ceil(
              data.estimated_time
            )} seconds.`,
            code: "LOADING",
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        {
          error:
            data?.error ||
            `Hugging Face request failed (${upstream.status}). The free inference API may be unavailable for this model right now.`,
        },
        { status: 502 }
      );
    }

    const buffer = await upstream.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType || "video/mp4",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
