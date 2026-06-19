"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import MessageBubble from "@/components/MessageBubble";
import ComposerBar from "@/components/ComposerBar";
import NavBar from "@/components/NavBar";
import { Conversation, Message } from "@/lib/types";

const STORAGE_KEY = "grok-clone-conversations";

function makeId() {
  return Math.random().toString(36).slice(2);
}

function newConversation(): Conversation {
  return { id: makeId(), title: "", messages: [] };
}

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [model, setModel] = useState("openai");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed: Conversation[] = JSON.parse(saved);
      setConversations(parsed);
      if (parsed.length) setActiveId(parsed[0].id);
    } else {
      const first = newConversation();
      setConversations([first]);
      setActiveId(first.id);
    }
  }, []);

  useEffect(() => {
    if (conversations.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const updateActive = (updater: (c: Conversation) => Conversation) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? updater(c) : c))
    );
  };

  const handleNewChat = () => {
    const conv = newConversation();
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
  };

  const handleSend = async (text: string) => {
    if (!active) return;
    const userMsg: Message = { id: makeId(), role: "user", content: text };
    const pendingMsg: Message = {
      id: makeId(),
      role: "assistant",
      content: "",
      pending: true,
    };

    updateActive((c) => ({
      ...c,
      title: c.title || text.slice(0, 40),
      messages: [...c.messages, userMsg, pendingMsg],
    }));
    setBusy(true);

    try {
      const history = [...active.messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, model }),
      });
      const data = await res.json();
      updateActive((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === pendingMsg.id
            ? {
                ...m,
                pending: false,
                content: data.content ?? data.error ?? "Something went wrong.",
              }
            : m
        ),
      }));
    } catch (err) {
      updateActive((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === pendingMsg.id
            ? { ...m, pending: false, content: "Network error, please try again." }
            : m
        ),
      }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onNewChat={handleNewChat}
        />
        <div className="flex flex-1 flex-col">
          <main className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              {!active?.messages.length && (
                <div className="mt-24 text-center text-grok-accent/40">
                  <p className="text-2xl font-semibold text-grok-accent/70">
                    Ask anything.
                  </p>
                  <p className="mt-2 text-sm">
                    Free chat powered by Pollinations.ai — no API key required.
                  </p>
                </div>
              )}
              {active?.messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
            </div>
          </main>
          <ComposerBar
            model={model}
            onModelChange={setModel}
            onSend={handleSend}
            disabled={busy}
          />
        </div>
      </div>
    </div>
  );
}
