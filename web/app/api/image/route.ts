import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prompt = (searchParams.get("prompt") || "").trim();
  const width = searchParams.get("width") || "1024";
  const height = searchParams.get("height") || "1024";
  const model = searchParams.get("model") || "flux";
  const seed = searchParams.get("seed") || "0";

  if (!prompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  const upstreamUrl =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=${encodeURIComponent(width)}&height=${encodeURIComponent(
      height
    )}&model=${encodeURIComponent(model)}&seed=${encodeURIComponent(
      seed
    )}&nologo=true`;

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LumoraAI/1.0)" },
      cache: "no-store",
    });

    if (!upstream.ok || !upstream.body) {
      return new Response("Failed to generate image", {
        status: upstream.status || 502,
      });
    }

    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Failed to reach image generation service", {
      status: 502,
    });
  }
}
