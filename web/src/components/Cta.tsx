import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "./Container";

export default function Cta() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 px-6 py-14 text-center sm:px-12">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <Sparkles className="mx-auto mb-4 text-white" size={32} />
          <h2 className="mx-auto max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Start creating with AI today
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">
            Join millions of creators and bring your ideas to life — free to
            get started, no credit card required.
          </p>
          <Link
            href="/create"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 shadow-xl transition-transform hover:scale-105"
          >
            Get Started Free
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
