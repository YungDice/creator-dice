export type SocialId = "instagram" | "spotify" | "appleMusic" | "youtube" | "tiktok";

export type SocialLink = { id: SocialId; label: string; url: string };

export const socialLinks: SocialLink[] = [
  { id: "spotify", label: "Spotify", url: "https://open.spotify.com/artist/1bzBDJgvpO6arfJCgHjpJJ" },
  { id: "appleMusic", label: "Apple Music", url: "https://music.apple.com/ch/artist/yung-dice/1396099815" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/dicelimited/" },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@theyknowdice" },
  { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@theyknowdice" },
];
