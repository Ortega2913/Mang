import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Free text-to-video generation via Hugging Face's Inference API.
// Requires a free HF account + access token (set HF_API_TOKEN in .env.local).
// HF tokens are free to create at https://huggingface.co/settings/tokens
const HF_MODEL = "damo-vilab/text-to-video-ms-1.7b";
const HF_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const token = process.env.HF_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Video generation needs a free Hugging Face API token. Create one at " +
          "https://huggingface.co/settings/tokens and set HF_API_TOKEN in webapp/.env.local, then restart the server.",
      },
      { status: 501 }
    );
  }

  const upstream = await fetch(HF_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    let message = `Video provider error (${upstream.status}): ${text}`;
    try {
      const parsed = JSON.parse(text);
      if (parsed.estimated_time) {
        message = `Model is warming up on Hugging Face's free tier, try again in ~${Math.ceil(
          parsed.estimated_time
        )}s.`;
      } else if (parsed.error) {
        message = parsed.error;
      }
    } catch {
      // ignore parse errors, keep default message
    }
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const buffer = Buffer.from(await upstream.arrayBuffer());
  const base64 = buffer.toString("base64");
  return NextResponse.json({ url: `data:video/mp4;base64,${base64}` });
}
