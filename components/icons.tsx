import type { SocialId } from "@/data/socials";

/**
 * Simple generic line glyphs for social platforms (drawn by hand, NOT official
 * brand marks — swap for official SVGs before launch if exact logos matter).
 */

type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SpotifyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 9.6c2.8-.8 5.6-.5 8 .9" />
      <path d="M8.4 12.4c2.3-.6 4.5-.3 6.6.8" />
      <path d="M8.8 15c1.8-.4 3.5-.2 5.2.7" />
    </svg>
  );
}

export function AppleMusicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M9 17.5V7.2l9-1.8v10.3" />
      <circle cx="6.8" cy="17.5" r="2.2" />
      <circle cx="15.8" cy="15.7" r="2.2" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <rect x="3" y="6.5" width="18" height="11" rx="3.5" />
      <path d="M10.5 9.8l4 2.2-4 2.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M13.5 4v10.8a3.2 3.2 0 1 1-3.2-3.2" />
      <path d="M13.5 5.5c.6 2.2 2.3 3.7 4.7 3.9" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M5 4.5l14 15" />
      <path d="M19 4.5l-14 15" />
    </svg>
  );
}

export const socialIcons: Record<SocialId, (props: IconProps) => JSX.Element> = {
  instagram: InstagramIcon,
  spotify: SpotifyIcon,
  appleMusic: AppleMusicIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  x: XIcon,
};

/** Minimal icons for the Process section steps. */
export function ProcessIcon({
  name,
  className,
}: IconProps & { name: "pen" | "mic" | "sliders" | "broadcast" }) {
  switch (name) {
    case "pen":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
          <path d="M4 20l1.2-4.2L16.4 4.6a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8.2 18.8z" />
          <path d="M14.5 6.5l3 3" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
          <path d="M12 18v3" />
        </svg>
      );
    case "sliders":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
          <path d="M6 4v10M6 18v2M12 4v3M12 11v9M18 4v14M18 20v0" />
          <circle cx="6" cy="16" r="2" />
          <circle cx="12" cy="9" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "broadcast":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
          <circle cx="12" cy="12" r="2.2" />
          <path d="M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
          <path d="M5 19a10 10 0 0 1 0-14M19 5a10 10 0 0 1 0 14" />
        </svg>
      );
  }
}
