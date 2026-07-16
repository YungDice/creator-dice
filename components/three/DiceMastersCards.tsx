"use client";

import { Html, RoundedBox, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const DICE_MASTERS_URL = "https://dice-masters.yungdice.com";

function sliceCard(img: HTMLImageElement, col: number, row: number): THREE.CanvasTexture {
  const sx = (col * 0.25 + 0.006) * img.width;
  const sw = 0.238 * img.width;
  const sy = (row === 0 ? 0.004 : 0.522) * img.height;
  const sh = 0.472 * img.height;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = Math.round((512 * sh) / sw);
  const g = canvas.getContext("2d")!;
  g.beginPath();
  g.roundRect(0, 0, canvas.width, canvas.height, canvas.width * 0.07);
  g.clip();
  g.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

const PIP_GRID: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};

const FACE_ROTATIONS: [number, number, number][] = [
  [0, 0, 0],
  [0, Math.PI, 0],
  [0, Math.PI / 2, 0],
  [0, -Math.PI / 2, 0],
  [-Math.PI / 2, 0, 0],
  [Math.PI / 2, 0, 0],
];

function Die({
  position,
  rotationY,
  top,
  size = 0.42,
}: {
  position: [number, number, number];
  rotationY: number;
  top: number;
  size?: number;
}) {
  const counts = useMemo(() => {
    const used = new Set([top, 7 - top]);
    const rest = [1, 2, 3, 4, 5, 6].filter((n) => !used.has(n) && n < 4);
    const [a, b] = [rest[0], rest[1] ?? 7 - rest[0]];
    return [a, 7 - a, b, 7 - b, top, 7 - top];
  }, [top]);

  const off = size * 0.26;
  const half = size / 2 + 0.002;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[size, size, size]} radius={size * 0.14} smoothness={4}>
        <meshStandardMaterial color="#E8384F" roughness={0.25} />
      </RoundedBox>
      {FACE_ROTATIONS.map((rot, f) => (
        <group key={f} rotation={rot}>
          {PIP_GRID[counts[f]].map(([u, v], i) => (
            <mesh key={i} position={[u * off, v * off, half]}>
              <circleGeometry args={[size * 0.085, 24]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

const CARD_PICKS: [number, number][] = [
  [0, 1],
  [0, 0],
  [1, 0],
];

const CARD_LAYOUT: [number, number, number, number][] = [
  [-0.55, 0.15, 0.4, 0.03],
  [0, 0, 0.05, 0.055],
  [0.55, 0.12, -0.32, 0.08],
];
const FAN_DX = [-0.14, 0, 0.14];
const FAN_ROT = [0.18, 0, -0.16];

export default function DiceMastersCards({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}: {
  position?: [number, number, number];
  scale?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const lift = useRef<THREE.Group>(null);
  const dice = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Mesh | null)[]>([]);
  const spread = useRef(0);

  const acesSheet = useTexture("/images/aces.jpg");
  const cardTextures = useMemo(
    () => CARD_PICKS.map(([c, r]) => sliceCard(acesSheet.image as HTMLImageElement, c, r)),
    [acesSheet],
  );

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  useFrame((_, dt) => {
    const k = 1 - Math.exp(-dt * 7);
    spread.current += ((hovered ? 1 : 0) - spread.current) * k;
    const s = spread.current;

    if (lift.current) {
      lift.current.position.y = s * 0.16;
      lift.current.scale.setScalar(1 + s * 0.04);
    }
    cardRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.z = CARD_LAYOUT[i][2] + s * FAN_ROT[i];
      mesh.position.x = CARD_LAYOUT[i][0] + s * FAN_DX[i];
    });
    if (dice.current) dice.current.rotation.y = s * 0.18;
  });

  return (
    <group
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        window.open(DICE_MASTERS_URL, "_blank", "noopener,noreferrer");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <group ref={lift}>
        {CARD_LAYOUT.map(([x, z, rot, y], i) => (
          <mesh
            key={i}
            ref={(mesh) => {
              cardRefs.current[i] = mesh;
            }}
            position={[x, y, z]}
            rotation={[-Math.PI / 2, 0, rot]}
          >
            <planeGeometry args={[0.92, 1.28]} />
            <meshStandardMaterial map={cardTextures[i]} transparent roughness={0.5} />
          </mesh>
        ))}
        <group ref={dice}>
          <Die position={[-1.05, 0.21, 0.85]} rotationY={0.5} top={5} />
          <Die position={[-0.55, 0.21, 1.05]} rotationY={-0.3} top={3} />
        </group>
      </group>

      {hovered && (
        <Html position={[-0.1, 1.15, 0.2]} center zIndexRange={[40, 30]} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full border border-accent bg-ink/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-bone shadow-glow">
            Dice Masters ↗
          </div>
        </Html>
      )}
    </group>
  );
}
