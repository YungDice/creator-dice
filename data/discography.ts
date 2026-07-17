export type ReleaseType = "single" | "album" | "feature";

export type Release = {
  id: string;
  title: string;
  year: number;
  type: ReleaseType;
  cover: string;
  coverAlt: string;
  details?: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  /** Optional short mp3 preview served from /public/audio. */
  previewSrc?: string;
};

export const releaseFilters = [
  { id: "all", label: "All" },
  { id: "single", label: "Singles" },
  { id: "album", label: "Albums" },
  { id: "feature", label: "Features" },
] as const;

const spotifySearch = (release: string) =>
  `https://open.spotify.com/search/${encodeURIComponent(`${release} Yung Dice`)}`;

const appleMusicSearch = (release: string) =>
  `https://music.apple.com/us/search?term=${encodeURIComponent(`${release} Yung Dice`)}`;

export const discography: Release[] = [
  {
    id: "dicenbass",
    title: "DiceNBass",
    year: 2026,
    type: "single",
    details: "2-track single · 13 July 2026",
    cover: "/images/covers/DiceNBass.jpg",
    coverAlt: "DiceNBass by Yung Dice",
    spotifyUrl: spotifySearch("DiceNBass"),
    appleMusicUrl: appleMusicSearch("DiceNBass"),
  },
  {
    id: "20",
    title: "20",
    year: 2026,
    type: "single",
    cover: "/images/covers/20.jpg",
    coverAlt: "20 by Yung Dice",
    spotifyUrl: spotifySearch("20"),
    appleMusicUrl: appleMusicSearch("20"),
  },
  {
    id: "zombies-verpisst-euch-ueberleben",
    title: "zombies, verpisst euch #ÜBERLEBEN",
    year: 2026,
    type: "single",
    details: "3-track single",
    cover: "/images/covers/zombiesverpissteuch.jpg",
    coverAlt: "zombies, verpisst euch #ÜBERLEBEN by Yung Dice",
    spotifyUrl: spotifySearch("zombies verpisst euch ÜBERLEBEN"),
    appleMusicUrl: appleMusicSearch("zombies verpisst euch ÜBERLEBEN"),
  },
  {
    id: "silence",
    title: "silence",
    year: 2026,
    type: "single",
    cover: "/images/covers/silence.jpg",
    coverAlt: "silence by Yung Dice",
    spotifyUrl: spotifySearch("silence"),
    appleMusicUrl: appleMusicSearch("silence"),
  },
  {
    id: "forbidden-access",
    title: "forbidden access",
    year: 2026,
    type: "single",
    cover: "/images/covers/forbidden access.jpg",
    coverAlt: "forbidden access by Yung Dice",
    spotifyUrl: spotifySearch("forbidden access"),
    appleMusicUrl: appleMusicSearch("forbidden access"),
  },
  {
    id: "bottomless",
    title: "bottomless",
    year: 2026,
    type: "single",
    cover: "/images/covers/bottomless.jpg",
    coverAlt: "bottomless by Yung Dice",
    spotifyUrl: spotifySearch("bottomless"),
    appleMusicUrl: appleMusicSearch("bottomless"),
  },
  {
    id: "mimimi-dark-triad-hardtekk",
    title: "MIMIMI (DARK TRIAD HARDTEKK)",
    year: 2026,
    type: "single",
    cover: "/images/covers/mimimidarktriad.jpg",
    coverAlt: "MIMIMI (DARK TRIAD HARDTEKK) by Yung Dice",
    spotifyUrl: spotifySearch("MIMIMI DARK TRIAD HARDTEKK"),
    appleMusicUrl: appleMusicSearch("MIMIMI DARK TRIAD HARDTEKK"),
  },
  {
    id: "tell-me-your-name",
    title: "Tell Me Your Name",
    year: 2023,
    type: "single",
    cover: "/images/covers/tellmeyourname.jpg",
    coverAlt: "Tell Me Your Name by Yung Dice",
    spotifyUrl: spotifySearch("Tell Me Your Name"),
    appleMusicUrl: appleMusicSearch("Tell Me Your Name"),
  },
  {
    id: "miami",
    title: "Miami",
    year: 2021,
    type: "single",
    cover: "/images/covers/miami.jpg",
    coverAlt: "Miami by Yung Dice",
    spotifyUrl: spotifySearch("Miami"),
    appleMusicUrl: appleMusicSearch("Miami"),
  },
];
