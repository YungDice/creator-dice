"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { AppleMusicIcon, SpotifyIcon } from "@/components/icons";
import { socialLinks } from "@/data/socials";
import { DESK_TOP_Y } from "@/components/three/DeskSetup";

const MIC_URL = "/blue_yeti_microphone.glb";
const HEADPHONES_URL = "/sony_wh-1000xm5.glb";

const SPOTIFY_URL = socialLinks.find((s) => s.id === "spotify")?.url ?? "#";
const APPLE_MUSIC_URL = socialLinks.find((s) => s.id === "appleMusic")?.url ?? "#";

/** Loads a GLB, drops it so its base sits on y=0, centered on x/z, scaled to targetHeight. */
function FittedModel({ url, targetHeight }: { url: string; targetHeight: number }) {
  const { scene } = useGLTF(url);

  const { scale, offset } = useMemo(() => {
    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = targetHeight / size.y;
    return {
      scale: s,
      offset: [-center.x * s, -box.min.y * s, -center.z * s] as [number, number, number],
    };
  }, [scene, targetHeight]);

  // Transform a wrapper group, never the loaded scene itself — drei caches and
  // shares that object, and mutating its scale corrupts later re-measurements.
  return (
    <group scale={scale} position={offset}>
      <primitive object={scene} />
    </group>
  );
}

function ServiceButton({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-transform hover:scale-105 ${className}`}
    >
      {icon}
      {label}
    </a>
  );
}

const MIC_ROT_Y = 0.28;
const HEADPHONES_ROT_Y = 0.9;

export default function MusicGear({ interactive = true }: { interactive?: boolean }) {
  const [open, setOpen] = useState(false);
  const mic = useRef<THREE.Group>(null);
  const headphones = useRef<THREE.Group>(null);
  const spread = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    if (!interactive) return;
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 260);
  };

  useEffect(() => {
    document.body.style.cursor = open ? "pointer" : "";
    return () => {
      clearTimeout(closeTimer.current);
      document.body.style.cursor = "";
    };
  }, [open]);

  // The intro camera pan can sweep the models under a stationary cursor, which
  // opens the popup with no pointerout to ever close it — keep it shut until live.
  useEffect(() => {
    if (!interactive) {
      clearTimeout(closeTimer.current);
      setOpen(false);
    }
  }, [interactive]);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 7);
    spread.current += ((open ? 1 : 0) - spread.current) * k;
    const s = spread.current;
    if (mic.current) mic.current.rotation.y = MIC_ROT_Y - s * 0.35;
    if (headphones.current) headphones.current.rotation.y = HEADPHONES_ROT_Y + s * 0.42;
  });

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        show();
      }}
      onPointerOut={hide}
      onClick={(e) => {
        e.stopPropagation();
        show();
      }}
    >
      <group ref={mic} position={[-0.48, DESK_TOP_Y, 0.34]} rotation={[0, MIC_ROT_Y, 0]}>
        <FittedModel url={MIC_URL} targetHeight={0.27} />
      </group>
      <group ref={headphones} position={[-0.64, DESK_TOP_Y, 0.47]} rotation={[0, HEADPHONES_ROT_Y, 0]}>
        <FittedModel url={HEADPHONES_URL} targetHeight={0.18} />
      </group>

      {/* Both models are matte black; without a dedicated fill they vanish into the desk shadows. */}
      <pointLight position={[-0.55, DESK_TOP_Y + 0.34, 0.66]} intensity={0.85} distance={1.1} color="#FFD9AE" />

      {open && (
        <Html position={[-0.55, DESK_TOP_Y + 0.4, 0.4]} center zIndexRange={[40, 30]}>
          <div
            onMouseEnter={show}
            onMouseLeave={hide}
            className="flex flex-col items-center gap-3 rounded-2xl border border-accent bg-ink/90 px-5 py-4 shadow-glow backdrop-blur"
          >
            <div className="whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-bone/70">
              Listen on
            </div>
            <div className="flex items-center gap-3">
              <ServiceButton
                href={SPOTIFY_URL}
                label="Spotify"
                icon={<SpotifyIcon className="h-4 w-4" />}
                className="bg-[#1DB954] text-ink"
              />
              <ServiceButton
                href={APPLE_MUSIC_URL}
                label="Apple Music"
                icon={<AppleMusicIcon className="h-4 w-4" />}
                className="whitespace-nowrap bg-bone text-ink"
              />
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload(MIC_URL);
useGLTF.preload(HEADPHONES_URL);
