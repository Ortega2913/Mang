"use client";

import { Conversation } from "@/lib/types";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
};

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: Props) {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-grok-border bg-grok-panel">
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full rounded-lg border border-grok-border px-3 py-2 text-left text-sm hover:bg-white/5 transition-colors"
        >
          + New chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full truncate rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              c.id === activeId
                ? "bg-white/10"
                : "hover:bg-white/5 text-grok-accent/80"
            }`}
          >
            {c.title || "New conversation"}
          </button>
        ))}
      </div>
      <div className="p-3 text-xs text-grok-accent/40 border-t border-grok-border">
        Free Grok-style clone — powered by free APIs
      </div>
    </aside>
  );
}
