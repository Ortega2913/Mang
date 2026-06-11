import Link from "next/link";
import { Twitter, Youtube, Instagram, Github } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "AI Video Generator", href: "/create#text-to-video" },
    { label: "AI Image Generator", href: "/create#text-to-image" },
    { label: "Image to Video", href: "/create#image-to-video" },
    { label: "AI Avatar", href: "/create#ai-avatar" },
    { label: "Pricing", href: "/pricing" },
  ],
  Tools: [
    { label: "Lip Sync", href: "/#tools" },
    { label: "Face Swap", href: "/#tools" },
    { label: "Image Upscaler", href: "/#tools" },
    { label: "Background Remover", href: "/#tools" },
    { label: "AI Anime Generator", href: "/#tools" },
  ],
  Company: [
    { label: "About", href: "/#" },
    { label: "Blog", href: "/#" },
    { label: "Careers", href: "/#" },
    { label: "Affiliate Program", href: "/#" },
    { label: "Contact", href: "/#" },
  ],
  Resources: [
    { label: "Help Center", href: "/#faq" },
    { label: "API Docs", href: "/#" },
    { label: "Community", href: "/#" },
    { label: "Terms of Service", href: "/#" },
    { label: "Privacy Policy", href: "/#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-500">
              The all-in-one AI creative studio for generating videos, images
              and avatars with the world&apos;s leading AI models.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Youtube, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-brand-300 hover:text-brand-600"
                  aria-label="social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-gray-900">{heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Pollo AI Studio Replica. Built for
            demo purposes — not affiliated with pollo.ai.
          </p>
          <p className="text-xs text-gray-400">
            Made with Next.js · Tailwind CSS · Deployed on GitHub Pages
          </p>
        </div>
      </Container>
    </footer>
  );
}
