import type { Metadata } from "next";
import ImageGenerator from "@/components/ImageGenerator";

export const metadata: Metadata = {
  title: "AI Image Generator — Lumora AI",
  description:
    "Generate free AI images from text prompts in multiple styles, including realism, anime, and 3D render.",
};

export default function ImagePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          AI <span className="text-gradient">Image Generator</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-400">
          Describe anything you can imagine and watch it come to life.
          Free, fast, and no sign-up required.
        </p>
      </div>
      <ImageGenerator />
    </div>
  );
}
