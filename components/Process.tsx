"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow, RevealGroup, RevealItem } from "@/components/Reveal";
import { ProcessIcon } from "@/components/icons";
import { processSteps } from "@/data/process";
import { EASE, VIEWPORT } from "@/lib/motion";

export default function Process() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <RevealGroup className="mb-16 max-w-2xl">
        <Eyebrow>The Process</Eyebrow>
        <RevealItem as="h2" className="font-display text-4xl font-bold uppercase tracking-tightest sm:text-5xl">
          From first roll to release
        </RevealItem>
        <RevealItem as="p" className="mt-4 text-bone/60">
          [PLACEHOLDER] One line introducing how a Yung Dice record comes
          together. Replace in components/Process.tsx or data/process.ts.
        </RevealItem>
      </RevealGroup>

      <div className="relative">
        {/* Connecting line — draws in on scroll (desktop, horizontal) */}
        <motion.div
          aria-hidden="true"
          className="absolute left-0 top-6 hidden h-px w-full origin-left bg-white/15 lg:block"
          initial={reduced ? { opacity: 0 } : { scaleX: 0 }}
          whileInView={reduced ? { opacity: 1 } : { scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE }}
        />
        {/* Vertical variant for mobile/tablet */}
        <motion.div
          aria-hidden="true"
          className="absolute left-6 top-0 h-full w-px origin-top bg-white/15 lg:hidden"
          initial={reduced ? { opacity: 0 } : { scaleY: 0 }}
          whileInView={reduced ? { opacity: 1 } : { scaleY: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE }}
        />

        <RevealGroup as="ul" step={0.12} className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step) => (
            <RevealItem as="li" key={step.number} className="relative pl-16 lg:pl-0">
              <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink font-display text-sm font-bold text-accent lg:relative lg:mb-6">
                {step.number}
              </div>
              <ProcessIcon name={step.icon} className="mb-4 h-6 w-6 text-bone/50" />
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
