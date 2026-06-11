"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import { pricingPlans } from "@/lib/data";

export default function PricingSection({ withHeading = true }: { withHeading?: boolean }) {
  const [yearly, setYearly] = useState(true);

  return (
    <section className="py-20" id="pricing">
      <Container>
        {withHeading && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple, credit-based pricing
            </h2>
            <p className="mt-3 text-gray-500">
              Start for free. Upgrade anytime for more credits, faster
              generation and premium models.
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!yearly ? "text-gray-900" : "text-gray-400"}`}>
            Monthly
          </span>
          <button
            onClick={() => setYearly((y) => !y)}
            className="relative h-7 w-12 rounded-full bg-gray-200"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-gradient-to-br from-brand-600 to-accent-500 transition-transform ${
                yearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-gray-900" : "text-gray-400"}`}>
            Yearly
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            Save 20%
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-brand-300 bg-white shadow-2xl shadow-brand-500/15 ring-1 ring-brand-200"
                  : "border-gray-100 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 px-3 py-1 text-xs font-bold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${yearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="pb-1 text-sm text-gray-500">/ month</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-brand-600">{plan.credits}</p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/create"
                className={`mt-6 rounded-xl px-4 py-2.5 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-md shadow-brand-500/30"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
