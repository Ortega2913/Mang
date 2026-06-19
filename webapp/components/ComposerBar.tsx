"use client";

import { useState, KeyboardEvent } from "react";
import { TEXT_MODELS } from "@/lib/types";

type Props = {
  model: string;
  onModelChange: (model: string) => void;
  onSend: (text: string) => void;
  disabled: boolean;
};

export default function ComposerBar({
  model,
  onModelChange,
  onSend,
  disabled,
}: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-grok-border bg-grok-bg p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-end">
          <select
            value={model}
            onChange={(e) => onModelChange(e.target.value)}
            className="rounded-full bg-transparent text-xs text-grok-accent/60 border border-grok-border px-2 py-1"
          >
            {TEXT_MODELS.map((m) => (
              <option key={m.id} value={m.id} className="bg-grok-panel">
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2 rounded-2xl border border-grok-border bg-grok-panel px-4 py-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-grok-accent/40"
          />
          <button
            onClick={handleSend}
            disabled={disabled || !text.trim()}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20 disabled:opacity-30 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
