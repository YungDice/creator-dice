import type { Config } from "tailwindcss";

// Every colour is a CSS variable so the same components render in the
// Yung Dice red theme and the Uptime orange theme (see app/globals.css).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: token("brand"),
        "brand-text": token("brand-text"),
        "brand-deep": token("brand-deep"),
        "on-brand": token("on-brand"),
        paper: token("paper"),
        ink: token("ink"),
      },
      fontFamily: {
        display: ['"Big Shoulders Display Variable"', "Impact", "sans-serif"],
        sans: ['"Geist Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1360px" },
      transitionTimingFunction: { out: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};

export default config;
