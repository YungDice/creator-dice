import type { Metadata, Viewport } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { InstallButtons } from "@/components/uptime/InstallButtons";
import { RevealObserver } from "@/components/Reveal";
import { UptimeFooter } from "@/components/uptime/UptimeChrome";
import { uptime } from "@/data/uptime";

export const metadata: Metadata = {
  title: { absolute: "Uptime: a streak you keep by existing" },
  description: uptime.sub,
  icons: { icon: "/images/uptime/icon.svg", apple: "/images/uptime/apple-touch-icon.png" },
  alternates: { canonical: "https://uptime.yungdice.com" },
  openGraph: {
    title: "Uptime",
    description: uptime.sub,
    url: "https://uptime.yungdice.com",
    siteName: "Uptime",
  },
};

export const viewport: Viewport = { themeColor: "#FF9F0A" };

const HOME = "https://yungdice.com";

function Screen({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[28px] bg-black ring-1 ring-ink/20 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={780} height={1688} className="block h-auto w-full" />
    </div>
  );
}

export default function UptimePage() {
  return (
    <div className="theme-uptime min-h-[100dvh] bg-brand text-on-brand">
      <header>
        <nav
          aria-label="Uptime"
          className="mx-auto flex h-[72px] max-w-page items-center justify-between px-4 sm:px-8"
        >
          <span className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/uptime/icon.svg" alt="" width={36} height={36} className="h-9 w-9" />
            <span className="font-display text-[26px] font-bold uppercase tracking-[0.02em]">Uptime</span>
          </span>
          <a
            href={HOME}
            className="inline-flex min-h-11 items-center gap-1 font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-on-brand/80 hover:text-on-brand"
          >
            By Yung Dice
            <ArrowUpRight size={16} weight="bold" aria-hidden />
          </a>
        </nav>
      </header>

      <main>
        {/* Hero: headline, one sentence, the three installs. Real app screens on the right. */}
        <section className="overflow-hidden">
          <div className="mx-auto grid max-w-page items-center gap-12 px-4 pb-20 pt-8 sm:px-8 md:grid-cols-[1.25fr_1fr] md:pb-28 md:pt-14">
            <div>
              <h1 className="display text-[clamp(64px,9.4vw,140px)]">
                {uptime.headline.map((line, i) => (
                  <span key={line} className="rise block" style={{ ["--i" as string]: i }}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className="rise mt-7 max-w-[40ch] text-[18px] leading-relaxed" style={{ ["--i" as string]: 2 }}>
                {uptime.sub}
              </p>
              <div className="rise mt-9 max-w-[720px]" style={{ ["--i" as string]: 3 }}>
                <InstallButtons />
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[460px] items-start justify-center">
              <Screen
                src="/images/uptime/screen-home.webp"
                alt="Uptime home screen: a 95 day streak inside an orange ring, with Stop and I'm Still Here buttons"
                className="relative z-10 w-[62%] shadow-[0_30px_60px_-20px_rgb(90_45_0/0.55)]"
              />
              <Screen
                src="/images/uptime/screen-boards.webp"
                alt="Uptime leaderboards screen"
                className="-ml-[18%] mt-16 w-[52%] opacity-95"
              />
            </div>
          </div>
        </section>

        <div className="frame bg-paper text-ink">
          {/* The rule that makes it different: the long window. */}
          <section aria-labelledby="how-title" className="px-4 py-20 sm:px-8 md:py-28">
            <div className="mx-auto max-w-page">
              <h2 id="how-title" className="heading text-[clamp(52px,7vw,96px)]" data-reveal>
                Time is the currency
              </h2>

              <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
                <div data-reveal>
                  <p className="display text-[clamp(120px,20vw,280px)] leading-[0.8] text-brand-text">
                    {uptime.windowDays} days
                  </p>
                  <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-ink/85">
                    The check-in window. Opening the app, tapping a push, sending or receiving time: any sign of
                    life keeps your clock running. Only {uptime.windowDays} days of total silence ends it. No
                    daily chores.
                  </p>
                </div>

                <div className="space-y-10 md:border-l md:border-ink/15 md:pl-12">
                  {uptime.mechanics.map((m, i) => (
                    <div key={m.title} data-reveal style={{ ["--i" as string]: i + 1 }}>
                      <h3 className="font-display text-[36px] font-semibold uppercase leading-none">{m.title}</h3>
                      <p className="mt-3 max-w-[40ch] text-[17px] leading-relaxed text-ink/85">{m.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Boards: the list beside the real screen. */}
          <section aria-labelledby="boards-title" className="border-t border-ink/10 px-4 py-20 sm:px-8 md:py-28">
            <div className="mx-auto grid max-w-page items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="order-2 mx-auto w-full max-w-[320px] md:order-1" data-reveal>
                <Screen
                  src="/images/uptime/screen-people.webp"
                  alt="Uptime people screen listing friends and their running clocks"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 id="boards-title" className="heading text-[clamp(52px,7vw,96px)]" data-reveal>
                  Six ways to rank
                </h2>
                <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-ink/85" data-reveal>
                  Follow each other and time can move between you. Then it all lands on the boards.
                </p>
                <ul className="mt-10 grid grid-cols-2 gap-x-8 border-t border-ink/15" data-reveal>
                  {uptime.boards.map((b) => (
                    <li
                      key={b}
                      className="border-b border-ink/15 py-4 font-display text-[26px] font-semibold uppercase leading-none"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Closing: a real record, then the installs again. */}
        <section aria-labelledby="record-title" className="px-4 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-page">
            <p id="record-title" className="display text-[clamp(96px,17vw,240px)]" data-reveal>
              416 days
            </p>
            <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed" data-reveal>
              A documented iPod stopwatch run. Uptime is for the next one, with someone to hand the time to.
            </p>
            <div className="mt-10 max-w-[720px]" data-reveal>
              <InstallButtons />
            </div>
          </div>
        </section>
      </main>
      <UptimeFooter />
      <RevealObserver />
    </div>
  );
}
