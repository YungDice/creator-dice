"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Eyebrow, RevealGroup, RevealItem } from "@/components/Reveal";
import {
  discography,
  releaseFilters,
  type Release,
  type ReleaseType,
} from "@/data/discography";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";
import { EASE } from "@/lib/motion";

type Filter = "all" | ReleaseType;

/** How many releases show before the "Show all" button expands the grid. */
const COLLAPSED_COUNT = 9;

export default function Music() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();

  const filtered = discography.filter((r) => filter === "all" || r.type === filter);
  const visible = expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT);
  const hiddenCount = filtered.length - visible.length;

  return (
    <section id="music" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <RevealGroup className="mb-12 max-w-2xl">
        <Eyebrow>Music</Eyebrow>
        <RevealItem as="h2" className="font-display text-4xl font-normal tracking-tightest text-white sm:text-5xl">
          The catalog
        </RevealItem>
      </RevealGroup>

      {/* Filter tabs */}
      <RevealGroup className="mb-10">
        <RevealItem
          as="div"
          className="flex flex-wrap gap-2"
        >
          <div role="tablist" aria-label="Filter releases" className="contents">
            {releaseFilters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`rounded-full border px-5 py-2 font-mono text-sm transition-colors duration-150 ease-out ${
                  filter === f.id
                    ? "border-signal-blue text-white"
                    : "border-graphite text-ash hover:border-white hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </RevealItem>
      </RevealGroup>

      {/* Release grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((release, i) => (
            <motion.li
              key={release.id}
              layout={!reduced}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: EASE, delay: reduced ? 0 : i * 0.06 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <ReleaseCard release={release} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {(hiddenCount > 0 || expanded) && filtered.length > COLLAPSED_COUNT && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="rounded-badge border border-graphite px-8 py-3 text-sm font-medium text-bone transition-colors duration-150 ease-out hover:border-white hover:text-white"
          >
            {expanded ? "Show less" : `Show all ${filtered.length} releases`}
          </button>
        </div>
      )}

      <div id="work" className="mt-24 scroll-mt-24 border-t border-graphite pt-24">
        <RevealGroup className="mb-12 max-w-2xl">
          <Eyebrow>Selected Work</Eyebrow>
          <RevealItem as="h2" className="font-display text-4xl font-normal tracking-tightest text-white sm:text-5xl">
            Beyond the music
          </RevealItem>
        </RevealGroup>
        <RevealGroup as="ul" step={0.1} className="grid gap-6 sm:grid-cols-2">
          {portfolioItems.map((item) => (
            <RevealItem as="li" key={item.id} className="h-full">
              <PortfolioCard item={item} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const reduced = useReducedMotion();
  const cardClass =
    "group block h-full overflow-hidden rounded-2xl border border-graphite bg-black transition-colors duration-150 ease-out hover:border-white";

  const dotColor = item.status === "Live" ? "bg-pulse-green" : "bg-amber";

  const content = (
    <>
      <div className="relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          width={1600}
          height={900}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
        {item.status && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-graphite bg-black/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ash backdrop-blur">
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
            {item.status}
          </span>
        )}
      </div>
      <div className="flex h-[calc(100%-auto)] flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-normal tracking-tight text-white">{item.title}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent-glow">{item.category}</p>
          </div>
          <span className="shrink-0 text-sm text-iron">{item.year}</span>
        </div>
        <p className="mt-4 text-sm leading-6 text-ash">{item.description}</p>
        <div className="mt-5 text-sm font-medium text-bone">
          {item.url ? "Visit project ↗" : "Project showcase"}
        </div>
      </div>
    </>
  );

  if (item.url) {
    return (
      <motion.a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        whileHover={reduced ? undefined : { scale: 1.015 }}
        className={cardClass}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.article
      whileHover={reduced ? undefined : { scale: 1.015 }}
      className={cardClass}
    >
      {content}
    </motion.article>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      whileHover={reduced ? undefined : { scale: 1.02 }}
      className="group h-full overflow-hidden rounded-2xl border border-graphite bg-black transition-colors duration-150 ease-out hover:border-white"
    >
      <Image
        src={release.cover}
        alt={release.coverAlt}
        width={800}
        height={800}
        className="aspect-square w-full object-cover"
      />
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-normal tracking-tight text-white">{release.title}</h3>
          <span className="shrink-0 text-sm text-iron">{release.year}</span>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-accent-glow">{release.type}</p>
        {release.details && <p className="mt-2 text-sm text-ash">{release.details}</p>}
        {release.previewSrc && (
          <audio controls preload="none" className="mt-4" src={release.previewSrc}>
            Your browser does not support audio previews.
          </audio>
        )}
        <div className="mt-4 flex gap-5 text-sm">
          <a
            href={release.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-ash hover:text-white"
          >
            Spotify
          </a>
          <a
            href={release.appleMusicUrl}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-ash hover:text-white"
          >
            Apple Music
          </a>
        </div>
      </div>
    </motion.article>
  );
}
