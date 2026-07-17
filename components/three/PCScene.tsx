"use client";

import { ContactShadows, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from "react";
import * as THREE from "three";
import DeskSetup, { DESK_TOP_Y } from "@/components/three/DeskSetup";
import DiceMastersCards from "@/components/three/DiceMastersCards";
import GamingChair from "@/components/three/GamingChair";
import MusicGear from "@/components/three/MusicGear";
import GamingRoom from "@/components/three/GamingRoom";
import type { PCPhase } from "@/components/Experience";

const FOV = 42;
const MIN_ZOOM = 0.7;
const MAX_ZOOM = 2.5;

const POS_A = new THREE.Vector3(-1.7, 2.05, 3.3);
const LOOK_A = new THREE.Vector3(0.45, 1.05, 0.2);
const POS_B = new THREE.Vector3(0, 1.13, 1.05);
const LOOK_B = new THREE.Vector3(0, 1.13, 0.19);

const clampZoom = (zoom: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));

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
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        target={target}
      />
      <primitive object={target} position={[0.3, 0.8, 0.4]} />
    </>
  );
}

function ReadySignal({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => onReady?.());
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [onReady]);
  return null;
}

/**
 * The desk model already contains a glass side panel. This pass gives that
 * panel a visible warm tint and replaces the PC's cyan/purple RGB with amber
 * light without changing the rest of the workstation.
 */
function WarmWorkstation({
  phase,
  screenContent,
}: {
  phase: PCPhase;
  screenContent: ReactNode;
}) {
  const root = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const group = root.current;
    if (!group) return;

    group.updateMatrixWorld(true);
    const position = new THREE.Vector3();
    const warmEmissive = new THREE.Color("#E97832");
    const warmCharcoal = new THREE.Color("#241A16");

    group.traverse((object) => {
      object.getWorldPosition(position);
      const insidePc =
        position.x > 0.68 &&
        position.x < 1.08 &&
        position.y > DESK_TOP_Y + 0.02 &&
        position.y < 1.36 &&
        position.z > 0.015 &&
        position.z < 0.57;

      if (!insidePc) return;

      if (object instanceof THREE.PointLight) {
        object.color.set("#FF9C52");
        object.intensity = Math.min(object.intensity * 0.72, 0.58);
        return;
      }

      if (!(object instanceof THREE.Mesh)) return;

      const adjustMaterial = (source: THREE.Material): THREE.Material => {
        const material = source.clone();

        if (material instanceof THREE.MeshPhysicalMaterial) {
          material.color.set("#3A2118");
          material.transparent = true;
          material.opacity = 0.38;
          material.transmission = 0.04;
          material.roughness = 0.13;
          material.metalness = 0.08;
          material.clearcoat = 1;
          material.clearcoatRoughness = 0.08;
          material.depthWrite = false;
          material.side = THREE.DoubleSide;
          material.needsUpdate = true;
          return material;
        }

        if (material instanceof THREE.MeshStandardMaterial) {
          const emissivePower = material.emissive.r + material.emissive.g + material.emissive.b;
          const brightness = material.color.r + material.color.g + material.color.b;

          if (emissivePower > 0.025) {
            material.emissive.copy(warmEmissive);
            material.emissiveIntensity = Math.min(Math.max(material.emissiveIntensity, 0.35), 0.82);
            material.color.set(brightness > 1.35 ? "#D9A06B" : "#33231C");
            material.toneMapped = false;
          } else {
            const max = Math.max(material.color.r, material.color.g, material.color.b);
            const min = Math.min(material.color.r, material.color.g, material.color.b);
            const coolBiased = material.color.b > material.color.r * 1.04;
            const neutralDark = max < 0.42 && max - min < 0.11;
            if (coolBiased || neutralDark) material.color.lerp(warmCharcoal, neutralDark ? 0.34 : 0.5);
          }

          material.needsUpdate = true;
        }

        return material;
      };

      object.material = Array.isArray(object.material)
        ? object.material.map(adjustMaterial)
        : adjustMaterial(object.material);
    });
  }, []);

  return (
    <group ref={root}>
      <DeskSetup phase={phase} screenContent={screenContent} />
      <WarmPcGlass />
    </group>
  );
}

/** A thin reflective outer pane and frame so the case reads clearly as glass. */
function WarmPcGlass() {
  const caseHeight = 0.52;
  const caseDepth = 0.47;

  return (
    <group position={[0.87, DESK_TOP_Y + caseHeight / 2 + 0.035, 0.29]}>
      <RoundedBox
        args={[0.009, caseHeight - 0.018, caseDepth - 0.018]}
        radius={0.008}
        smoothness={3}
        position={[-0.16, 0, 0]}
      >
        <meshPhysicalMaterial
          color="#563324"
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.06}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {[-1, 1].map((side) => (
        <RoundedBox
          key={`glass-v-${side}`}
          args={[0.014, caseHeight, 0.014]}
          radius={0.004}
          smoothness={2}
          position={[-0.166, 0, side * (caseDepth / 2 - 0.008)]}
        >
          <meshStandardMaterial color="#342117" roughness={0.25} metalness={0.72} />
        </RoundedBox>
      ))}
      {[-1, 1].map((side) => (
        <RoundedBox
          key={`glass-h-${side}`}
          args={[0.014, 0.014, caseDepth]}
          radius={0.004}
          smoothness={2}
          position={[-0.166, side * (caseHeight / 2 - 0.008), 0]}
        >
          <meshStandardMaterial color="#342117" roughness={0.25} metalness={0.72} />
        </RoundedBox>
      ))}

      <pointLight position={[-0.06, 0.015, 0.02]} intensity={0.42} distance={0.72} color="#FF9B50" />
    </group>
  );
}

function CameraRig({ zoomTarget }: { zoomTarget: MutableRefObject<number> }) {
  const pointer = useRef({ x: 0, y: 0 });
  const smoothPointer = useRef(new THREE.Vector2());
  const smoothZoom = useRef(1);
  const look = useRef(LOOK_A.clone());
  const target = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ camera }, delta) => {
    const frameDelta = Math.min(delta, 0.05);
    smoothZoom.current = THREE.MathUtils.damp(smoothZoom.current, zoomTarget.current, 7.5, frameDelta);
    smoothPointer.current.x = THREE.MathUtils.damp(smoothPointer.current.x, pointer.current.x, 9, frameDelta);
    smoothPointer.current.y = THREE.MathUtils.damp(smoothPointer.current.y, pointer.current.y, 9, frameDelta);

    const zoom = smoothZoom.current;
    const t = THREE.MathUtils.smoothstep(zoom, 1, MAX_ZOOM);
    target.current.lerpVectors(POS_A, POS_B, t);
    lookTarget.current.lerpVectors(LOOK_A, LOOK_B, t);

    if (zoom < 1) {
      target.current
        .copy(LOOK_A)
        .addScaledVector(new THREE.Vector3().subVectors(POS_A, LOOK_A), 1 / zoom);
    }

    target.current.x += smoothPointer.current.x * 0.07;
    target.current.y += 0.03 - smoothPointer.current.y * 0.05;

    const positionFollow = 1 - Math.exp(-frameDelta * 7.5);
    const lookFollow = 1 - Math.exp(-frameDelta * 9);
    camera.position.lerp(target.current, positionFollow);
    look.current.lerp(lookTarget.current, lookFollow);
    camera.lookAt(look.current);
  });

  return null;
}

function ZoomControls({ zoomTarget }: { zoomTarget: MutableRefObject<number> }) {
  const [displayZoom, setDisplayZoom] = useState(zoomTarget.current);

  const setTarget = (nextZoom: number) => {
    const zoom = clampZoom(nextZoom);
    zoomTarget.current = zoom;
    setDisplayZoom(zoom);
  };

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const overCanvas = event.target instanceof HTMLElement && event.target.tagName === "CANVAS";
      if (!event.ctrlKey && !overCanvas) return;

      event.preventDefault();
      const pixels =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? event.deltaY * window.innerHeight
            : event.deltaY;
      const next = clampZoom(zoomTarget.current * Math.exp(-pixels * 0.00082));
      zoomTarget.current = next;
      setDisplayZoom(next);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [zoomTarget]);

  return (
    <div className="absolute left-5 top-5 z-50 flex items-center gap-0.5 rounded-full border border-white/20 bg-ink/70 p-1 text-bone backdrop-blur">
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => setTarget(zoomTarget.current / 1.18)}
        className="h-8 w-8 rounded-full text-lg leading-none transition-colors hover:bg-white/10 hover:text-accent"
      >
        −
      </button>
      <button
        type="button"
        title="Reset zoom"
        onClick={() => setTarget(1)}
        className="w-12 text-center text-xs font-semibold tabular-nums transition-colors hover:text-accent"
      >
        {Math.round(displayZoom * 100)}%
      </button>
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => setTarget(zoomTarget.current * 1.18)}
        className="h-8 w-8 rounded-full text-lg leading-none transition-colors hover:bg-white/10 hover:text-accent"
      >
        +
      </button>
    </div>
  );
}

export default function PCScene({
  phase,
  screenContent,
  onReady,
}: {
  phase: PCPhase;
  screenContent: ReactNode;
  onReady?: () => void;
}) {
  const zoomTarget = useRef(1);

  return (
    <div className="fixed inset-0 bg-[#0B0C0E]">
      <Canvas
        shadows
        camera={{ position: POS_A.toArray(), fov: FOV }}
        dpr={[0.75, 1.35]}
        performance={{ min: 0.65, max: 1, debounce: 180 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0B0C0E"]} />
        <fog attach="fog" args={["#0B0C0E", 4.5, 10]} />
        <CameraRig zoomTarget={zoomTarget} />

        <ambientLight intensity={0.16} color="#FFE2C4" />
        <directionalLight position={[-2.5, 2.4, 3.8]} intensity={0.22} color="#FFD9B0" />
        <KeyLight />

        <Suspense fallback={null}>
          <GamingRoom />
          <WarmWorkstation phase={phase} screenContent={screenContent} />
          <GamingChair position={[-1.35, 0, 2.0]} rotationY={-0.42} />
          <DiceMastersCards position={[0.55, DESK_TOP_Y, 0.56]} scale={0.11} />
          <MusicGear interactive={phase === "on"} />
          <ReadySignal onReady={onReady} />
        </Suspense>

        <ContactShadows
          position={[-0.4, 0.002, 1.3]}
          opacity={0.5}
          scale={5}
          blur={2.2}
          far={1.8}
          frames={1}
          resolution={512}
        />
      </Canvas>

      <ZoomControls zoomTarget={zoomTarget} />
    </div>
  );
}
