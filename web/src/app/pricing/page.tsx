import { Sparkles } from "lucide-react";
import Container from "@/components/Container";
import PricingSection from "@/components/PricingSection";
import Faq from "@/components/Faq";

export const metadata = {
  title: "Pricing — Pollo AI Studio",
  description: "Simple, credit-based pricing for AI video and image generation.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-hero-glow pt-14">
        <Container className="text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
            <Sparkles size={14} />
            Plans &amp; Pricing
          </div>
          <h1 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Pricing that scales with your creativity
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-500">
            Every plan includes access to our full suite of AI video, image
            and avatar tools. Upgrade or cancel anytime.
          </p>
        </Container>
      </section>
      <PricingSection withHeading={false} />
      <Faq />
    </>
  );
}
