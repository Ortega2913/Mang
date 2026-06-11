import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const TEXT_API = "https://text.pollinations.ai/openai";

async function callTextModel(messages: { role: string; content: string }[]) {
  const res = await fetch(TEXT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages,
      seed: Math.floor(Math.random() * 1_000_000),
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Text model request failed (${res.status})`);
  }

  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Text model returned an empty response");
  }
  return content.trim();
}

export async function POST(req: NextRequest) {
  let body: { prompt?: string; mode?: string; count?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const prompt = (body.prompt || "").trim();
  const mode = body.mode === "scenes" ? "scenes" : "image";
  const count = Math.min(Math.max(body.count ?? 4, 2), 8);

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    if (mode === "image") {
      const content = await callTextModel([
        {
          role: "system",
          content:
            "You are a creative assistant that rewrites short ideas into a single, vivid, highly detailed prompt for an AI image generator. " +
            "Respond with ONLY the improved prompt as one paragraph (comma-separated descriptive phrases covering subject, setting, lighting, mood, art style, composition). " +
            "Do not add quotes, labels, or explanations.",
        },
        { role: "user", content: prompt },
      ]);
      return NextResponse.json({ result: content });
    }

    // mode === "scenes"
    const content = await callTextModel([
      {
        role: "system",
        content:
          `You are a creative assistant that breaks a short video idea into ${count} distinct visual scenes for an AI image generator. ` +
          `Respond with ONLY a valid JSON array of exactly ${count} strings. Each string is one self-contained, vivid image-generation prompt ` +
          "describing a single shot/scene (subject, setting, action, lighting, art style). The scenes should flow together as a short story or sequence. " +
          "No markdown, no extra text, just the JSON array.",
      },
      { role: "user", content: prompt },
    ]);

    let scenes: string[] = [];
    try {
      const cleaned = content
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        scenes = parsed.map((s) => String(s)).filter(Boolean);
      }
    } catch {
      scenes = content
        .split("\n")
        .map((line) => line.replace(/^[\d.\-*\s"]+/, "").replace(/["]+$/, "").trim())
        .filter(Boolean);
    }

    if (scenes.length === 0) {
      // Fallback: simple variations of the base prompt
      scenes = Array.from({ length: count }, (_, i) => `${prompt}, scene ${i + 1}`);
    }

    scenes = scenes.slice(0, count);
    while (scenes.length < count) {
      scenes.push(`${prompt}, scene ${scenes.length + 1}`);
    }

    return NextResponse.json({ result: scenes });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
