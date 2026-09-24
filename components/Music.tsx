"use client";

import { useMemo, useState } from "react";
import { discography, type ReleaseType } from "@/data/discography";

const TYPE_LABEL: Record<ReleaseType, string> = {
  single: "Singles",
  album: "Albums & EPs",
  feature: "Features",
};

type Filter = "all" | ReleaseType;

/**
 * The full catalogue as a record shelf. Filters only appear for types that
 * actually have releases, so there is never an empty tab.
 */
export function Music() {
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(() => {
    const types = Array.from(new Set(discography.map((r) => r.type)));
    return [
      { id: "all" as Filter, label: "All", count: discography.length },
      ...types.map((t) => ({
        id: t as Filter,
        label: TYPE_LABEL[t],
        count: discography.filter((r) => r.type === t).length,
      })),
    ];
  }, []);

  const shown = filter === "all" ? discography : discography.filter((r) => r.type === filter);

  return (
    <section id="music" aria-labelledby="music-title" className="scroll-mt-4 px-4 py-20 sm:px-8 md:py-24">
      <div className="mx-auto max-w-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="music-title" className="heading text-[clamp(56px,8vw,96px)] text-ink" data-reveal>
            Music
          </h2>

          {/* Segmented filter, styled after the reference site's OS tabs. */}
          <div
            role="group"
            aria-label="Filter releases"
            className="grid w-full grid-cols-3 bg-ink/[0.06] p-1 font-mono text-[12px] uppercase tracking-[0.06em] sm:flex sm:w-auto"
          >
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`min-h-10 whitespace-nowrap px-2 transition-colors duration-200 sm:px-4 ${
                    active ? "bg-brand text-on-brand" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  <span aria-hidden className={`hidden sm:inline ${active ? "opacity-70" : "opacity-40"}`}>
                    :{" "}
                  </span>
                  {f.label}
                  <span className="ml-1.5 opacity-60">{f.count}</span>
                  <span aria-hidden className={`hidden sm:inline ${active ? "opacity-70" : "opacity-40"}`}>
                    {" "}:
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shown.map((r, i) => (
            <li
              key={r.id}
              className={`group ${i === 0 && shown.length > 8 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <a href={r.spotifyUrl} aria-label={`${r.title} on Spotify`} className="block">
                <span className="duo duo-live aspect-square w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.cover}
                    alt={r.coverAlt}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="group-hover:scale-[1.03]"
                  />
                </span>
              </a>
              <h3 className={`mt-3 font-display font-semibold uppercase leading-[1.05] text-ink [text-wrap:balance] ${
                  i === 0 && shown.length > 8 ? "text-[22px] lg:text-[40px]" : "text-[22px]"
                }`}>
                {r.title}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em] text-ink/70">
                <span>
                  {r.year} {r.type === "album" ? "LP / EP" : "Single"}
                </span>
                <a
                  href={r.appleMusicUrl}
                  className="underline decoration-ink/30 underline-offset-2 hover:text-brand-text hover:decoration-current"
                >
                  Apple Music
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
