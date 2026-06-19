"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import { VideoItem } from "@/lib/types";

function makeId() {
  return Math.random().toString(36).slice(2);
}

export default function VideoStudio() {
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || busy) return;
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        const item: VideoItem = {
          id: makeId(),
          prompt,
          url: data.url,
          createdAt: Date.now(),
        };
        setVideos((prev) => [item, ...prev]);
      }
    } catch {
      setError("Network error, please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-2xl font-semibold text-grok-accent/90">
            Video Studio
          </h1>
          <p className="mt-1 text-sm text-grok-accent/50">
            Free text-to-video via Hugging Face&apos;s inference API. Requires
            a free token — see{" "}
            <code className="rounded bg-white/10 px-1">webapp/README.md</code>.
          </p>

          <div className="mt-6 rounded-2xl border border-grok-border bg-grok-panel p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to generate..."
              rows={3}
              className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-grok-accent/40"
            />
            <div className="mt-3 flex items-center justify-end">
              <button
                onClick={handleGenerate}
                disabled={busy || !prompt.trim()}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 disabled:opacity-30 transition-colors"
              >
                {busy ? "Generating (can take a minute)..." : "Generate"}
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </div>

          {videos.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-grok-border bg-grok-panel p-3"
                >
                  <video
                    src={v.url}
                    controls
                    className="w-full rounded-lg border border-grok-border"
                  />
                  <p className="mt-2 line-clamp-2 text-xs text-grok-accent/60">
                    {v.prompt}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <a
                      href={v.url}
                      download={`${v.id}.mp4`}
                      className="rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
