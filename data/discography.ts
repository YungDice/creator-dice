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

/** Fallback for the few releases that never made it to Spotify. */
const spotifySearch = (release: string) =>
  `https://open.spotify.com/search/${encodeURIComponent(`${release} Yung Dice`)}`;

/** Newest first. Links verified against the artist's Spotify and Apple Music pages. */
export const discography: Release[] = [
    {
    id: "little-things",
    title: "Little Things",
    year: 2026,
    type: "single",
    details: "1-track single · 07 August 2026",
    cover: "/images/covers/littlethings.jpg",
    coverAlt: "Little Things by Yung Dice featuring kef",
    spotifyUrl: "https://open.spotify.com/album/0YY7ahauFgC01n9LPeB9kF?si=Tai7H_lbRFembVldm3nmJA",
    appleMusicUrl: "https://music.apple.com/ch/album/little-things-feat-kef-single/6798665485",
  },
  {
    id: "dicenbass",
    title: "DiceNBass",
    year: 2026,
    type: "single",
    details: "2-track single · 13 July 2026",
    cover: "/images/covers/DiceNBass.jpg",
    coverAlt: "DiceNBass by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/2zDIJNfdrFAwCcIf3T4DxS",
    appleMusicUrl: "https://music.apple.com/ch/album/dicenbass-single/6790384835",
  },
  {
    id: "20",
    title: "20",
    year: 2026,
    type: "single",
    cover: "/images/covers/20.jpg",
    coverAlt: "20 by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/02zDymlkE3xh9V6xhrPRBL",
    appleMusicUrl: "https://music.apple.com/ch/album/20-single/6788861889",
  },
  {
    id: "zombies-verpisst-euch-ueberleben",
    title: "zombies, verpisst euch #ÜBERLEBEN",
    year: 2026,
    type: "single",
    details: "3-track single · with filiusfetish",
    cover: "/images/covers/zombiesverpissteuch.jpg",
    coverAlt: "zombies, verpisst euch #ÜBERLEBEN by filiusfetish & Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/6gQwXpMXyMnavJc6jzBUuq",
    appleMusicUrl:
      "https://music.apple.com/ch/album/zombies-verpisst-euch-%C3%BCberleben-single/6779355206",
  },
  {
    id: "silence",
    title: "silence",
    year: 2026,
    type: "single",
    cover: "/images/covers/silence.jpg",
    coverAlt: "silence by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/2eRpOZHRUXwQbgCjyDz8ag",
    appleMusicUrl: "https://music.apple.com/ch/album/silence-single/6766431065",
  },
  {
    id: "forbidden-access",
    title: "forbidden access",
    year: 2026,
    type: "single",
    cover: "/images/covers/forbidden access.jpg",
    coverAlt: "forbidden access by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/2X7J5u9lbKOzkW6U3UUWn7",
    appleMusicUrl: "https://music.apple.com/ch/album/forbidden-access-single/6766397560",
  },
  {
    id: "bottomless",
    title: "bottomless",
    year: 2026,
    type: "single",
    cover: "/images/covers/bottomless.jpg",
    coverAlt: "bottomless by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/5NWvEivuza6SrPkeEacaDI",
    appleMusicUrl: "https://music.apple.com/ch/album/bottomless-single/1896253709",
  },
  {
    id: "mimimi-dark-triad-hardtekk",
    title: "MIMIMI (DARK TRIAD HARDTEKK)",
    year: 2026,
    type: "single",
    details: "Hardtekk",
    cover: "/images/covers/mimimidarktriad.jpg",
    coverAlt: "MIMIMI (DARK TRIAD HARDTEKK) by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/2MIJrtpSnLJxEQWgyh2hAR",
    appleMusicUrl:
      "https://music.apple.com/ch/album/mimimi-dark-triad-hardtekk-single/6765627542",
  },
  {
    id: "elias",
    title: "ELIAS",
    year: 2026,
    type: "album",
    details: "4-track EP · with filiusfetish",
    cover: "/images/covers/elias.jpg",
    coverAlt: "ELIAS EP by filiusfetish & Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/1Ro2UReH7hc0e1Btv9zVQt?si=x1-PQuuCS56-rcnfDc_Eig",
    appleMusicUrl: "https://music.apple.com/ch/album/elias-ep/1890287222",
  },
  {
    id: "myself",
    title: "myself",
    year: 2026,
    type: "album",
    details: "7-track album",
    cover: "/images/covers/myself.jpg",
    coverAlt: "myself by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/54eYK8C5nbeZ8tBGwaMjv6",
    appleMusicUrl: "https://music.apple.com/ch/album/myself/1889910465",
  },
  {
    id: "dice",
    title: "DICE",
    year: 2025,
    type: "album",
    details: "8-track album",
    cover: "/images/covers/dice.jpg",
    coverAlt: "DICE by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/0Q7JhoVZBs3aScg69y0wlK",
    appleMusicUrl: "https://music.apple.com/ch/album/dice/1857636722",
  },
  {
    id: "tell-me-your-name",
    title: "Tell Me Your Name",
    year: 2023,
    type: "single",
    cover: "/images/covers/tellmeyourname.jpg",
    coverAlt: "Tell Me Your Name by Yung Dice",
    spotifyUrl: "https://open.spotify.com/track/6k8n5dtOuPqoh7RanogB0T",
    appleMusicUrl: "https://music.apple.com/ch/album/tell-me-your-name-single/1885807441",
  },
  {
    id: "sound-of-dice",
    title: "SOUND OF DICE",
    year: 2023,
    type: "album",
    details: "7-track album",
    cover: "/images/covers/soundofvibe.jpg",
    coverAlt: "SOUND OF DICE by Yung Dice",
    spotifyUrl: "https://open.spotify.com/album/65ZJYPFvzTrEZKvkdZMgwW",
    appleMusicUrl: "https://music.apple.com/ch/album/sound-of-dice/1895839275",
  },
    {
    id: "no-broke-music",
    title: "NO BROKE MUSIC",
    year: 2022,
    type: "single",
    details: "Yung Dice feat. ttt999ttt",
    cover: "/images/covers/nobrokemusic.jpg",
    coverAlt: "NO BROKE MUSIC by Yung Dice featuring ttt999ttt",
    spotifyUrl: "https://open.spotify.com/album/52RZKL6x6AhiaKtHQA2kIg?si=zUmPiXpRSwqNyWvqEU-6Og",
    appleMusicUrl:
      "https://music.apple.com/ch/album/no-broke-music-feat-ttt999ttt-single/6798648921",
  },
  {
    id: "miami",
    title: "Miami",
    year: 2021,
    type: "single",
    cover: "/images/covers/miami.jpg",
    coverAlt: "Miami by Yung Dice",
    spotifyUrl: "https://open.spotify.com/track/6zVFYYCI187IT44qx1Sfar",
    appleMusicUrl: "https://music.apple.com/ch/album/miami-single/1885768498",
  },
  {
    id: "pow-pow",
    title: "Pow Pow",
    year: 2021,
    type: "single",
    cover: "/images/covers/powpow.jpg",
    coverAlt: "Pow Pow by Yung Dice",
    spotifyUrl: spotifySearch("Pow Pow"),
    appleMusicUrl: "https://music.apple.com/ch/album/pow-pow-single/6790488445",
  },
  {
    id: "darkness",
    title: "Darkness",
    year: 2021,
    type: "single",
    cover: "/images/covers/darkness.jpg",
    coverAlt: "Darkness by Yung Dice",
    spotifyUrl: spotifySearch("Darkness"),
    appleMusicUrl: "https://music.apple.com/ch/album/darkness-single/1885662524",
  },
];
