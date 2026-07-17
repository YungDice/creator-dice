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
    cover: "/images/covers/dicenbass.svg",
    coverAlt: "DiceNBass by Yung Dice",
    spotifyUrl: spotifySearch("DiceNBass"),
    appleMusicUrl: appleMusicSearch("DiceNBass"),
  },
  {
    id: "20",
    title: "20",
    year: 2026,
    type: "single",
    cover: "/images/covers/20.svg",
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
    cover: "/images/covers/zombies-ueberleben.svg",
    coverAlt: "zombies, verpisst euch #ÜBERLEBEN by Yung Dice",
    spotifyUrl: spotifySearch("zombies verpisst euch ÜBERLEBEN"),
    appleMusicUrl: appleMusicSearch("zombies verpisst euch ÜBERLEBEN"),
  },
  {
    id: "silence",
    title: "silence",
    year: 2026,
    type: "single",
    cover: "/images/covers/silence.svg",
    coverAlt: "silence by Yung Dice",
    spotifyUrl: spotifySearch("silence"),
    appleMusicUrl: appleMusicSearch("silence"),
  },
  {
    id: "forbidden-access",
    title: "forbidden access",
    year: 2026,
    type: "single",
    cover: "/images/covers/forbidden-access.svg",
    coverAlt: "forbidden access by Yung Dice",
    spotifyUrl: spotifySearch("forbidden access"),
    appleMusicUrl: appleMusicSearch("forbidden access"),
  },
  {
    id: "bottomless",
    title: "bottomless",
    year: 2026,
    type: "single",
    cover: "/images/covers/bottomless.svg",
    coverAlt: "bottomless by Yung Dice",
    spotifyUrl: spotifySearch("bottomless"),
    appleMusicUrl: appleMusicSearch("bottomless"),
  },
  {
    id: "mimimi-dark-triad-hardtekk",
    title: "MIMIMI (DARK TRIAD HARDTEKK)",
    year: 2026,
    type: "single",
    cover: "/images/covers/mimimi.svg",
    coverAlt: "MIMIMI (DARK TRIAD HARDTEKK) by Yung Dice",
    spotifyUrl: spotifySearch("MIMIMI DARK TRIAD HARDTEKK"),
    appleMusicUrl: appleMusicSearch("MIMIMI DARK TRIAD HARDTEKK"),
  },
  {
    id: "elias",
    title: "ELIAS",
    year: 2026,
    type: "feature",
    details: "Collaborative EP led by filiusfetish",
    cover: "/images/covers/elias.svg",
    coverAlt: "ELIAS featuring Yung Dice",
    spotifyUrl: spotifySearch("ELIAS filiusfetish"),
    appleMusicUrl: appleMusicSearch("ELIAS filiusfetish"),
  },
  {
    id: "tell-me-your-name",
    title: "Tell Me Your Name",
    year: 2023,
    type: "single",
    cover: "/images/covers/tell-me-your-name.svg",
    coverAlt: "Tell Me Your Name by Yung Dice",
    spotifyUrl: spotifySearch("Tell Me Your Name"),
    appleMusicUrl: appleMusicSearch("Tell Me Your Name"),
  },
  {
    id: "miami",
    title: "Miami",
    year: 2021,
    type: "single",
    cover: "/images/covers/miami.svg",
    coverAlt: "Miami by Yung Dice",
    spotifyUrl: spotifySearch("Miami"),
    appleMusicUrl: appleMusicSearch("Miami"),
  },
];
