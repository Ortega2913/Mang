"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { ASPECT_RATIOS, IMAGE_MODELS, ImageItem } from "@/lib/types";

const STORAGE_KEY = "grok-clone-images";

function makeId() {
  return Math.random().toString(36).slice(2);
}

export default function ImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<string>(IMAGE_MODELS[0].id);
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0].id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setImages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }, [images]);

  const handleGenerate = async () => {
    if (!prompt.trim() || busy) return;
    setBusy(true);
    setError(null);

    const ratio = ASPECT_RATIOS.find((r) => r.id === aspectRatio)!;

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model,
          width: ratio.width,
          height: ratio.height,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        const item: ImageItem = {
          id: makeId(),
          prompt,
          url: data.url,
          model,
          aspectRatio,
          createdAt: Date.now(),
        };
        setImages((prev) => [item, ...prev]);
      }
    } catch {
      setError("Network error, please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-semibold text-grok-accent/90">
            Image Studio
          </h1>
          <p className="mt-1 text-sm text-grok-accent/50">
            Free, keyless image generation powered by Pollinations.ai.
          </p>

          <div className="mt-6 rounded-2xl border border-grok-border bg-grok-panel p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              rows={3}
              className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-grok-accent/40"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="rounded-full border border-grok-border bg-transparent px-3 py-1.5 text-xs text-grok-accent/70"
              >
                {IMAGE_MODELS.map((m) => (
                  <option key={m.id} value={m.id} className="bg-grok-panel">
                    {m.label}
                  </option>
                ))}
              </select>

              <div className="flex gap-1">
                {ASPECT_RATIOS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setAspectRatio(r.id)}
                    className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                      aspectRatio === r.id
                        ? "bg-white/15 text-grok-accent"
                        : "text-grok-accent/50 hover:bg-white/5"
                    }`}
                  >
                    {r.label} ({r.id})
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={busy || !prompt.trim()}
                className="ml-auto rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 disabled:opacity-30 transition-colors"
              >
                {busy ? "Generating..." : "Generate"}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}
          </div>

          {images.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-xl border border-grok-border bg-grok-panel"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.prompt}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/0 to-black/0 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="line-clamp-2 text-xs text-white/90">
                      {img.prompt}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <a
                        href={img.url}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white/20 px-2 py-1 text-xs text-white hover:bg-white/30"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="rounded-full bg-white/20 px-2 py-1 text-xs text-white hover:bg-white/30"
                      >
                        Delete
                      </button>
                    </div>
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
