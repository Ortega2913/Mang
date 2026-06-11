"use client";

import { useEffect, useState } from "react";
import { Wand2, Shuffle, Download, Loader2, ImageOff } from "lucide-react";
import { ASPECT_RATIOS, IMAGE_MODELS } from "@/lib/constants";
import { buildImageUrl, randomSeed } from "@/lib/pollinations";
import { downloadFile } from "@/lib/download";

type GeneratedImage = {
  url: string;
  prompt: string;
  model: string;
  aspectRatio: string;
  seed: number;
  createdAt: number;
};

const HISTORY_KEY = "lumora-image-history";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(IMAGE_MODELS[0].id);
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0].id);
  const [seed, setSeed] = useState<number>(() => randomSeed());
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persistHistory = (items: GeneratedImage[]) => {
    setHistory(items);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  };

  const handleEnhance = async () => {
    if (!prompt.trim() || enhancing) return;
    setEnhancing(true);
    setError(null);
    try {
      const res = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode: "image" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to enhance prompt");
      setPrompt(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to enhance prompt");
    } finally {
      setEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);

    const ratio = ASPECT_RATIOS.find((r) => r.id === aspectRatio) ?? ASPECT_RATIOS[0];
    const usedSeed = seed;
    const url = buildImageUrl({
      prompt,
      width: ratio.width,
      height: ratio.height,
      model,
      seed: usedSeed,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const newResult: GeneratedImage = {
        url,
        prompt,
        model,
        aspectRatio,
        seed: usedSeed,
        createdAt: Date.now(),
      };
      setResult(newResult);
      persistHistory([newResult, ...history].slice(0, 8));
      setLoading(false);
    };
    img.onerror = () => {
      setError(
        "Image generation failed or timed out. Please try again — the free model can occasionally be busy."
      );
      setLoading(false);
    };
    img.src = url;
  };

  const handleDownload = async (image: GeneratedImage) => {
    try {
      await downloadFile(image.url, `lumora-ai-${image.seed}.jpg`);
    } catch {
      window.open(image.url, "_blank");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Controls */}
      <div className="card flex flex-col gap-5 p-6 lg:col-span-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="A serene mountain lake at sunrise, mist over the water, ultra-detailed, cinematic lighting..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleEnhance}
            disabled={!prompt.trim() || enhancing}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enhancing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Wand2 size={14} />
            )}
            Enhance with AI
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Style
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {IMAGE_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                  model === m.id
                    ? "border-primary bg-primary/10 text-white"
                    : "border-border bg-background text-gray-400 hover:border-primary/50"
                }`}
              >
                <div className="font-semibold">{m.label}</div>
                <div className="mt-0.5 text-[10px] text-gray-500">
                  {m.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Aspect ratio
          </label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
          >
            {ASPECT_RATIOS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Seed
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value) || 0)}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
            <button
              onClick={() => setSeed(randomSeed())}
              title="Randomize seed"
              className="flex items-center justify-center rounded-xl border border-border bg-background px-3 text-gray-300 hover:border-primary/50 hover:text-white"
            >
              <Shuffle size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || loading}
          className="btn-primary mt-2 flex items-center justify-center gap-2 px-6 py-3 text-sm"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Wand2 size={18} /> Generate Image
            </>
          )}
        </button>

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </p>
        )}
      </div>

      {/* Result */}
      <div className="lg:col-span-3">
        <div className="card flex aspect-square w-full items-center justify-center overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="text-sm">Generating your image...</p>
            </div>
          ) : result ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={result.url}
              alt={result.prompt}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <ImageOff size={36} />
              <p className="text-sm">Your generated image will appear here</p>
            </div>
          )}
        </div>

        {result && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-md truncate text-sm text-gray-400">
              {result.prompt}
            </p>
            <button
              onClick={() => handleDownload(result)}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-light"
            >
              <Download size={16} /> Download
            </button>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-gray-300">
              Recent generations
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-8">
              {history.map((item) => (
                <button
                  key={`${item.url}-${item.createdAt}`}
                  onClick={() => setResult(item)}
                  className="aspect-square overflow-hidden rounded-lg border border-border hover:border-primary/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt={item.prompt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
