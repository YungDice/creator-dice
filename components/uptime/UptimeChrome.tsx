import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const HOME = "https://yungdice.com";
const UPTIME = "https://uptime.yungdice.com";

/** Header shared by the Uptime pages: logo + wordmark, link back to Yung Dice. */
export function UptimeHeader({ homeHref = UPTIME }: { homeHref?: string }) {
  return (
    <header>
      <nav aria-label="Uptime" className="mx-auto flex h-[72px] max-w-page items-center justify-between px-4 sm:px-8">
        <a href={homeHref} className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/uptime/icon.svg" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="font-display text-[26px] font-bold uppercase tracking-[0.02em]">Uptime</span>
        </a>
        <a
          href={HOME}
          className="inline-flex min-h-11 items-center gap-1 font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-on-brand/80 hover:text-on-brand"
        >
          By Yung Dice
          <ArrowUpRight size={16} weight="bold" aria-hidden />
        </a>
      </nav>
    </header>
  );
}

export function UptimeFooter() {
  return (
    <footer className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 border-t border-on-brand/20 px-4 py-8 font-mono text-[11px] uppercase tracking-[0.08em] sm:px-8">
      <span>&copy; {new Date().getFullYear()} Yung Dice</span>
      <span className="flex flex-wrap gap-6">
        <a href={`${UPTIME}/privacy`} className="inline-flex min-h-11 items-center hover:underline">
          Privacy
        </a>
        <a href={HOME} className="inline-flex min-h-11 items-center gap-1 hover:underline">
          yungdice.com
          <ArrowUpRight size={14} weight="bold" aria-hidden />
        </a>
      </span>
    </footer>
  );
}
