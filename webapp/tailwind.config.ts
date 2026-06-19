import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grok: {
          bg: "#0a0a0a",
          panel: "#161616",
          border: "#2a2a2a",
          accent: "#e8e8e8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
