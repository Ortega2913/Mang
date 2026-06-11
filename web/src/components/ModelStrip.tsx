import Container from "./Container";
import { aiModels } from "@/lib/data";

export default function ModelStrip() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/60 py-8">
      <Container>
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Powered by the world&apos;s leading AI models
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {aiModels.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-800"
            >
              <span className={`h-3 w-3 rounded-full bg-gradient-to-br ${m.gradient}`} />
              {m.name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
