/**
 * Quick-stat strip in the About section. Counts reflect the catalog on
 * Spotify/Apple Music as of mid-2026 — bump them as new releases drop.
 */

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "16+", label: "Releases" },
  { value: "6", label: "Albums & EPs" },
  { value: "5+", label: "Years active" },
  { value: "3", label: "Genres crossed" },
];
