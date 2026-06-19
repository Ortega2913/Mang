"use client";

import ReactMarkdown from "react-markdown";
import { Message } from "@/lib/types";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl rounded-2xl px-4 py-3 ${
          isUser ? "bg-white/10" : "bg-transparent"
        }`}
      >
        {message.pending ? (
          <div className="flex gap-1 py-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-grok-accent/60 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-grok-accent/60 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-grok-accent/60" />
          </div>
        ) : (
          <>
            {message.content && (
              <div className="prose-grok text-sm leading-relaxed">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
            {message.attachment?.type === "image" && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={message.attachment.url}
                alt="Generated"
                className="mt-2 max-w-sm rounded-xl border border-grok-border"
              />
            )}
            {message.attachment?.type === "video" && (
              <video
                src={message.attachment.url}
                controls
                className="mt-2 max-w-sm rounded-xl border border-grok-border"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
