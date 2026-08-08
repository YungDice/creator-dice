"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import BootScreen from "@/components/BootScreen";
import SiteContent from "@/components/SiteContent";
import { ScrollContainerContext } from "@/lib/scroll-context";

const PCScene = dynamic(() => import("@/components/three/PCScene"), { ssr: false });

/** off → screen dark, LED off · boot → BIOS sequence · on → the site is live */
export type PCPhase = "off" | "boot" | "on";

type Mode = "deciding" | "flat" | "3d";

const OFF_MS = 900;
const BOOT_MS = 3200;

function canRun3D(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 1024 || window.innerHeight < 620) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function BlackLoader({ fading = false }: { fading?: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-[1200ms] ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    />
  );
}

export default function Experience() {
  const [mode, setMode] = useState<Mode>("deciding");
  const [eligible, setEligible] = useState(false);
  const [phase, setPhase] = useState<PCPhase>("off");
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const ok = canRun3D();
    setEligible(ok);
    setMode(ok ? "3d" : "flat");
  }, []);

  useEffect(() => {
    if (mode !== "3d") setSceneReady(false);
  }, [mode]);

  useEffect(() => {
    if (mode !== "3d" || phase === "on") return;
    const t1 = window.setTimeout(() => setPhase("boot"), phase === "off" ? OFF_MS : 0);
    const t2 = window.setTimeout(() => setPhase("on"), OFF_MS + BOOT_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [mode, phase]);

  useEffect(() => {
    document.documentElement.style.overflow = mode === "deciding" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mode]);

  if (mode === "deciding") return <BlackLoader />;

  if (mode === "flat") {
    return (
      <>
        <MonitorFrame>
          <ScreenSite />
        </MonitorFrame>
        {eligible && (
          <button
            type="button"
            onClick={() => {
              setPhase("off");
              setSceneReady(false);
              setMode("3d");
            }}
            className="fixed bottom-5 right-5 z-50 rounded-full border border-graphite bg-black/80 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition-colors duration-150 ease-out hover:border-white"
          >
            ▸ Back inside the PC
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <PCScene
        phase={phase}
        onReady={() => setSceneReady(true)}
        screenContent={
          phase === "on" ? (
            <ScreenSite />
          ) : (
            <BootScreen phase={phase} onSkip={() => setPhase("on")} />
          )
        }
      />

      <BlackLoader fading={sceneReady} />

      <button
        type="button"
        onClick={() => setMode("flat")}
        className={`fixed bottom-5 right-5 z-50 rounded-full border border-graphite bg-black/70 px-5 py-2.5 text-sm font-medium text-bone backdrop-blur transition-all duration-700 hover:border-white ${
          sceneReady ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        ⤢ View fullscreen site
      </button>
    </>
  );
}

function MonitorFrame({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute inset-0 sm:inset-x-10 sm:bottom-5 sm:top-6 sm:rounded-panel sm:border sm:border-graphite sm:bg-[#0b0e14] sm:p-4 sm:pb-12 lg:inset-x-20">
        <div className="h-full w-full sm:rounded-2xl sm:border sm:border-graphite sm:bg-black sm:p-2.5">
          <div className="h-full w-full overflow-hidden bg-ink sm:rounded-lg" style={{ transform: "translateZ(0)" }}>
            {children}
          </div>
        </div>
        <div className="absolute inset-x-9 bottom-3 hidden h-6 items-center justify-between sm:flex">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(146,129,247,0.55)]"
          />
          <span aria-hidden="true" className="h-1.5 w-44 rounded-full bg-graphite" />
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="h-2 w-14 rounded-sm bg-graphite" />
            <span className="h-2 w-3 rounded-sm bg-graphite" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** The site inside the PC screen: its own scroll container + scroll context. */
function ScreenSite() {
  const ref = useRef<HTMLDivElement>(null);

  const onClickCapture = (e: React.MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
    const container = ref.current;
    if (!anchor || !container) return;
    const id = anchor.getAttribute("href")!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    let top = 0;
    let node: HTMLElement | null = target;
    while (node && node !== container) {
      top += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({ top: Math.max(0, top - 88), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <ScrollContainerContext.Provider value={ref}>
      <div
        ref={ref}
        onClickCapture={onClickCapture}
        className="pc-screen relative h-full w-full overflow-y-auto overflow-x-hidden"
      >
        <SiteContent />
      </div>
    </ScrollContainerContext.Provider>
  );
}
