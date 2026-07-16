"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useContext, useRef } from "react";
import RetroComputer from "@/components/RetroComputer";
import { site } from "@/data/site";
import { EASE, fade, fadeUp, stagger } from "@/lib/motion";
import { ScrollContainerContext } from "@/lib/scroll-context";

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Inside the 3D PC the site scrolls in a container, not the window.
  const container = useContext(ScrollContainerContext);

  // Subtle parallax: the computer drifts down and recedes slightly as the
  // user scrolls toward the About section ("stepping into the screen").
  const { scrollYProgress } = useScroll({
    container: container ?? undefined,
    target: ref,
    offset: ["start start", "end start"],
  });
  const pcY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const pcScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const pcOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 lg:pt-16 [.pc-screen_&]:min-h-[768px]"
    >
      {/* Mid-blue backdrop glow behind the computer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #4C8FC0 0%, rgba(76,143,192,0.25) 55%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Copy column — badge → headline → sub → CTAs → trust badges */}
        <motion.div
          variants={reduced ? undefined : stagger(0.1, 0.15)}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.p
            variants={reduced ? fade : fadeUp}
            className="mb-5 inline-block rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-bone/70"
          >
            Artist · Producer
          </motion.p>
          <motion.h1
            variants={reduced ? fade : fadeUp}
            className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tightest sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            {site.heroTagline}
          </motion.h1>
          <motion.p
            variants={reduced ? fade : fadeUp}
            className="mt-6 max-w-md text-base text-bone/60 sm:text-lg"
          >
            {site.heroSub}
          </motion.p>
          <motion.div variants={reduced ? fade : fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.listenUrl}
              className="rounded-full bg-accent px-8 py-3.5 font-semibold transition-shadow hover:shadow-glow-lg"
            >
              Listen
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/25 px-8 py-3.5 font-semibold transition-colors hover:border-accent hover:shadow-glow"
            >
              Book Yung Dice
            </a>
          </motion.div>
          <motion.div
            variants={reduced ? fade : fadeUp}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-bone/40">
              As heard on
            </span>
            {site.heardOn.map((name) => (
              <span
                key={name}
                className="font-display text-sm font-medium uppercase tracking-wider text-bone/50"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* The computer arrives last, after the copy */}
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: reduced ? 0 : 0.7 }}
        >
          <motion.div style={reduced ? undefined : { y: pcY, scale: pcScale, opacity: pcOpacity }}>
            <RetroComputer />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-bone/40 transition-colors hover:text-accent md:block"
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
