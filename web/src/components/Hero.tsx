import { Sparkles, Star } from "lucide-react";
import Container from "./Container";
import GenerationStudio from "./GenerationStudio";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow pb-16 pt-14 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.18)_0%,rgba(255,255,255,0)_70%)]" />

      <Container className="text-center">
        <div className="animate-fade-up mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
          <Sparkles size={14} />
          All AI video & image models, in one place
        </div>

        <h1 className="animate-fade-up mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl" style={{ animationDelay: "80ms" }}>
          Make Incredible{" "}
          <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
            AI Videos &amp; Images
          </span>{" "}
          With One Click
        </h1>

        <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-base text-gray-500 sm:text-lg" style={{ animationDelay: "160ms" }}>
          Generate, animate and edit stunning content using Veo, Kling,
          Runway, Luma and more — all from a single prompt box. No experience
          needed, free to start.
        </p>

        <div className="animate-fade-up mt-6 flex items-center justify-center gap-6 text-sm text-gray-500" style={{ animationDelay: "220ms" }}>
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {["from-brand-400 to-brand-600", "from-accent-400 to-accent-600", "from-pink-400 to-pink-600", "from-amber-400 to-amber-600"].map(
                (g, i) => (
                  <span
                    key={i}
                    className={`h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br ${g}`}
                  />
                )
              )}
            </div>
            <span className="font-semibold text-gray-700">2M+ creators</span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1 font-semibold text-gray-700">4.8/5</span>
          </div>
        </div>

        <div className="animate-fade-up mt-10" style={{ animationDelay: "300ms" }}>
          <GenerationStudio />
        </div>
      </Container>
    </section>
  );
}
