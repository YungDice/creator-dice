"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { site } from "@/data/site";

/**
 * The signature hero visual: a chunky pastel-blue retro all-in-one computer
 * (monitor + base unit + keyboard + mouse, coiled cables) drawn as a layered
 * SVG, with the site's own hero content rendered live — in miniature, in the
 * real black-and-white palette — inside the screen area as an HTML overlay.
 *
 * Motion: idle float/bob loop + subtle tilt following the cursor (max ~5°),
 * both disabled under prefers-reduced-motion. Screen text sizes use container
 * query units (cqw) so the mini-site scales with the computer.
 *
 * To swap this for a commissioned 3D render or video loop later, see
 * README.md § "{{PC_RENDER_ASSET}}".
 */

const VB = { w: 720, h: 640 };
const SCREEN = { x: 214, y: 110, w: 292, h: 196 };

const KEY_ROWS = [0, 1, 2];
const KEYS_PER_ROW = 12;
const VENTS = [0, 1, 2, 3];

export default function RetroComputer() {
  const reduced = useReducedMotion();

  // Cursor-follow tilt, spring-smoothed, clamped to ±5deg.
  const mx = useMotionValue(0); // -1..1 across viewport
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-5, 5]), {
    stiffness: 60,
    damping: 15,
  });
  const rotateX = useSpring(useTransform(my, [-1, 1], [4, -4]), {
    stiffness: 60,
    damping: 15,
  });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, mx, my]);

  return (
    <motion.div
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      className="mx-auto w-full max-w-[560px]"
    >
      <motion.figure
        aria-label="Illustration of a retro pastel-blue computer showing the Yung Dice site on its screen"
        className="relative [container-type:inline-size]"
        animate={reduced ? undefined : { y: [0, -10, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="h-auto w-full"
          role="img"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pc-shell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C3DCEE" />
              <stop offset="100%" stopColor="#9FC0DC" />
            </linearGradient>
            <linearGradient id="pc-shell-dark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9FC0DC" />
              <stop offset="100%" stopColor="#86A9C8" />
            </linearGradient>
            <filter id="pc-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="370" cy="614" rx="270" ry="20" fill="#000" opacity="0.55" filter="url(#pc-soft)" />

          {/* Monitor cable, coiling left */}
          <path
            d="M170 470 c-38 6 -66 -4 -64 -22 c2 -16 30 -18 32 -4 c2 12 -20 18 -34 8 c-16 -12 -10 -34 12 -40"
            fill="none"
            stroke="#7FA8C9"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Mouse cable, coiling right up to the base unit */}
          <path
            d="M622 546 c6 -18 -4 -30 -18 -28 c-14 2 -14 20 -2 22 c14 2 20 -14 10 -24 c-10 -10 -34 -8 -42 4"
            fill="none"
            stroke="#7FA8C9"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Base unit */}
          <rect x="140" y="440" width="440" height="84" rx="16" fill="url(#pc-shell)" stroke="#86A9C8" strokeWidth="2" />
          {VENTS.map((i) => (
            <rect key={i} x={166} y={458 + i * 12} width="44" height="4" rx="2" fill="#8FB3D0" />
          ))}
          {/* Floppy slot */}
          <rect x="388" y="474" width="128" height="10" rx="5" fill="#1E2A34" />
          <rect x="388" y="490" width="60" height="4" rx="2" fill="#8FB3D0" />
          {/* Power LED — accent-colored */}
          <circle cx="552" cy="479" r="5" className="fill-accent" />

          {/* Monitor neck */}
          <rect x="318" y="392" width="84" height="50" rx="6" fill="url(#pc-shell-dark)" />

          {/* Monitor shell */}
          <rect x="170" y="64" width="380" height="330" rx="28" fill="url(#pc-shell)" stroke="#86A9C8" strokeWidth="2" />
          <rect x="188" y="78" width="344" height="12" rx="6" fill="#FFFFFF" opacity="0.35" />
          {/* Bezel (off-white) */}
          <rect x="200" y="96" width="320" height="240" rx="12" fill="#EFEFE8" stroke="#D9D9CE" strokeWidth="2" />
          {/* Screen (dark — real content overlaid in HTML below) */}
          <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx="6" fill="#0A0A0A" />
          {/* Chin details: brand dot + slot */}
          <circle cx="226" cy="366" r="5" className="fill-accent" />
          <rect x="452" y="360" width="52" height="8" rx="4" fill="#8FB3D0" />

          {/* Keyboard */}
          <rect x="190" y="536" width="300" height="64" rx="12" fill="url(#pc-shell)" stroke="#86A9C8" strokeWidth="2" />
          {KEY_ROWS.map((row) =>
            Array.from({ length: KEYS_PER_ROW }, (_, col) => (
              <rect
                key={`${row}-${col}`}
                x={204 + col * 23}
                y={545 + row * 14}
                width="18"
                height="10"
                rx="3"
                fill="#EDF3F8"
                stroke="#C9DAE8"
                strokeWidth="0.5"
              />
            )),
          )}
          {/* Spacebar */}
          <rect x="250" y="587" width="180" height="10" rx="3" fill="#EDF3F8" stroke="#C9DAE8" strokeWidth="0.5" />

          {/* Mouse */}
          <rect x="596" y="544" width="56" height="76" rx="26" fill="url(#pc-shell)" stroke="#86A9C8" strokeWidth="2" />
          <path d="M624 552 v18" stroke="#86A9C8" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Live mini-site rendered on the screen, in the real B&W palette */}
        <div
          aria-hidden="true"
          className="absolute flex flex-col overflow-hidden bg-ink"
          style={{
            left: `${(SCREEN.x / VB.w) * 100}%`,
            top: `${(SCREEN.y / VB.h) * 100}%`,
            width: `${(SCREEN.w / VB.w) * 100}%`,
            height: `${(SCREEN.h / VB.h) * 100}%`,
            borderRadius: "2%",
          }}
        >
          <div className="flex items-center justify-between border-b border-white/15 px-[2.4cqw] py-[1.2cqw]">
            <span className="whitespace-nowrap font-display text-[1.9cqw] font-bold tracking-tight text-bone">
              {site.name}
              <span className="text-accent">.</span>
            </span>
            <span className="whitespace-nowrap text-[1.1cqw] uppercase tracking-[0.15em] text-bone/50">
              About&ensp;Music&ensp;Work&ensp;Contact
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-[1.2cqw] px-[2.4cqw]">
            <span className="text-[1.2cqw] font-semibold uppercase tracking-[0.3em] text-accent">
              Official Site
            </span>
            <span className="font-display text-[3.1cqw] font-bold uppercase leading-[1.1] tracking-tight text-bone">
              Beats built on
              <br />
              the roll of the dice
            </span>
            <span className="mt-[0.8cqw] inline-flex w-fit items-center rounded-full bg-accent px-[2.4cqw] py-[0.9cqw] text-[1.3cqw] font-semibold text-bone">
              Listen Now
            </span>
          </div>
        </div>
      </motion.figure>
    </motion.div>
  );
}
