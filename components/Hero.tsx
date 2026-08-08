"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";
import { fade, fadeUp, stagger } from "@/lib/motion";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-24 pt-40 sm:pt-48 [.pc-screen_&]:pt-32"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <motion.div
          variants={reduced ? undefined : stagger(0.1, 0.15)}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={reduced ? fade : fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-graphite px-3 py-1.5 text-sm text-bone"
          >
            <span aria-hidden="true" className="text-accent">
              ▸
            </span>
            Artist · Producer
          </motion.p>
          <motion.h1
            variants={reduced ? fade : fadeUp}
            className="max-w-[820px] font-hero text-5xl font-normal leading-[1] tracking-display text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {site.heroTagline}
          </motion.h1>
          <motion.p
            variants={reduced ? fade : fadeUp}
            className="mt-8 max-w-xl text-base text-ash sm:text-lg"
          >
            {site.heroSub}
          </motion.p>
          <motion.div variants={reduced ? fade : fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href={site.listenUrl}
              className="rounded-badge border border-graphite px-8 py-3.5 font-medium text-white transition-colors duration-150 ease-out hover:border-white"
            >
              Listen
            </a>
            <a
              href="#contact"
              className="rounded-badge border border-graphite px-8 py-3.5 font-medium text-bone transition-colors duration-150 ease-out hover:border-white hover:text-white"
            >
              Book Yung Dice
            </a>
          </motion.div>
          <motion.div
            variants={reduced ? fade : fadeUp}
            className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-graphite pt-8"
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">
              As heard on
            </span>
            {site.heardOn.map((name) => (
              <span key={name} className="font-mono text-sm text-smoke">
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-iron transition-colors hover:text-accent md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
