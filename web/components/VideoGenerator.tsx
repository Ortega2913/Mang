"use client";

import { useEffect, useRef, useState } from "react";
import {
  Wand2,
  Loader2,
  Download,
  Film,
  AlertCircle,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  IMAGE_MODELS,
  VIDEO_ASPECT_RATIOS,
  SCENE_COUNTS,
  SECONDS_PER_SCENE,
} from "@/lib/constants";
import { buildImageUrl, randomSeed } from "@/lib/pollinations";
import {
  loadImage,
  renderSlideshowVideo,
  extensionForMimeType,
} from "@/lib/video";

type Stage = "idle" | "scenes" | "images" | "rendering" | "done" | "error";

const STAGE_LABELS: Record<Stage, string> = {
  idle: "",
  scenes: "Writing scene descriptions with AI...",
  images: "Generating scene images...",
  rendering: "Rendering your video...",
  done: "Done!",
  error: "Something went wrong",
};

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(IMAGE_MODELS[0].id);
  const [aspectRatio, setAspectRatio] = useState(VIDEO_ASPECT_RATIOS[0].id);
  const [sceneCount, setSceneCount] = useState(4);
  const [secondsPerScene, setSecondsPerScene] = useState(3);

  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [scenes, setScenes] = useState<string[]>([]);
  const [sceneImages, setSceneImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoExt, setVideoExt] = useState("webm");

  const videoUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    };
  }, []);

  const busy =
    stage === "scenes" || stage === "images" || stage === "rendering";

  const handleGenerate = async () => {
    if (!prompt.trim() || busy) return;
    setError(null);
    setScenes([]);
    setSceneImages([]);
    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current);
      videoUrlRef.current = null;
    }
    setVideoUrl(null);
    setProgress(0);

    try {
      // 1. Plan scenes with AI
      setStage("scenes");
      const sceneRes = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode: "scenes", count: sceneCount }),
      });
      const sceneData = await sceneRes.json();
      if (!sceneRes.ok)
        throw new Error(sceneData.error || "Failed to plan scenes");
      const sceneList: string[] = sceneData.result;
      setScenes(sceneList);

      // 2. Generate an image per scene
      setStage("images");
      const ratio =
        VIDEO_ASPECT_RATIOS.find((r) => r.id === aspectRatio) ??
        VIDEO_ASPECT_RATIOS[0];

      const images: HTMLImageElement[] = [];
      const urls: string[] = [];
      for (let i = 0; i < sceneList.length; i++) {
        const url = buildImageUrl({
          prompt: sceneList[i],
          width: ratio.width,
          height: ratio.height,
          model,
          seed: randomSeed(),
        });
        const img = await loadImage(url);
        images.push(img);
        urls.push(url);
        setSceneImages([...urls]);
        setProgress((i + 1) / sceneList.length);
      }

      // 3. Render to video on canvas
      setStage("rendering");
      setProgress(0);
      const { blob, mimeType } = await renderSlideshowVideo({
        images,
        width: ratio.width,
        height: ratio.height,
        secondsPerScene,
        onProgress: setProgress,
      });

      const url = URL.createObjectURL(blob);
      videoUrlRef.current = url;
      setVideoUrl(url);
      setVideoExt(extensionForMimeType(mimeType));
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStage("error");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      {/* Controls */}
      <div className="card flex flex-col gap-5 p-6 lg:col-span-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Describe your video
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="A lone astronaut exploring an abandoned alien city, discovering ancient technology..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:outline-none"
          />
          <p className="mt-2 text-xs text-gray-500">
            Lumora AI will turn your idea into {sceneCount} AI-generated
            scenes and animate them into a short video.
          </p>
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
                disabled={busy}
                className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Aspect ratio
            </label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              disabled={busy}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none disabled:opacity-50"
            >
              {VIDEO_ASPECT_RATIOS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Scenes
            </label>
            <select
              value={sceneCount}
              onChange={(e) => setSceneCount(Number(e.target.value))}
              disabled={busy}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none disabled:opacity-50"
            >
              {SCENE_COUNTS.map((c) => (
                <option key={c} value={c}>
                  {c} scenes
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Seconds per scene
          </label>
          <select
            value={secondsPerScene}
            onChange={(e) => setSecondsPerScene(Number(e.target.value))}
            disabled={busy}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none disabled:opacity-50"
          >
            {SECONDS_PER_SCENE.map((s) => (
              <option key={s} value={s}>
                {s}s ({s * sceneCount}s total)
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || busy}
          className="btn-primary mt-2 flex items-center justify-center gap-2 px-6 py-3 text-sm"
        >
          {busy ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Film size={18} /> Generate Video
            </>
          )}
        </button>

        {busy && (
          <div>
            <div className="mb-1.5 flex justify-between text-xs text-gray-400">
              <span>{STAGE_LABELS[stage]}</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-light">
              <div
                className="h-full rounded-full bg-gradient-brand transition-all"
                style={{ width: `${Math.max(4, progress * 100)}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}
      </div>

      {/* Result */}
      <div className="lg:col-span-3">
        <div className="card flex aspect-video w-full items-center justify-center overflow-hidden">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              loop
              className="h-full w-full object-contain"
            />
          ) : busy ? (
            <div className="flex flex-col items-center gap-3 px-6 text-center text-gray-400">
              <Loader2 size={32} className="animate-spin text-primary" />
              <p className="text-sm">{STAGE_LABELS[stage]}</p>
              {sceneImages.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {sceneImages.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt="scene preview"
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Film size={36} />
              <p className="text-sm">Your generated video will appear here</p>
            </div>
          )}
        </div>

        {videoUrl && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
              {sceneCount} scenes · {secondsPerScene * sceneCount}s
            </p>
            <a
              href={videoUrl}
              download={`lumora-ai-video.${videoExt}`}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-light"
            >
              <Download size={16} /> Download
            </a>
          </div>
        )}

        {scenes.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold text-gray-300">
              AI-written scenes
            </h3>
            <ol className="space-y-2 text-sm text-gray-400">
              {scenes.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 font-semibold text-primary">
                    {i + 1}.
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <ProVideoGenerator prompt={prompt} />
      </div>
    </div>
  );
}

function ProVideoGenerator({ prompt }: { prompt: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current);
      videoUrlRef.current = null;
    }
    setVideoUrl(null);

    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      videoUrlRef.current = url;
      setVideoUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mt-8 p-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles size={16} className="text-secondary" />
          Experimental: Pro Text-to-Video (AI model)
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-4 space-y-3 text-sm text-gray-400">
          <p>
            This optional mode sends your prompt to a real text-to-video AI
            model via Hugging Face&apos;s free Inference API. It requires the
            site owner to configure a free{" "}
            <code className="rounded bg-surface-light px-1 py-0.5 text-xs">
              HF_API_TOKEN
            </code>{" "}
            environment variable. Generation can take a minute and may
            occasionally be unavailable on the free tier.
          </p>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || loading}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Wand2 size={16} />
            )}
            Try Pro Generation
          </button>

          {error && (
            <p className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          {videoUrl && (
            <video
              src={videoUrl}
              controls
              autoPlay
              loop
              className="mt-2 max-h-80 w-full rounded-xl bg-black"
            />
          )}
        </div>
      )}
    </div>
  );
}
