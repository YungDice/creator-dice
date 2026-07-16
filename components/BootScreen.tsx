"use client";

import type { PCPhase } from "@/components/Experience";

/**
 * What the computer's screen shows before the site "loads": a dark idle
 * screen with a blinking cursor, then a retro BIOS-style boot sequence with
 * a loading bar. Clicking anywhere skips straight to the site.
 */
export default function BootScreen({
  phase,
  onSkip,
}: {
  phase: Extract<PCPhase, "off" | "boot">;
  onSkip: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSkip}
      aria-label="Skip boot animation and open the site"
      className="block h-full w-full cursor-pointer bg-ink p-10 text-left font-mono text-xl text-bone/80"
    >
      {phase === "off" ? (
        <span className="boot-cursor inline-block h-6 w-3 bg-bone/70" />
      ) : (
        <div className="flex h-full flex-col">
          <div className="space-y-2">
            <p className="boot-line" style={{ animationDelay: "0.1s" }}>
              YUNG DICE SYSTEMS (R) BIOS v2.6
            </p>
            <p className="boot-line" style={{ animationDelay: "0.5s" }}>
              CPU: DICEROLL 66MHz .......... OK
            </p>
            <p className="boot-line" style={{ animationDelay: "0.9s" }}>
              MEMORY TEST: 640K ............ OK
            </p>
            <p className="boot-line" style={{ animationDelay: "1.3s" }}>
              AUDIO: 808 DRIVER ............ LOADED
            </p>
            <p className="boot-line" style={{ animationDelay: "1.7s" }}>
              LOADING YUNGDICE.EXE
            </p>
            <div
              className="boot-line mt-2 h-5 w-72 border border-bone/40 p-0.5"
              style={{ animationDelay: "1.8s" }}
            >
              <div className="boot-progress h-full bg-accent" />
            </div>
          </div>
          <p className="boot-line mt-auto text-sm text-bone/40" style={{ animationDelay: "2s" }}>
            CLICK TO SKIP
          </p>
        </div>
      )}
    </button>
  );
}
