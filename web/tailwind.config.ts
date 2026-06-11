import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05050a",
        surface: "#12121c",
        "surface-light": "#1a1a28",
        border: "#26263a",
        primary: "#8b5cf6",
        secondary: "#ec4899",
        accent: "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)",
        "gradient-radial":
          "radial-gradient(circle at top, rgba(139,92,246,0.25), transparent 60%)",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "spin-slow": "spin 2.5s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
