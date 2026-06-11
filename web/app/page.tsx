import Link from "next/link";
import {
  ImageIcon,
  Video,
  Wand2,
  Zap,
  Download,
  Lock,
  ArrowRight,
} from "lucide-react";

const SHOWCASE_PROMPTS = [
  "a majestic dragon flying over a cyberpunk city, neon lights, cinematic",
  "a cozy cabin in a snowy forest at night, warm lights, photorealistic",
  "an astronaut floating in space surrounded by colorful nebulae",
  "a futuristic samurai warrior, anime style, dramatic lighting",
];

function showcaseUrl(prompt: string, seed: number) {
  const params = new URLSearchParams({
    width: "512",
    height: "512",
    model: "flux",
    seed: String(seed),
    nologo: "true",
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?${params.toString()}`;
}

const FEATURES = [
  {
    icon: Zap,
    title: "100% Free",
    description: "No subscriptions, no credit limits, no hidden fees.",
  },
  {
    icon: Lock,
    title: "No Sign-Up Required",
    description: "Start generating instantly — no account needed.",
  },
  {
    icon: Wand2,
    title: "AI Prompt Enhancer",
    description: "Turn a simple idea into a detailed, vivid prompt.",
  },
  {
    icon: Download,
    title: "Instant Downloads",
    description: "Save your creations directly to your device.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Describe your idea",
    description:
      "Type what you want to see — a scene, character, object, or style.",
  },
  {
    step: "2",
    title: "Choose your settings",
    description:
      "Pick an art style, aspect ratio, and let our AI enhance your prompt.",
  },
  {
    step: "3",
    title: "Generate & download",
    description:
      "Get your AI-generated image or video in seconds, ready to use anywhere.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-radial">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-gray-300">
              <Zap size={14} className="text-secondary" />
              Free AI Image &amp; Video Generation
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Create stunning <span className="text-gradient">AI images</span>{" "}
              &amp; <span className="text-gradient">videos</span> in seconds
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
              Lumora AI turns your text prompts into high-quality images and
              short AI-generated videos — completely free, with no sign-up
              and no API keys required.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/image"
                className="btn-primary flex items-center gap-2 px-7 py-3.5 text-base"
              >
                <ImageIcon size={20} />
                Generate an Image
              </Link>
              <Link
                href="/video"
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-7 py-3.5 text-base font-semibold text-gray-200 transition-colors hover:bg-surface-light"
              >
                <Video size={20} />
                Generate a Video
              </Link>
            </div>
          </div>

          {/* Showcase grid */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {SHOWCASE_PROMPTS.map((prompt, i) => (
              <div
                key={prompt}
                className="aspect-square overflow-hidden rounded-2xl border border-border bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={showcaseUrl(prompt, 42 + i)}
                  alt={prompt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="card p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand">
                <feature.icon className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Two powerful AI tools, one place
          </h2>
          <p className="mt-3 text-gray-400">
            Pick a tool below and start creating — it&apos;s free.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Link
            href="/image"
            className="card group flex flex-col justify-between p-8 transition-colors hover:border-primary/60"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                <ImageIcon className="text-white" size={22} />
              </div>
              <h3 className="text-2xl font-bold">AI Image Generator</h3>
              <p className="mt-3 text-gray-400">
                Generate high-resolution images from text in multiple
                styles — realism, anime, 3D render, and more. Choose your
                aspect ratio and download instantly.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Try it now{" "}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>

          <Link
            href="/video"
            className="card group flex flex-col justify-between p-8 transition-colors hover:border-primary/60"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                <Video className="text-white" size={22} />
              </div>
              <h3 className="text-2xl font-bold">AI Video Generator</h3>
              <p className="mt-3 text-gray-400">
                Describe a story and Lumora AI generates a sequence of
                AI-art scenes, then animates them into a downloadable video
                with smooth transitions — right in your browser.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Try it now{" "}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-lg font-bold">
                {s.step}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="card flex flex-col items-center gap-6 px-8 py-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to bring your ideas to life?
          </h2>
          <p className="max-w-xl text-gray-400">
            No credit card, no waitlist. Start generating AI images and
            videos right now.
          </p>
          <Link
            href="/image"
            className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base"
          >
            <Wand2 size={20} />
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
