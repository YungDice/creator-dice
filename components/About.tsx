"use client";

import Image from "next/image";
import { Eyebrow, RevealGroup, RevealItem } from "@/components/Reveal";
import { about } from "@/data/site";
import { stats } from "@/data/stats";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <RevealGroup className="max-w-2xl">
        <Eyebrow>About</Eyebrow>
        <RevealItem as="h2" className="font-display text-4xl font-normal leading-tight tracking-tightest text-white sm:text-5xl lg:text-6xl">
          {about.pullQuote}
        </RevealItem>
        {about.paragraphs.map((p, i) => (
          <RevealItem as="p" key={i} className="mt-6 text-ash">
            {p}
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Portrait strip — three photos in a row, no frame box */}
      <RevealGroup as="ul" step={0.08} className="mt-16 grid grid-cols-3 gap-3">
        {about.portraits.map((portrait) => (
          <RevealItem as="li" key={portrait.src} className="overflow-hidden rounded-2xl border border-graphite">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              width={600}
              height={750}
              className="aspect-[4/5] w-full object-cover grayscale"
            />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Stat strip */}
      <RevealGroup
        as="ul"
        className="mt-16 grid grid-cols-2 divide-x divide-y divide-graphite border-y border-graphite md:grid-cols-4 md:divide-y-0"
      >
        {stats.map((stat) => (
          <RevealItem as="li" key={stat.label} className="py-8 text-center md:py-10">
            <span className="block font-display text-4xl font-normal tracking-tight text-white sm:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.2em] text-iron">
              {stat.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
