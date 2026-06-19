import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatBody = {
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  model?: string;
};

// Pollinations.ai exposes a free, keyless, OpenAI-compatible chat endpoint.
const POLLINATIONS_CHAT_URL = "https://text.pollinations.ai/openai";

export async function POST(req: NextRequest) {
  const body: ChatBody = await req.json();
  const model = body.model || "openai";

  const upstream = await fetch(POLLINATIONS_CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are Grok, a witty, helpful AI assistant. Keep answers concise and clear.",
        },
        ...body.messages,
      ],
      stream: false,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      { error: `Upstream chat provider error (${upstream.status}): ${text}` },
      { status: 502 }
    );
  }

  const data = await upstream.json();
  const content =
    data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

  return NextResponse.json({ content });
}
