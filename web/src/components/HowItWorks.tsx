import Container from "./Container";
import { steps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            From idea to output in three steps
          </h2>
          <p className="mt-3 text-gray-500">
            No timelines, no software to learn — just describe what you want.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent md:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              <div className="z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-lg font-extrabold text-white shadow-lg shadow-brand-500/30">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
