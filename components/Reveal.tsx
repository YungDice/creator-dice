"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fade, fadeUp, stagger, VIEWPORT } from "@/lib/motion";

/**
 * Scroll-reveal primitives.
 *
 * <RevealGroup> is a stagger container that plays when scrolled into view;
 * <RevealItem> children fade + slide up in order. With prefers-reduced-motion
 * everything falls back to opacity-only fades (no translate, no stagger).
 */

type GroupProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before the first child starts. */
  delay?: number;
  /** Seconds between children. */
  step?: number;
  as?: "div" | "section" | "ul" | "header" | "footer";
};

export function RevealGroup({
  children,
  className,
  delay = 0,
  step = 0.1,
  as = "div",
}: GroupProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={reduced ? undefined : stagger(delay, step)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "h1" | "h2" | "h3" | "p" | "span" | "figure" | "blockquote";
};

export function RevealItem({ children, className, as = "div" }: ItemProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} variants={reduced ? fade : fadeUp}>
      {children}
    </Tag>
  );
}

/** Standalone reveal for single elements outside a stagger group. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/** Small uppercase eyebrow label used above every section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <RevealItem as="p" className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </RevealItem>
  );
}
