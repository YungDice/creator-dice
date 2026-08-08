import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

// Domaine substitute — editorial serif for the single large hero statement.
const hero = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hero",
  display: "swap",
});

// aBC Favorit substitute — compressed geometric sans for section headlines.
const display = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

// Body copy, UI labels, navigation, buttons, links.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Commit Mono substitute — code blocks, badges, labels, developer identifiers.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yung Dice — Official Site",
  description:
    "Yung Dice — music, portfolio, and story. Listen to the latest releases and get in touch for bookings.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hero.variable} ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
