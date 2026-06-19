import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grok Clone",
  description: "A free, open-source clone of the Grok chat UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-grok-bg text-grok-accent antialiased">
        {children}
      </body>
    </html>
  );
}
