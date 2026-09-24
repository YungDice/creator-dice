import { SpotifyLogo, AppleLogo } from "@phosphor-icons/react/dist/ssr";
import { discography } from "@/data/discography";

/** Newest release, big. Still on the brand colour, directly under the hero. */
export function LatestRelease() {
  const r = discography[0];
  return (
    <section aria-labelledby="latest-title" className="text-on-brand">
      <div className="mx-auto grid max-w-page items-end gap-8 px-4 pb-20 sm:px-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14 md:pb-28">
        <a
          href={r.spotifyUrl}
          className="duo duo-live aspect-square w-full"
          aria-label={`${r.title} on Spotify`}
          data-reveal
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.cover} alt={r.coverAlt} width={800} height={800} loading="lazy" />
        </a>

        <div data-reveal style={{ ["--i" as string]: 1 }}>
          <p className="label text-on-brand/80">Latest release</p>
          <h2 id="latest-title" className="display mt-4 text-[clamp(64px,10vw,150px)]">
            {r.title}
          </h2>
          <p className="mt-5 font-mono text-[13px] text-on-brand/85">
            {r.details ?? `Single ${r.year}`}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href={r.spotifyUrl} className="btn btn-solid">
              <SpotifyLogo size={20} weight="fill" aria-hidden />
              Spotify
            </a>
            <a href={r.appleMusicUrl} className="btn btn-ghost">
              <AppleLogo size={18} weight="fill" aria-hidden />
              Apple Music
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
