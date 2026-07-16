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
import { portfolioItems } from "@/data/portfolio";
import { EASE } from "@/lib/motion";

type Filter = "all" | ReleaseType;

export default function Music() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const visible = discography.filter((r) => filter === "all" || r.type === filter);

  return (
    <section id="music" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <RevealGroup className="mb-12 max-w-2xl">
        <Eyebrow>Music</Eyebrow>
        <RevealItem as="h2" className="font-display text-4xl font-bold uppercase tracking-tightest sm:text-5xl">
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
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                  filter === f.id
                    ? "border-accent bg-accent/10 text-bone shadow-glow"
                    : "border-white/15 text-bone/60 hover:border-white/40 hover:text-bone"
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

      {/* Non-music portfolio sub-grid */}
      <div id="work" className="mt-24 scroll-mt-24">
        <RevealGroup className="mb-12 max-w-2xl">
          <Eyebrow>Selected Work</Eyebrow>
          <RevealItem as="h2" className="font-display text-4xl font-bold uppercase tracking-tightest sm:text-5xl">
            Beyond the music
          </RevealItem>
        </RevealGroup>
        <RevealGroup as="ul" step={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <RevealItem as="li" key={item.id}>
              <motion.a
                href={item.url}
                whileHover={reduced ? undefined : { scale: 1.02 }}
                className="group block overflow-hidden rounded-2xl border border-white/15 transition-all hover:border-accent hover:shadow-glow"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={1600}
                  height={900}
                  className="aspect-video w-full object-cover"
                />
                <div className="flex items-baseline justify-between p-5">
                  <div>
                    <h3 className="font-display font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-bone/40">
                      {item.category}
                    </p>
                  </div>
                  <span className="text-sm text-bone/40">{item.year}</span>
                </div>
              </motion.a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      whileHover={reduced ? undefined : { scale: 1.02 }}
      className="group h-full overflow-hidden rounded-2xl border border-white/15 transition-all hover:border-accent hover:shadow-glow"
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
          <h3 className="font-display text-lg font-bold tracking-tight">{release.title}</h3>
          <span className="shrink-0 text-sm text-bone/40">{release.year}</span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-accent">{release.type}</p>
        {release.previewSrc && (
          <audio controls preload="none" className="mt-4" src={release.previewSrc}>
            Your browser does not support audio previews.
          </audio>
        )}
        <div className="mt-4 flex gap-5 text-sm">
          <a href={release.spotifyUrl} className="link-underline text-bone/60 hover:text-bone">
            Spotify
          </a>
          <a href={release.appleMusicUrl} className="link-underline text-bone/60 hover:text-bone">
            Apple Music
          </a>
        </div>
      </div>
    </motion.article>
  );
}
