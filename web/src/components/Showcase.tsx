import { Play, Image as ImageIcon } from "lucide-react";
import Container from "./Container";
import { showcaseItems } from "@/lib/data";

export default function Showcase() {
  return (
    <section className="py-20" id="showcase">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore what&apos;s possible
          </h2>
          <p className="mt-3 text-gray-500">
            A glimpse of the videos and images creators are generating every
            day across our AI models.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {showcaseItems.map((item, i) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} ${
                i === 0 ? "col-span-2 row-span-2" : "aspect-square"
              } ${i === 0 ? "min-h-[260px] sm:min-h-[340px]" : ""}`}
            >
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/30" />
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur">
                {item.type === "video" ? <Play size={14} /> : <ImageIcon size={14} />}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="text-xs font-semibold text-white/80">{item.model}</p>
                <p className="line-clamp-2 text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-1 hidden text-xs text-white/70 group-hover:line-clamp-2 sm:line-clamp-1">
                  {item.prompt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
