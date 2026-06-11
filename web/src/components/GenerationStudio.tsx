"use client";

import { useEffect, useRef, useState } from "react";
import {
  Wand2,
  Image as ImageIcon,
  Video,
  UserRound,
  Upload,
  Download,
  RefreshCw,
  Loader2,
  Sparkles,
  Coins,
} from "lucide-react";
import {
  aiModels,
  aspectRatios,
  durations,
  generationModes,
} from "@/lib/data";

const modeIcons: Record<string, React.ElementType> = {
  "text-to-video": Video,
  "image-to-video": ImageIcon,
  "text-to-image": Wand2,
  "ai-avatar": UserRound,
};

const examplePrompts: Record<string, string> = {
  "text-to-video":
    "A golden retriever puppy running through a sunlit meadow, slow motion, cinematic",
  "image-to-video": "Make the clouds drift slowly and add gentle camera parallax",
  "text-to-image":
    "A futuristic city skyline at sunset, ultra detailed, volumetric lighting, 8k",
  "ai-avatar": "Hi everyone! Welcome back to our channel — today we're diving into...",
};

const resultGradients = [
  "from-indigo-600 via-purple-600 to-pink-500",
  "from-amber-400 via-orange-500 to-red-400",
  "from-cyan-500 via-teal-500 to-emerald-400",
  "from-fuchsia-500 via-purple-500 to-indigo-500",
  "from-blue-500 via-cyan-400 to-emerald-400",
];

export default function GenerationStudio({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState(generationModes[0]);
  const [model, setModel] = useState(aiModels[0]);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0]);
  const [duration, setDuration] = useState(durations[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ gradient: string; mode: string } | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const found = generationModes.find((m) => m.id === hash);
    // Sync the active tab with the URL hash on initial load (e.g. /create#text-to-image).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (found) setMode(found);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isVideo = mode.id !== "text-to-image";

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setResult(null);
    timeoutRef.current = setTimeout(() => {
      const gradient =
        resultGradients[Math.floor(Math.random() * resultGradients.length)];
      setResult({ gradient, mode: mode.label });
      setIsGenerating(false);
    }, 2200);
  };

  return (
    <div
      id="generator"
      className="relative mx-auto w-full max-w-5xl rounded-3xl border border-gray-100 bg-white/80 p-3 shadow-2xl shadow-brand-500/10 backdrop-blur-xl sm:p-5"
    >
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-3">
        {generationModes.map((m) => {
          const Icon = modeIcons[m.id] ?? Wand2;
          const active = m.id === mode.id;
          return (
            <button
              key={m.id}
              id={m.id}
              onClick={() => {
                setMode(m);
                setResult(null);
                setImageUploaded(false);
              }}
              className={`flex scroll-mt-24 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                active
                  ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-md shadow-brand-500/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon size={15} />
              {m.label}
            </button>
          );
        })}
      </div>

      <div className={`mt-4 grid gap-4 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-2"}`}>
        {/* Left: controls */}
        <div className="flex flex-col gap-4">
          {mode.needsImage && (
            <button
              onClick={() => setImageUploaded((v) => !v)}
              className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-brand-300 hover:text-brand-500"
            >
              {imageUploaded ? (
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-brand-200 via-brand-300 to-accent-300">
                  <span className="text-xs font-semibold text-white drop-shadow">
                    reference-image.jpg
                  </span>
                </div>
              ) : (
                <>
                  <Upload size={22} />
                  <span className="text-xs font-medium">
                    Click to upload a reference image
                  </span>
                </>
              )}
            </button>
          )}

          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                mode.id === "ai-avatar"
                  ? "Type the script your avatar should say..."
                  : "Describe what you want to create..."
              }
              rows={4}
              className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button
              onClick={() => setPrompt(examplePrompts[mode.id])}
              className="mt-2 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              ✨ Try an example prompt
            </button>
          </div>

          {/* Model selector */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Model
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {aiModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                    model.id === m.id
                      ? "border-brand-400 bg-brand-50 text-brand-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-gradient-to-br ${m.gradient}`}
                  />
                  {m.name}
                  {m.badge && (
                    <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {m.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Aspect ratio
              </p>
              <div className="flex gap-1.5">
                {aspectRatios.map((ar) => (
                  <button
                    key={ar}
                    onClick={() => setAspectRatio(ar)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      aspectRatio === ar
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {ar}
                  </button>
                ))}
              </div>
            </div>

            {isVideo && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Duration
                </p>
                <div className="flex gap-1.5">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                        duration === d
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate
              </>
            )}
            <span className="ml-1 flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
              <Coins size={12} />
              {isVideo ? "20" : "4"} credits
            </span>
          </button>
        </div>

        {/* Right: preview */}
        <div
          className={`relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 ${
            aspectRatio === "9:16" ? "lg:aspect-[9/16] lg:max-h-[420px]" : "lg:aspect-video"
          }`}
        >
          {!result && !isGenerating && (
            <div className="flex flex-col items-center gap-2 px-6 text-center text-gray-400">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                {isVideo ? <Video size={24} /> : <ImageIcon size={24} />}
              </div>
              <p className="text-sm font-medium">
                Your AI {isVideo ? "video" : "image"} will appear here
              </p>
              <p className="text-xs text-gray-400">
                Powered by {model.name} · {aspectRatio}
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gray-100">
              <div className="shimmer-bg h-full w-full animate-shimmer absolute inset-0 opacity-60" />
              <Loader2 size={28} className="z-10 animate-spin text-brand-500" />
              <p className="z-10 text-sm font-semibold text-gray-600">
                Rendering with {model.name}...
              </p>
            </div>
          )}

          {result && !isGenerating && (
            <div
              className={`relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${result.gradient} p-6 text-center text-white animate-fade-up`}
            >
              <Sparkles size={28} />
              <p className="text-sm font-semibold drop-shadow">
                Demo {result.mode.toLowerCase()} result
              </p>
              <p className="max-w-xs text-xs text-white/80">
                This is a placeholder preview. Connect a real model API to
                generate actual media.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/30"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
                <button className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/30">
                  <Download size={13} />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
