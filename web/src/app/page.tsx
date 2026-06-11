import Hero from "@/components/Hero";
import ModelStrip from "@/components/ModelStrip";
import Showcase from "@/components/Showcase";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ModelStrip />
      <Showcase />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <Faq />
      <Cta />
    </>
  );
}
