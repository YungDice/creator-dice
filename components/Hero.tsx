import { SpotifyLogo, AppleLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/data/site";

/**
 * Split hero. Left: the headline and two ways to listen. Right: cover art
 * from "bottomless" inverted into white line-work on the brand red, the
 * same trick the reference site uses with its engraved illustration.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden text-on-brand">
      <div className="mx-auto grid max-w-page items-center gap-8 px-4 pb-16 pt-10 sm:px-8 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-16">
        <div className="relative z-10">
          <h1 className="display text-[clamp(84px,15vw,200px)]">
            {site.heroLines.map((line, i) => (
              <span key={line} className="rise block" style={{ ["--i" as string]: i }}>
                {line}
              </span>
            ))}
          </h1>
          <p
            className="rise mt-7 max-w-[34ch] text-[17px] leading-relaxed text-on-brand/90"
            style={{ ["--i" as string]: 2 }}
          >
            {site.heroSub}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-2" style={{ ["--i" as string]: 3 }}>
            <a href={site.listenUrl} className="btn btn-solid">
              <SpotifyLogo size={20} weight="fill" aria-hidden />
              Listen
            </a>
            <a href={site.appleMusicUrl} className="btn btn-ghost">
              <AppleLogo size={18} weight="fill" aria-hidden />
              Apple Music
            </a>
          </div>
        </div>

        <div
          className="duo-screen relative mx-auto aspect-square w-full max-w-[560px] md:max-w-none"
          style={{
            maskImage: "radial-gradient(closest-side, #000 72%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(closest-side, #000 72%, transparent 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/covers/bottomless.webp"
            alt="Line drawing of a figure holding goggles to his face, from the bottomless cover"
            width={800}
            height={800}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
