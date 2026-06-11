import {
  Clapperboard,
  Image as ImageIcon,
  UserRound,
  AudioLines,
  Repeat,
  Sparkles,
  Maximize2,
  Layers,
  Wand2,
  ArrowUpRight,
} from "lucide-react";
import Container from "./Container";
import { tools } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Clapperboard,
  Image: ImageIcon,
  UserRound,
  AudioLines,
  Repeat,
  Sparkles,
  Maximize2,
  Layers,
  Wand2,
};

export default function Features() {
  return (
    <section className="bg-gray-50/60 py-20" id="tools">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Your all-in-one AI creative suite
          </h2>
          <p className="mt-3 text-gray-500">
            Every tool you need to create, edit and enhance content — built
            on the best AI models available.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon] ?? Sparkles;
            return (
              <div
                key={tool.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-gray-200/60"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} text-white`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">
                  {tool.name}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500">{tool.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Try now <ArrowUpRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
