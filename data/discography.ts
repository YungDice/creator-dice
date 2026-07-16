/**
 * {{DISCOGRAPHY}} — [PLACEHOLDER] Every entry here is a stub. Replace titles,
 * years, links, cover art (public/images/covers/) and optional audio previews
 * (public/audio/) with the real catalog.
 */

export type ReleaseType = "single" | "album" | "feature";

export type Release = {
  id: string;
  title: string;
  year: number;
  type: ReleaseType;
  cover: string;
  coverAlt: string;
  /** Streaming links — "#" means not supplied yet. */
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

export const discography: Release[] = [
  {
    id: "release-01",
    title: "Placeholder Single One",
    year: 2026,
    type: "single",
    cover: "/images/covers/cover-01.svg",
    coverAlt: "Placeholder cover art for release one",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
  {
    id: "release-02",
    title: "Placeholder Single Two",
    year: 2025,
    type: "single",
    cover: "/images/covers/cover-02.svg",
    coverAlt: "Placeholder cover art for release two",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
  {
    id: "release-03",
    title: "Placeholder Album",
    year: 2025,
    type: "album",
    cover: "/images/covers/cover-03.svg",
    coverAlt: "Placeholder cover art for release three",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
  {
    id: "release-04",
    title: "Placeholder Feature",
    year: 2024,
    type: "feature",
    cover: "/images/covers/cover-04.svg",
    coverAlt: "Placeholder cover art for release four",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
  {
    id: "release-05",
    title: "Placeholder Single Three",
    year: 2024,
    type: "single",
    cover: "/images/covers/cover-05.svg",
    coverAlt: "Placeholder cover art for release five",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
  {
    id: "release-06",
    title: "Placeholder EP",
    year: 2023,
    type: "album",
    cover: "/images/covers/cover-06.svg",
    coverAlt: "Placeholder cover art for release six",
    spotifyUrl: "#",
    appleMusicUrl: "#",
  },
];
