import type { Variants } from "framer-motion";

/** Shared ease-out curve for all reveal animations. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Default whileInView viewport settings — fire once, slightly before fully in view. */
export const VIEWPORT = { once: true, margin: "-80px 0px" } as const;

/** Fade + slide-up reveal (~24px, ~500ms ease-out). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Opacity-only reveal — used as the prefers-reduced-motion fallback. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Parent container that staggers its children (badge → heading → copy → cards). */
export function stagger(delayChildren = 0, staggerChildren = 0.1): Variants {
  return {
    hidden: {},
    show: { transition: { delayChildren, staggerChildren } },
  };
}
