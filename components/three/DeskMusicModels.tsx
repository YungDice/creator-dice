"use client";

import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { DESK_TOP_Y } from "@/components/three/DeskSetup";

const SPOTIFY_URL = "https://open.spotify.com/search/Yung%20Dice";
const APPLE_MUSIC_URL = "https://music.apple.com/us/search?term=Yung%20Dice";

const MODEL_URLS = {
  headphones: "/models/sony_wh-1000xm5.glb",
  microphone: "/models/blue_yeti_microphone.glb",
} as const;

type ModelKey = keyof typeof MODEL_URLS;
type Vec3 = [number, number, number];

function prepareModel(
  scene: THREE.Group,
  targetSize: number,
  rotation: Vec3,
): THREE.Group {
  const cloned = clone(scene) as THREE.Group;

  cloned.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = true;

    const tuneMaterial = (source: THREE.Material) => {
      const material = source.clone();
      if (material instanceof THREE.MeshStandardMaterial) {
        material.roughness = Math.max(material.roughness, 0.28);
        material.metalness = Math.min(material.metalness, 0.78);
        material.needsUpdate = true;
      }
      return material;
    };

    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map(tuneMaterial)
      : tuneMaterial(mesh.material);
  });

  cloned.updateMatrixWorld(true);
  const originalBounds = new THREE.Box3().setFromObject(cloned);
  const originalSize = originalBounds.getSize(new THREE.Vector3());
  const largestDimension = Math.max(originalSize.x, originalSize.y, originalSize.z, 0.0001);
  const scale = targetSize / largestDimension;
  const originalCenter = originalBounds.getCenter(new THREE.Vector3());

  cloned.scale.setScalar(scale);
  cloned.position.copy(originalCenter).multiplyScalar(-scale);

  const oriented = new THREE.Group();
  oriented.rotation.set(...rotation);
  oriented.add(cloned);
  oriented.updateMatrixWorld(true);

  const orientedBounds = new THREE.Box3().setFromObject(oriented);
  const orientedCenter = orientedBounds.getCenter(new THREE.Vector3());
  oriented.position.set(-orientedCenter.x, -orientedBounds.min.y, -orientedCenter.z);
  return oriented;
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.7 9.4c3.2-1 6.8-.7 9.4.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.2 12.1c2.7-.8 5.8-.5 8 .6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.7 14.7c2.1-.6 4.6-.4 6.5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <path d="M9.2 17.2V7.8l7.2-1.5v8.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.2 8.2l7.2-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="7.4" cy="17.5" rx="2.2" ry="1.6" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="14.6" cy="14.9" rx="2.2" ry="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function StreamingMenu({
  onEnter,
  onLeave,
}: {
  onEnter: () => void;
  onLeave: () => void;
}) {
  const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-white/15 bg-[#090909]/95 p-2 text-white shadow-[0_14px_45px_rgba(0,0,0,0.48)] backdrop-blur-md"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Open Yung Dice on Spotify"
        title="Spotify"
        onClick={() => open(SPOTIFY_URL)}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition duration-200 hover:-translate-y-0.5 hover:border-[#f0a262]/70 hover:bg-white/10 hover:text-[#ffc38e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a262]"
      >
        <SpotifyIcon />
      </button>
      <button
        type="button"
        aria-label="Open Yung Dice on Apple Music"
        title="Apple Music"
        onClick={() => open(APPLE_MUSIC_URL)}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/75 transition duration-200 hover:-translate-y-0.5 hover:border-[#f0a262]/70 hover:bg-white/10 hover:text-[#ffc38e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a262]"
      >
        <AppleMusicIcon />
      </button>
    </div>
  );
}

function InteractiveDeskModel({
  model,
  position,
  rotation,
  targetSize,
  menuPosition,
  hitbox,
}: {
  model: ModelKey;
  position: Vec3;
  rotation: Vec3;
  targetSize: number;
  menuPosition: Vec3;
  hitbox: Vec3;
}) {
  const gltf = useGLTF(MODEL_URLS[model]) as unknown as { scene: THREE.Group };
  const prepared = useMemo(
    () => prepareModel(gltf.scene, targetSize, rotation),
    [gltf.scene, rotation, targetSize],
  );
  const animated = useRef<THREE.Group>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverAmount = useRef(0);
  const [open, setOpen] = useState(false);

  const keepOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    document.body.style.cursor = open ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [open]);

  useFrame((_, delta) => {
    hoverAmount.current = THREE.MathUtils.damp(
      hoverAmount.current,
      open ? 1 : 0,
      10,
      Math.min(delta, 0.05),
    );
    if (!animated.current) return;
    const amount = hoverAmount.current;
    animated.current.position.y = amount * 0.018;
    animated.current.scale.setScalar(1 + amount * 0.035);
  });

  return (
    <group position={position}>
      <group
        ref={animated}
        onPointerOver={(event) => {
          event.stopPropagation();
          keepOpen();
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          scheduleClose();
        }}
      >
        <primitive object={prepared} />
        <mesh position={[0, hitbox[1] / 2, 0]}>
          <boxGeometry args={hitbox} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>

      {open && (
        <Html
          position={menuPosition}
          center
          zIndexRange={[60, 50]}
          style={{ pointerEvents: "auto" }}
        >
          <StreamingMenu onEnter={keepOpen} onLeave={scheduleClose} />
        </Html>
      )}
    </group>
  );
}

export default function DeskMusicModels() {
  return (
    <group>
      <InteractiveDeskModel
        model="headphones"
        position={[-0.62, DESK_TOP_Y + 0.006, 0.48]}
        rotation={[Math.PI / 2, 0, 0.38]}
        targetSize={0.225}
        menuPosition={[0, 0.19, 0]}
        hitbox={[0.26, 0.085, 0.23]}
      />
      <InteractiveDeskModel
        model="microphone"
        position={[-0.48, DESK_TOP_Y + 0.002, 0.34]}
        rotation={[0, 0.12, 0]}
        targetSize={0.255}
        menuPosition={[0.01, 0.34, 0]}
        hitbox={[0.14, 0.29, 0.14]}
      />
    </group>
  );
}

useGLTF.preload(MODEL_URLS.headphones);
useGLTF.preload(MODEL_URLS.microphone);
