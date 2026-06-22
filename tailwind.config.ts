import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#09090B",
        panel: "#18181B",
        cyan: "#06B6D4",
        violet: "#22C55E",
        ink: "#FAFAFA",
        muted: "#A1A1AA",
      },
      borderRadius: {
        "2xl": "18px",
      },
      boxShadow: {
        glow: "0 0 42px rgba(34, 197, 94, 0.18)",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
