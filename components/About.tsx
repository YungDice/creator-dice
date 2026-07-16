"use client";

import Image from "next/image";
import { Eyebrow, RevealGroup, RevealItem } from "@/components/Reveal";
import { about } from "@/data/site";
import { stats } from "@/data/stats";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <RevealGroup className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Portraits — three-photo collage floating on the dark bg, no frame box */}
        <RevealItem as="figure" className="relative order-2 md:order-1">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3">
            <Image
              src={about.portraits[0].src}
              alt={about.portraits[0].alt}
              width={800}
              height={1000}
              className="col-span-2 aspect-[4/5] w-full object-cover grayscale"
            />
            <Image
              src={about.portraits[1].src}
              alt={about.portraits[1].alt}
              width={600}
              height={600}
              className="aspect-square w-full object-cover grayscale"
            />
            <Image
              src={about.portraits[2].src}
              alt={about.portraits[2].alt}
              width={600}
              height={600}
              className="aspect-square w-full object-cover grayscale"
            />
          </div>
        </RevealItem>

        <div className="order-1 md:order-2">
          <Eyebrow>About</Eyebrow>
          <RevealItem as="h2" className="font-display text-4xl font-bold uppercase leading-tight tracking-tightest sm:text-5xl lg:text-6xl">
            {about.pullQuote}
          </RevealItem>
          {about.paragraphs.map((p, i) => (
            <RevealItem as="p" key={i} className="mt-6 text-bone/60">
              {p}
            </RevealItem>
          ))}
        </div>
      </RevealGroup>

      {/* Stat strip */}
      <RevealGroup
        as="ul"
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden border-y border-white/10 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <RevealItem as="li" key={stat.label} className="py-8 text-center md:py-10">
            <span className="block font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 block text-xs uppercase tracking-[0.25em] text-bone/40">
              {stat.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
