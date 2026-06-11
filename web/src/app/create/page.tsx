import { Sparkles } from "lucide-react";
import Container from "@/components/Container";
import GenerationStudio from "@/components/GenerationStudio";

export const metadata = {
  title: "AI Generator Studio — Pollo AI Studio",
  description:
    "Generate AI videos, images and avatars with Veo, Kling, Runway, Luma and more.",
};

export default function CreatePage() {
  return (
    <section className="bg-hero-glow py-14">
      <Container className="text-center">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
          <Sparkles size={14} />
          AI Generator Studio
        </div>
        <h1 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Create something amazing
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          Pick a mode, choose your model, describe your idea and generate.
          This is a demo workspace — outputs are placeholders.
        </p>

        <div className="mt-10">
          <GenerationStudio compact />
        </div>
      </Container>
    </section>
  );
}
