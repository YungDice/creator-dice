"use client";

import { RoundedBox, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import {
  coverTexture,
  makeDarkWallTexture,
  makeDarkWoodTexture,
  makePosterTexture,
} from "@/components/three/pastelArt";

/**
 * The bedroom corner, dark cozy edition: charcoal block walls, a wood-slat
 * feature panel with warm amber light bars behind the desk, dark wooden
 * floor, an asymmetric poster collage (real photo posters mixed with
 * generated art prints), and a floating white shelf with a warm LED strip,
 * collectible figures and a spare pastel keyboard.
 *
 * Units are meters. Floor at y=0, back wall at z=0 (facing +z), right wall
 * at x=2.2 (facing -x).
 */

const RIGHT_WALL_X = 2.2;
const ROOM_LEFT = -3.8;
const ROOM_DEPTH = 7;
const CEILING_Y = 2.72;

// Poster collage on the back wall: [x, y, w, h, tilt, seed, landscape?]
const BACK_POSTERS: [number, number, number, number, number, number, boolean?][] = [
  [-1.45, 2.1, 0.24, 0.34, 0.02, 1],
  [-1.14, 2.32, 0.2, 0.28, -0.03, 2],
  [-1.16, 1.95, 0.21, 0.3, 0.015, 3],
  [-0.86, 2.14, 0.26, 0.37, -0.015, 4],
  [-0.52, 2.38, 0.22, 0.31, 0.025, 5],
  [-0.55, 2.02, 0.3, 0.21, 0, 6, true],
  [-0.18, 2.2, 0.24, 0.34, -0.02, 7],
  [0.12, 2.42, 0.19, 0.27, 0.03, 8],
  [0.14, 2.06, 0.22, 0.31, -0.01, 9],
  [0.45, 2.28, 0.26, 0.36, 0.015, 10],
  [0.78, 2.44, 0.2, 0.28, -0.025, 11],
  [0.77, 2.08, 0.24, 0.34, 0.02, 12],
  [1.1, 2.26, 0.22, 0.31, -0.015, 13],
  [1.4, 2.42, 0.19, 0.26, 0.02, 14],
  [1.42, 2.08, 0.27, 0.19, 0, 15, true],
  [1.72, 2.24, 0.21, 0.3, -0.02, 16],
  [1.95, 1.95, 0.19, 0.27, 0.025, 17],
  [-1.5, 1.62, 0.2, 0.28, -0.02, 18],
  [1.75, 1.62, 0.22, 0.31, 0.015, 19],
];
// Which collage slots show the real photo posters (poster1..6).
const PHOTO_SLOTS = [0, 3, 6, 9, 12, 15];

// Posters on the right wall: [z, y, w, h, tilt, seed]
const SIDE_POSTERS: [number, number, number, number, number, number][] = [
  [0.5, 2.15, 0.24, 0.34, 0.02, 21],
  [0.85, 2.32, 0.2, 0.28, -0.02, 22],
  [0.88, 1.95, 0.21, 0.29, 0.015, 23],
  [1.25, 2.15, 0.23, 0.32, -0.015, 24],
];

// Wood-slat feature panel behind the desk (like the dark reference).
const SLAT_MIN_X = -1.15;
const SLAT_MAX_X = 1.45;
const SLAT_STEP = 0.105;
const SLAT_TONES = ["#4E381F", "#59402A", "#432F1B"];

const FIGURE_COLORS = ["#F4B6C2", "#B6D7F4", "#CDEBD3", "#F4E3B6", "#D9C6F0"];

function Figure({ x, color, h = 0.085 }: { x: number; color: string; h?: number }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[0.022, 0.024, 0.012, 20]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.012 + h / 2, 0]}>
        <capsuleGeometry args={[0.017, h - 0.034, 6, 14]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.012 + h + 0.012, 0]}>
        <sphereGeometry args={[0.018, 18, 14]} />
        <meshStandardMaterial color="#FBF3EC" roughness={0.5} />
      </mesh>
    </group>
  );
}

/** Poster material that stays readable in the dim room. */
function PosterMaterial({ tex }: { tex: THREE.Texture }) {
  return (
    <meshStandardMaterial
      map={tex}
      emissiveMap={tex}
      emissive="#FFFFFF"
      emissiveIntensity={0.32}
      roughness={0.85}
    />
  );
}

export default function GamingRoom() {
  const floorTex = useMemo(() => {
    const t = makeDarkWoodTexture();
    t.repeat.set(3, 3);
    return t;
  }, []);
  const wallTexBack = useMemo(() => {
    const t = makeDarkWallTexture();
    t.repeat.set(3, 1.36);
    return t;
  }, []);
  const wallTexSide = useMemo(() => {
    const t = makeDarkWallTexture();
    t.repeat.set(3.5, 1.36);
    return t;
  }, []);

  const photos = useTexture([
    "/images/posters/poster1.jpg",
    "/images/posters/poster2.jpg",
    "/images/posters/poster3.jpg",
    "/images/posters/poster4.jpg",
    "/images/posters/poster5.jpg",
    "/images/posters/poster6.jpg",
  ]);

  const backPosterTex = useMemo(
    () =>
      BACK_POSTERS.map((p, i) => {
        const photoIdx = PHOTO_SLOTS.indexOf(i);
        if (photoIdx >= 0) return coverTexture(photos[photoIdx], p[2] / p[3]);
        return makePosterTexture(p[5], p[6] ?? false);
      }),
    [photos],
  );
  const sidePosterTex = useMemo(
    () => SIDE_POSTERS.map((p, i) => (i === 1 ? coverTexture(photos[1], p[2] / p[3]) : makePosterTexture(p[5]))),
    [photos],
  );
  const shelfArt = useMemo(() => coverTexture(photos[4], 0.084 / 0.124), [photos]);

  const slats = useMemo(() => {
    const xs: number[] = [];
    for (let x = SLAT_MIN_X; x <= SLAT_MAX_X; x += SLAT_STEP) xs.push(x);
    return xs;
  }, []);

  return (
    <group>
      {/* Back wall (slightly past the corner so no gap shows) */}
      <mesh position={[(ROOM_LEFT + RIGHT_WALL_X + 0.04) / 2, CEILING_Y / 2, -0.005]} receiveShadow>
        <planeGeometry args={[RIGHT_WALL_X + 0.04 - ROOM_LEFT, CEILING_Y]} />
        <meshStandardMaterial map={wallTexBack} roughness={0.95} />
      </mesh>
      {/* Right wall */}
      <mesh
        position={[RIGHT_WALL_X + 0.005, CEILING_Y / 2, ROOM_DEPTH / 2]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_DEPTH, CEILING_Y]} />
        <meshStandardMaterial map={wallTexSide} roughness={0.95} />
      </mesh>
      {/* Ceiling */}
      <mesh
        position={[(ROOM_LEFT + RIGHT_WALL_X) / 2, CEILING_Y, ROOM_DEPTH / 2]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[RIGHT_WALL_X - ROOM_LEFT, ROOM_DEPTH]} />
        <meshStandardMaterial color="#1E1F22" roughness={0.95} />
      </mesh>
      {/* Floor */}
      <mesh
        position={[(ROOM_LEFT + RIGHT_WALL_X) / 2, 0, ROOM_DEPTH / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[RIGHT_WALL_X - ROOM_LEFT, ROOM_DEPTH]} />
        <meshStandardMaterial map={floorTex} roughness={0.6} />
      </mesh>
      {/* Baseboards */}
      <mesh position={[(ROOM_LEFT + RIGHT_WALL_X) / 2, 0.045, 0.008]}>
        <boxGeometry args={[RIGHT_WALL_X - ROOM_LEFT, 0.09, 0.014]} />
        <meshStandardMaterial color="#232427" roughness={0.6} />
      </mesh>
      <mesh position={[RIGHT_WALL_X - 0.008, 0.045, ROOM_DEPTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[ROOM_DEPTH, 0.09, 0.014]} />
        <meshStandardMaterial color="#232427" roughness={0.6} />
      </mesh>

      {/* Wood-slat feature panel with warm LED bars behind the desk */}
      <group>
        <mesh position={[(SLAT_MIN_X + SLAT_MAX_X) / 2, CEILING_Y / 2, 0.012]}>
          <boxGeometry args={[SLAT_MAX_X - SLAT_MIN_X + 0.45, CEILING_Y, 0.02]} />
          <meshStandardMaterial color="#17181B" roughness={0.9} />
        </mesh>
        {slats.map((x, i) => (
          <mesh key={i} position={[x, CEILING_Y / 2, 0.032]} receiveShadow>
            <boxGeometry args={[0.062, CEILING_Y, 0.03]} />
            <meshStandardMaterial color={SLAT_TONES[i % 3]} roughness={0.55} />
          </mesh>
        ))}
        {[SLAT_MIN_X - 0.13, SLAT_MAX_X + 0.13].map((x) => (
          <group key={x}>
            <mesh position={[x, 1.42, 0.028]}>
              <boxGeometry args={[0.022, 2.5, 0.02]} />
              <meshStandardMaterial
                color="#FFC488"
                emissive="#FFA85C"
                emissiveIntensity={1.3}
                toneMapped={false}
              />
            </mesh>
            <pointLight position={[x, 1.9, 0.35]} intensity={1.1} distance={2.8} color="#FF9C4F" />
            <pointLight position={[x, 0.9, 0.35]} intensity={0.8} distance={2.2} color="#FF9C4F" />
          </group>
        ))}
      </group>

      {/* Poster collage — paper flat on the wall (raised where the slats are) */}
      {BACK_POSTERS.map(([x, y, w, h, tilt], i) => {
        const onSlats = x > SLAT_MIN_X - 0.25 && x < SLAT_MAX_X + 0.25;
        return (
          <mesh key={`bp-${i}`} position={[x, y, onSlats ? 0.05 : 0.006]} rotation={[0, 0, tilt]}>
            <planeGeometry args={[w, h]} />
            <PosterMaterial tex={backPosterTex[i]} />
          </mesh>
        );
      })}
      {SIDE_POSTERS.map(([z, y, w, h, tilt], i) => (
        <mesh
          key={`sp-${i}`}
          position={[RIGHT_WALL_X - 0.004, y, z]}
          rotation={[0, -Math.PI / 2, tilt]}
        >
          <planeGeometry args={[w, h]} />
          <PosterMaterial tex={sidePosterTex[i]} />
        </mesh>
      ))}

      {/* Floating shelf with warm LED underneath */}
      <group position={[0.1, 1.78, 0.16]}>
        <RoundedBox args={[1.7, 0.032, 0.2]} radius={0.008} smoothness={3} castShadow>
          <meshStandardMaterial color="#F8F7F4" roughness={0.45} />
        </RoundedBox>
        {/* LED strip under the front edge */}
        <mesh position={[0, -0.02, 0.07]}>
          <boxGeometry args={[1.64, 0.008, 0.012]} />
          <meshStandardMaterial
            color="#FFD9AC"
            emissive="#FFC894"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        <pointLight position={[0, -0.12, 0.12]} intensity={0.9} distance={1.3} color="#FFC894" />

        {/* Shelf items */}
        <group position={[0, 0.018, 0]}>
          {/* Spare pastel keyboard, laying at a slight angle */}
          <group position={[0.32, 0.012, 0.01]} rotation={[0, 0.09, 0]}>
            <RoundedBox args={[0.3, 0.022, 0.1]} radius={0.008} smoothness={2}>
              <meshStandardMaterial color="#E3D3EE" roughness={0.5} />
            </RoundedBox>
            {Array.from({ length: 30 }).map((_, i) => {
              const col = i % 10;
              const row = Math.floor(i / 10);
              return (
                <mesh key={i} position={[-0.126 + col * 0.028, 0.013, -0.028 + row * 0.028]}>
                  <boxGeometry args={[0.023, 0.008, 0.023]} />
                  <meshStandardMaterial
                    color={(col + row) % 3 === 0 ? "#CBB7DE" : "#F6F1FA"}
                    roughness={0.5}
                  />
                </mesh>
              );
            })}
          </group>
          {/* Collectible figures */}
          {FIGURE_COLORS.map((c, i) => (
            <Figure key={c} x={-0.72 + i * 0.13} color={c} h={0.07 + (i % 3) * 0.016} />
          ))}
          {/* Framed photo card leaning on the wall */}
          <group position={[-0.16, 0.075, -0.055]} rotation={[-0.1, 0, 0]}>
            <RoundedBox args={[0.1, 0.14, 0.008]} radius={0.003} smoothness={2}>
              <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
            </RoundedBox>
            <mesh position={[0, 0, 0.005]}>
              <planeGeometry args={[0.084, 0.124]} />
              <PosterMaterial tex={shelfArt} />
            </mesh>
          </group>
          {/* Small deco cloud */}
          <group position={[0.66, 0.02, 0.02]}>
            {[-0.02, 0, 0.02].map((dx, i) => (
              <mesh key={i} position={[dx, i === 1 ? 0.008 : 0, 0]}>
                <sphereGeometry args={[0.016, 16, 12]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.85} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}
