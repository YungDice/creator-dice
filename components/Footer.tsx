import {
  AppleLogo,
  InstagramLogo,
  SpotifyLogo,
  TiktokLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { SocialId } from "@/data/socials";
import { socialLinks } from "@/data/socials";
import { site } from "@/data/site";

const ICONS: Record<SocialId, typeof SpotifyLogo> = {
  spotify: SpotifyLogo,
  appleMusic: AppleLogo,
  instagram: InstagramLogo,
  youtube: YoutubeLogo,
  tiktok: TiktokLogo,
};

/** Back on the brand colour: booking first, socials second, nothing else. */
export function Footer() {
  return (
    <footer className="text-on-brand">
      <div className="mx-auto max-w-page px-4 pb-10 pt-20 sm:px-8 md:pt-28">
        <p className="label text-on-brand/80">Booking and features</p>
        <a
          href={`mailto:${site.bookingEmail}`}
          className="display mt-4 block break-words text-[clamp(40px,7.4vw,112px)] decoration-2 underline-offset-8 hover:underline"
        >
          {site.bookingEmail}
        </a>

        <ul className="mt-14 flex flex-wrap gap-2">
          {socialLinks.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <li key={s.id}>
                <a href={s.url} className="btn btn-ghost">
                  <Icon size={18} weight="fill" aria-hidden />
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-on-brand/25 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-on-brand/75">
          <span>&copy; {new Date().getFullYear()} Yung Dice</span>
          <span className="font-display text-[28px] font-bold normal-case leading-[0.82] tracking-[0.01em] text-on-brand">
            YUNG
            <br />
            DICE
          </span>
        </div>
      </div>
    </footer>
  );
}
