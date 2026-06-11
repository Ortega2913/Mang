import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
        <span className="text-lg font-black text-white">P</span>
      </span>
      <span className="text-lg font-extrabold tracking-tight text-gray-900">
        Pollo<span className="text-brand-600">AI</span>
      </span>
    </Link>
  );
}
