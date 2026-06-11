"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/image", label: "Image Generator" },
  { href: "/video", label: "Video Generator" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand">
            <Sparkles className="h-4.5 w-4.5 text-white" size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Lumora <span className="text-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/image" className="btn-primary px-5 py-2.5 text-sm">
            Start Creating
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-surface hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/image"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 px-5 py-2.5 text-center text-sm"
          >
            Start Creating
          </Link>
        </nav>
      )}
    </header>
  );
}
