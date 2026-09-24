/**
 * Global copy for yungdice.com. House rule for this site: no em dashes
 * anywhere a visitor can read. Use a period, comma or colon instead.
 */
import { discography } from "./discography";

export const site = {
  name: "Yung Dice",
  url: "https://yungdice.com",
  description:
    "Yung Dice: rapper and producer since 2021. Music, releases and the apps he builds: Nexo, Uptime and Dice Masters.",
  heroLines: ["Built on", "the roll"],
  heroSub:
    "Rapper and producer since 2021. Rap at the core, with detours into drum & bass and hardtekk.",
  listenUrl: "https://open.spotify.com/artist/1bzBDJgvpO6arfJCgHjpJJ",
  appleMusicUrl: "https://music.apple.com/ch/artist/yung-dice/1396099815",
  bookingEmail: "mgmt.yungdice@gmail.com",
  since: 2021,
} as const;

export const navLinks = [
  { label: "Music", href: "#music" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
] as const;

export const about = {
  quote: "Every track starts with a roll you can't take back.",
  paragraphs: [
    "Yung Dice has been dropping records since 2021, from the early singles Darkness, Pow Pow and Miami to full-length projects like SOUND OF DICE, DICE and myself. What started as straight rap keeps mutating: DiceNBass went drum & bass, MIMIMI went full hardtekk, and the ELIAS EP with filiusfetish pushed somewhere new again.",
    "The dice are the method. Every release is a roll: a new genre, a new language, no take-backs. The music is half of it. The other half is software he designs and builds himself, from an encrypted messenger to a stopwatch you never stop.",
  ],
  portrait: {
    src: "/images/about/photo1.webp",
    alt: "Yung Dice, close-up portrait in a patterned hood and glasses",
  },
} as const;

/** Counted from the catalogue so the numbers never drift from the data. */
export const stats = [
  { value: String(discography.length), label: "Releases" },
  {
    value: String(discography.filter((r) => r.type === "album").length),
    label: "Albums & EPs",
  },
  { value: String(site.since), label: "First release" },
] as const;
