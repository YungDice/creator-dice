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
        // Resend-style "black velvet with violet neon" palette (see DESIGN.md).
        ink: "#000000",
        bone: "#f0f0f0",
        graphite: "#292d30",
        ash: "#a1a4a5",
        smoke: "#abafb4",
        iron: "#6e727a",
        charcoal: "#464a4d",
        // Accent is driven by --accent-rgb in app/globals.css — swap it there
        // (one line) to change the accent site-wide.
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-glow": "#baa7ff",
        "signal-blue": "#3b9eff",
        "sky-blue": "#70b8ff",
        "pulse-green": "#3ad389",
        "alarm-red": "#ff9592",
        amber: "#ffca16",
        "surface-lift": "#0b0e14",
        "pc-shell": "#1c1f22",
        "pc-deep": "#101214",
      },
      fontFamily: {
        hero: ["var(--font-hero)", "Georgia", "serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.01em",
      },
      borderRadius: {
        badge: "6px",
        panel: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
