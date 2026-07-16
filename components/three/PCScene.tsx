"use client";

import { ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { PerspectiveCamera } from "three";
import DeskSetup, { DESK_TOP_Y } from "@/components/three/DeskSetup";
import DiceMastersCards from "@/components/three/DiceMastersCards";
import GamingChair from "@/components/three/GamingChair";
import GamingRoom from "@/components/three/GamingRoom";
import type { PCPhase } from "@/components/Experience";

/**
 * Full-viewport 3D scene: a cozy dark gaming corner with warm wood walls,
 * a matching walnut desk and a triple-monitor workstation. The real site is
 * rendered live on the center screen.
 */

const FOV = 42;
const MIN_ZOOM = 0.7;
const MAX_ZOOM = 2.5;

const POS_A = new THREE.Vector3(-1.7, 2.05, 3.3);
const LOOK_A = new THREE.Vector3(0.45, 1.05, 0.2);
const POS_B = new THREE.Vector3(0, 1.13, 1.05);
const LOOK_B = new THREE.Vector3(0, 1.13, 0.19);

const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

function KeyLight() {
  const target = useMemo(() => new THREE.Object3D(), []);
  return (
    <>
      <spotLight
        position={[-1.4, 2.55, 2.6]}
        angle={0.75}
        penumbra={0.9}
        intensity={7}
        decay={1.6}
        color="#FFDDB4"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        target={target}
      />
      <primitive object={target} position={[0.3, 0.8, 0.4]} />
    </>
  );
}

/** Applies the room-specific finish and spacing to the reusable desk model. */
function Workstation({
  phase,
  screenContent,
}: {
  phase: PCPhase;
  screenContent: ReactNode;
}) {
  const setup = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const root = setup.current;
    if (!root) return;

    const objects: THREE.Object3D[] = [];
    root.traverse((object) => objects.push(object));

    // Match the warm slatted wall/floor instead of using a bright white desk.
    const deskParts = objects.filter(
      (object) =>
        object instanceof THREE.Mesh &&
        (Math.abs(object.position.x - 0.15) < 0.01 ||
          Math.abs(object.position.x + 0.72) < 0.01 ||
          Math.abs(object.position.x - 1.02) < 0.01) &&
        (Math.abs(object.position.y - (DESK_TOP_Y - 0.025)) < 0.01 ||
          Math.abs(object.position.y - (DESK_TOP_Y - 0.05) / 2) < 0.01),
    ) as THREE.Mesh[];

    deskParts.forEach((part) => {
      const material = part.material;
      if (!(material instanceof THREE.MeshStandardMaterial)) return;

      const isTop = Math.abs(part.position.x - 0.15) < 0.01;
      material.color.set(isTop ? "#6B3E25" : "#3A2117");
      material.roughness = isTop ? 0.5 : 0.58;
      material.metalness = 0;
      material.needsUpdate = true;
    });

    // Move the right portrait monitor out of the PC case and into the gap.
    const rightMonitor = objects.find(
      (object) =>
        object instanceof THREE.Group &&
        Math.abs(object.position.x - 0.72) < 0.01 &&
        Math.abs(object.position.y - DESK_TOP_Y) < 0.01 &&
        Math.abs(object.position.z - 0.12) < 0.01,
    );

    if (rightMonitor) {
      rightMonitor.position.set(0.54, DESK_TOP_Y, 0.12);
      rightMonitor.rotation.y = -0.12;
    }
  }, []);

  return (
    <group ref={setup}>
      <DeskSetup phase={phase} screenContent={screenContent} />
    </group>
  );
}

function CameraRig({ zoom }: { zoom: number }) {
  const pointer = useRef({ x: 0, y: 0 });
  const look = useRef(LOOK_A.clone());
  const target = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ camera }) => {
    const t = Math.min(1, Math.max(0, (zoom - 1) / (MAX_ZOOM - 1)));
    target.current.lerpVectors(POS_A, POS_B, t);
    lookTarget.current.lerpVectors(LOOK_A, LOOK_B, t);
    if (zoom < 1) {
      target.current
        .copy(LOOK_A)
        .addScaledVector(new THREE.Vector3().subVectors(POS_A, LOOK_A), 1 / zoom);
    }
    target.current.x += pointer.current.x * 0.07;
    target.current.y += 0.03 - pointer.current.y * 0.05;

    camera.position.lerp(target.current, 0.06);
    look.current.lerp(lookTarget.current, 0.08);
    camera.lookAt(look.current);
    (camera as PerspectiveCamera).fov = FOV;
    (camera as PerspectiveCamera).updateProjectionMatrix();
  });
  return null;
}

export default function PCScene({
  phase,
  screenContent,
}: {
  phase: PCPhase;
  screenContent: ReactNode;
}) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const overCanvas = e.target instanceof HTMLElement && e.target.tagName === "CANVAS";
      if (!e.ctrlKey && !overCanvas) return;
      e.preventDefault();
      setZoom((z) => clampZoom(z * Math.exp(-e.deltaY * 0.0012)));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#141416]">
      <Canvas shadows camera={{ position: POS_A.toArray(), fov: FOV }} dpr={[1, 2]}>
        <color attach="background" args={["#141416"]} />
        <CameraRig zoom={zoom} />

        <ambientLight intensity={0.16} color="#FFE2C4" />
        <directionalLight position={[-2.5, 2.4, 3.8]} intensity={0.22} color="#FFD9B0" />
        <KeyLight />

        <Suspense fallback={null}>
          <GamingRoom />
          <Workstation phase={phase} screenContent={screenContent} />
          <GamingChair position={[-1.35, 0, 2.0]} rotationY={-0.42} />
          <DiceMastersCards position={[0.55, DESK_TOP_Y, 0.56]} scale={0.11} />
        </Suspense>

        <ContactShadows position={[-0.4, 0.002, 1.3]} opacity={0.5} scale={5} blur={2.4} far={1.6} />
      </Canvas>

      <div className="absolute left-5 top-5 z-50 flex items-center gap-0.5 rounded-full border border-white/30 bg-ink/70 p-1 text-bone backdrop-blur">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoom((z) => clampZoom(z / 1.25))}
          className="h-8 w-8 rounded-full text-lg leading-none transition-colors hover:bg-white/10 hover:text-accent"
        >
          −
        </button>
        <button
          type="button"
          title="Reset zoom"
          onClick={() => setZoom(1)}
          className="w-12 text-center text-xs font-semibold tabular-nums transition-colors hover:text-accent"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoom((z) => clampZoom(z * 1.25))}
          className="h-8 w-8 rounded-full text-lg leading-none transition-colors hover:bg-white/10 hover:text-accent"
        >
          +
        </button>
      </div>
    </div>
  );
}
