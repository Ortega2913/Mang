import type { Metadata } from "next";
import VideoGenerator from "@/components/VideoGenerator";

export const metadata: Metadata = {
  title: "AI Video Generator — Lumora AI",
  description:
    "Turn a text prompt into a short AI-generated video. Free, browser-based, no sign-up required.",
};

export default function VideoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          AI <span className="text-gradient">Video Generator</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-400">
          Describe a story and Lumora AI will write the scenes, generate AI
          art for each one, and animate them into a downloadable video —
          all for free, right in your browser.
        </p>
      </div>
      <VideoGenerator />
    </div>
  );
}
