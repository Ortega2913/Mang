"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Chat" },
  { href: "/image", label: "Image Studio" },
  { href: "/video", label: "Video Studio" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-center gap-1 border-b border-grok-border bg-grok-bg py-3">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            pathname === link.href
              ? "bg-white/10 text-grok-accent"
              : "text-grok-accent/50 hover:bg-white/5"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </header>
  );
}
