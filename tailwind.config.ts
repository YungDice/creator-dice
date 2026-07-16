import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        bone: "#F5F5F0",
        // Accent is driven by --accent-rgb in app/globals.css — swap it there
        // (one line) to change the accent site-wide, glows included.
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "pc-shell": "#A8C6DE",
        "pc-deep": "#4C8FC0",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px 0 rgb(var(--accent-rgb) / 0.35)",
        "glow-lg": "0 0 48px 8px rgb(var(--accent-rgb) / 0.4)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
