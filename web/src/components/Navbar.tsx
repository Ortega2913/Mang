"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { navItems } from "@/lib/data";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.items && setOpenMenu(item.label)}
                onMouseLeave={() => item.items && setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {item.label}
                  {item.items && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {item.items && openMenu === item.label && (
                  <div className="absolute left-0 top-full w-72 pt-2">
                    <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-900/5">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50"
                        >
                          <span className="text-sm font-semibold text-gray-900">
                            {sub.label}
                          </span>
                          {sub.description && (
                            <span className="text-xs text-gray-500">
                              {sub.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/create"
            className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Log in
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/30 transition-transform hover:scale-105"
          >
            <Sparkles size={15} />
            Get Started Free
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 lg:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.items && (
                  <div className="ml-3 flex flex-col border-l border-gray-100 pl-3">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="rounded-lg px-3 py-1.5 text-sm text-gray-600"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/create"
                className="rounded-full border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/create"
                className="rounded-full bg-gradient-to-r from-brand-600 to-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
