import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Pollinations.ai image generation is free and keyless — it serves the
// generated image directly from a GET URL, so we just build that URL.
export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const seed = Math.floor(Math.random() * 1_000_000);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=1024&height=1024&seed=${seed}&nologo=true`;

  return NextResponse.json({ url });
}
