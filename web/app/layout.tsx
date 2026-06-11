import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lumora AI — Free AI Image & Video Generator",
  description:
    "Generate stunning AI images and videos for free, right in your browser. No sign-up, no API keys required.",
  metadataBase: new URL("https://lumora-ai.vercel.app"),
  openGraph: {
    title: "Lumora AI — Free AI Image & Video Generator",
    description:
      "Generate stunning AI images and videos for free, right in your browser.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
