/**
 * Global site copy. Everything marked [PLACEHOLDER] still needs real content —
 * see README.md § "Content you still need to supply".
 */

export const site = {
  name: "YUNG DICE",
  // {{HERO_TAGLINE}} — using the example line from the brief until confirmed.
  heroTagline: "Beats built on the roll of the dice",
  heroSub:
    "[PLACEHOLDER] One or two sentences positioning Yung Dice — genre, city, what makes the sound his. Replace in data/site.ts.",
  listenUrl: "#music", // [PLACEHOLDER] point at a real smart-link (e.g. Linkfire/Feature.fm) or Spotify artist page
  bookingEmail: "mgmt.yungdice@gmail.com",
  // "As heard on" trust strip in the hero. Swap for real platform/press names.
  heardOn: ["Spotify", "Apple Music", "SoundCloud", "YouTube"],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const about = {
  // {{BIO_TEXT}} — [PLACEHOLDER] real background, genre, story, influences.
  pullQuote: "Every track starts with a roll you can’t take back.",
  paragraphs: [
    "[PLACEHOLDER BIO — paragraph 1] Who Yung Dice is: where he’s from, the genre he works in, and how he got started. This is stub copy so the layout reads correctly — no biographical facts have been invented. Replace in data/site.ts.",
    "[PLACEHOLDER BIO — paragraph 2] The story and the influences: the sound he grew up on, what he’s building toward, and what a listener should expect from a Yung Dice record.",
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
