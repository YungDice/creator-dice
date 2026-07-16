/**
 * {{SOCIAL_LINKS}} — [PLACEHOLDER] All URLs are stubs ("#"). Fill in real
 * profile links. Icons are simple generic glyphs in components/icons.tsx —
 * swap for official brand SVGs if you want exact logos.
 */

export type SocialId =
  | "instagram"
  | "spotify"
  | "appleMusic"
  | "youtube"
  | "tiktok"
  | "x";

export type SocialLink = {
  id: SocialId;
  label: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { id: "instagram", label: "Instagram", url: "#" },
  { id: "spotify", label: "Spotify", url: "#" },
  { id: "appleMusic", label: "Apple Music", url: "#" },
  { id: "youtube", label: "YouTube", url: "#" },
  { id: "tiktok", label: "TikTok", url: "#" },
  { id: "x", label: "X", url: "#" },
];
