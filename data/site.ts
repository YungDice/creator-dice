/**
 * Global site copy.
 */

export const site = {
  name: "YUNG DICE",
  heroTagline: "Beats built on the roll of the dice",
  heroSub:
    "Rapper and producer running his own lane since 2021 — rap at the core, with detours into drum & bass and hardtekk. Every track, every cover, every world: built in-house.",
  listenUrl: "https://open.spotify.com/artist/1bzBDJgvpO6arfJCgHjpJJ",
  bookingEmail: "mgmt.yungdice@gmail.com",
  // "As heard on" trust strip in the hero.
  heardOn: ["Spotify", "Apple Music", "SoundCloud", "YouTube"],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  pullQuote: "Every track starts with a roll you can’t take back.",
  paragraphs: [
    "Yung Dice has been dropping records since 2021, starting with the early singles Darkness, Pow Pow and Miami and building toward full-length projects like SOUND OF DICE, DICE and myself. What began as straight rap keeps mutating — one release is a drum & bass hybrid (DiceNBass), the next is full-throttle hardtekk (MIMIMI), and collaborations like the ELIAS EP with filiusfetish push the sound somewhere new every time.",
    "The dice aren’t just a name — they’re the method. Every release is a roll: a new genre, a new language, a new experiment, no take-backs. And the music is only half of it. Yung Dice designs and builds his own worlds around the sound, from the Dice Masters social gaming platform to the Ascendant puzzle game to the site you’re standing in right now.",
  ],
  portraits: [
    {
      src: "/images/portfolio/photo1.jpg",
      alt: "Yung Dice portrait — close-up in a patterned hood and glasses",
    },
    {
      src: "/images/portfolio/photo2.jpg",
      alt: "Yung Dice — candid motion-blur profile shot",
    },
    {
      src: "/images/portfolio/photo3.jpg",
      alt: "Yung Dice — candid full-body photo",
    },
  ],
} as const;
