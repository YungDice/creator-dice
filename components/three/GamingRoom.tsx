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

const RIGHT_WALL_X = 2.2;
const ROOM_LEFT = -3.8;
const ROOM_DEPTH = 7;
const CEILING_Y = 2.72;

const BACK_POSTERS: [number, number, number, number, number, number, boolean?][] = [
  [-1.48, 2.13, 0.24, 0.34, 0.02, 1],
  [-1.17, 2.34, 0.2, 0.28, -0.03, 2],
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
  [1.08, 2.3, 0.22, 0.31, -0.015, 13],
];
const PHOTO_SLOTS = [0, 3, 6, 9, 12];

const SIDE_POSTERS: [number, number, number, number, number, number][] = [
  [0.85, 2.3, 0.2, 0.28, -0.02, 22],
  [1.28, 2.12, 0.23, 0.32, -0.015, 24],
  [1.68, 2.32, 0.22, 0.31, 0.015, 25],
];

const SLAT_MIN_X = -1.15;
const SLAT_MAX_X = 1.42;
const SLAT_STEP = 0.105;
const SLAT_TONES = ["#4E381F", "#59402A", "#432F1B"];
const SHELF = "#2A1B15";
const SHELF_EDGE = "#6B412B";
const WARM = "#FFB66F";

function PosterMaterial({ tex }: { tex: THREE.Texture }) {
  return (
    <meshStandardMaterial
      map={tex}
      emissiveMap={tex}
      emissive="#FFFFFF"
      emissiveIntensity={0.3}
      roughness={0.86}
    />
  );
}

/** Original stylized collectible, built from primitives to avoid unlicensed character assets. */
function AnimeFigure({
  position,
  hair,
  outfit,
  accent,
  pose = 1,
  scale = 1,
}: {
  position: [number, number, number];
  hair: string;
  outfit: string;
  accent: string;
  pose?: number;
  scale?: number;
}) {
  const skin = "#F2C9B3";
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.007, 0]}>
        <cylinderGeometry args={[0.034, 0.038, 0.014, 24]} />
        <meshStandardMaterial color="#181A1D" roughness={0.34} metalness={0.3} />
      </mesh>

      {/* Boots and legs. */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.012, 0.057, 0]} rotation={[0, 0, s * 0.04]}>
          <mesh>
            <capsuleGeometry args={[0.006, 0.044, 5, 10]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
          <RoundedBox args={[0.014, 0.025, 0.018]} radius={0.004} smoothness={2} position={[0, -0.035, 0.004]}>
            <meshStandardMaterial color="#24272C" roughness={0.42} />
          </RoundedBox>
        </group>
      ))}

      {/* Skirt, torso and collar. */}
      <mesh position={[0, 0.103, 0]}>
        <coneGeometry args={[0.031, 0.045, 22]} />
        <meshStandardMaterial color={outfit} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.138, 0]}>
        <capsuleGeometry args={[0.021, 0.04, 6, 14]} />
        <meshStandardMaterial color={outfit} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.151, 0.021]}>
        <boxGeometry args={[0.036, 0.009, 0.006]} />
        <meshStandardMaterial color={accent} roughness={0.38} />
      </mesh>
      <mesh position={[0, 0.146, 0.026]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.014, 0.014, 0.005]} />
        <meshStandardMaterial color={accent} roughness={0.38} />
      </mesh>

      {/* Posed arms. */}
      {[-1, 1].map((s) => (
        <group
          key={s}
          position={[s * 0.029, 0.143, 0]}
          rotation={[pose * s * 0.28, 0, s * (pose > 0 ? -0.45 : 0.4)]}
        >
          <mesh position={[0, -0.018, 0]}>
            <capsuleGeometry args={[0.006, 0.035, 5, 10]} />
            <meshStandardMaterial color={skin} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.005, 0]}>
            <sphereGeometry args={[0.008, 12, 9]} />
            <meshStandardMaterial color={outfit} roughness={0.48} />
          </mesh>
        </group>
      ))}

      {/* Head, detailed hair silhouette and face. */}
      <mesh position={[0, 0.196, 0]}>
        <sphereGeometry args={[0.029, 24, 18]} />
        <meshStandardMaterial color={skin} roughness={0.52} />
      </mesh>
      <mesh position={[0, 0.201, -0.012]} scale={[1.08, 1.12, 0.9]}>
        <sphereGeometry args={[0.03, 24, 18]} />
        <meshStandardMaterial color={hair} roughness={0.5} />
      </mesh>
      <mesh position={[-0.012, 0.214, 0.018]} rotation={[0.12, 0, 0.22]}>
        <coneGeometry args={[0.011, 0.038, 12]} />
        <meshStandardMaterial color={hair} roughness={0.5} />
      </mesh>
      <mesh position={[0.012, 0.214, 0.018]} rotation={[0.12, 0, -0.22]}>
        <coneGeometry args={[0.011, 0.038, 12]} />
        <meshStandardMaterial color={hair} roughness={0.5} />
      </mesh>
      <mesh position={[0.031, 0.197, -0.01]} rotation={[0, 0, -0.55]}>
        <capsuleGeometry args={[0.012, 0.055, 6, 12]} />
        <meshStandardMaterial color={hair} roughness={0.5} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.01, 0.198, 0.027]}>
          <sphereGeometry args={[0.0036, 10, 8]} />
          <meshStandardMaterial color="#25212B" roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 0.188, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.005, 0.0012, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#A4515C" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Books({
  position,
  count = 6,
  scale = 1,
}: {
  position: [number, number, number];
  count?: number;
  scale?: number;
}) {
  const colors = ["#433028", "#734533", "#263A46", "#555B68", "#846D4A", "#2D4A43"];
  return (
    <group position={position} scale={scale}>
      {Array.from({ length: count }).map((_, i) => (
        <group key={i} position={[i * 0.033, 0, 0]} rotation={[0, 0, (i % 3 - 1) * 0.025]}>
          <RoundedBox args={[0.028, 0.16 + (i % 2) * 0.018, 0.09]} radius={0.003} smoothness={2} position={[0, 0.08, 0]}>
            <meshStandardMaterial color={colors[i % colors.length]} roughness={0.72} />
          </RoundedBox>
          <mesh position={[0, 0.075, 0.046]}>
            <boxGeometry args={[0.018, 0.105, 0.002]} />
            <meshStandardMaterial color="#D0B98D" roughness={0.65} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Trophy({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.048, 0.055, 0.03, 24]} />
        <meshStandardMaterial color="#17191C" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.012, 0.016, 0.07, 18]} />
        <meshStandardMaterial color="#C9953F" roughness={0.24} metalness={0.82} />
      </mesh>
      <mesh position={[0, 0.105, 0]}>
        <sphereGeometry args={[0.05, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color="#D8A94D" roughness={0.2} metalness={0.85} side={THREE.DoubleSide} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.055, 0.115, 0]} rotation={[0, 0, s * 0.32]}>
          <torusGeometry args={[0.035, 0.007, 9, 20, Math.PI]} />
          <meshStandardMaterial color="#C9953F" roughness={0.22} metalness={0.82} />
        </mesh>
      ))}
    </group>
  );
}

function Gamepad({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[-0.12, 0.1, 0]}>
      <RoundedBox args={[0.18, 0.045, 0.095]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color="#20242A" roughness={0.36} metalness={0.18} />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <RoundedBox key={s} args={[0.07, 0.045, 0.12]} radius={0.025} smoothness={4} position={[s * 0.065, -0.005, 0.035]} rotation={[0, 0, -s * 0.18]}>
          <meshStandardMaterial color="#181B20" roughness={0.4} />
        </RoundedBox>
      ))}
      <mesh position={[-0.045, 0.026, 0]}>
        <boxGeometry args={[0.038, 0.006, 0.011]} />
        <meshStandardMaterial color="#C2C7CC" roughness={0.38} />
      </mesh>
      <mesh position={[-0.045, 0.026, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.038, 0.006, 0.011]} />
        <meshStandardMaterial color="#C2C7CC" roughness={0.38} />
      </mesh>
      {[[-0.01, "#E8384F"], [0.015, "#70D4FF"], [0.04, "#A6DC7E"], [0.065, "#F1C56B"]].map(([x, c]) => (
        <mesh key={String(x)} position={[Number(x), 0.026, -0.005]}>
          <sphereGeometry args={[0.009, 12, 9]} />
          <meshStandardMaterial color={String(c)} emissive={String(c)} emissiveIntensity={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function FlowerVase({ position }: { position: [number, number, number] }) {
  const flowers: [number, number, number, string][] = [
    [-0.045, 0.23, 0, "#EFA3B6"],
    [0.0, 0.27, -0.01, "#F1D28B"],
    [0.05, 0.22, 0.01, "#D7B5ED"],
  ];
  return (
    <group position={position}>
      <mesh position={[0, 0.075, 0]}>
        <cylinderGeometry args={[0.05, 0.065, 0.15, 28]} />
        <meshPhysicalMaterial color="#5A7A78" roughness={0.24} metalness={0.1} clearcoat={0.65} />
      </mesh>
      <mesh position={[0, 0.155, 0]}>
        <cylinderGeometry args={[0.025, 0.043, 0.055, 24]} />
        <meshPhysicalMaterial color="#5A7A78" roughness={0.24} clearcoat={0.65} />
      </mesh>
      {flowers.map(([x, y, z, color], i) => (
        <group key={i}>
          <mesh position={[x * 0.45, y / 2 + 0.08, z]} rotation={[0, 0, -x * 2]}>
            <cylinderGeometry args={[0.003, 0.004, y - 0.15, 8]} />
            <meshStandardMaterial color="#567A50" roughness={0.7} />
          </mesh>
          <group position={[x, y, z]}>
            {Array.from({ length: 6 }).map((_, p) => {
              const a = (p * Math.PI * 2) / 6;
              return (
                <mesh key={p} position={[Math.cos(a) * 0.018, Math.sin(a) * 0.018, 0]} scale={[1.3, 0.75, 0.65]}>
                  <sphereGeometry args={[0.014, 14, 10]} />
                  <meshStandardMaterial color={color} roughness={0.58} />
                </mesh>
              );
            })}
            <mesh>
              <sphereGeometry args={[0.011, 14, 10]} />
              <meshStandardMaterial color="#D89A3C" roughness={0.45} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

function TallShelf() {
  const levels = [0.4, 0.81, 1.22, 1.63, 2.04];
  return (
    <group position={[1.76, 0, 0.2]}>
      {/* Dark asymmetric cabinet inspired by the reference shelf. */}
      <RoundedBox args={[0.75, 2.2, 0.035]} radius={0.008} smoothness={2} position={[0, 1.1, -0.145]} castShadow>
        <meshStandardMaterial color="#18191C" roughness={0.68} />
      </RoundedBox>
      {[-0.37, 0.37].map((x) => (
        <RoundedBox key={x} args={[0.045, 2.2, 0.33]} radius={0.008} smoothness={2} position={[x, 1.1, 0]} castShadow>
          <meshStandardMaterial color={SHELF} roughness={0.56} />
        </RoundedBox>
      ))}
      {levels.map((y) => (
        <RoundedBox key={y} args={[0.75, 0.04, 0.33]} radius={0.006} smoothness={2} position={[0, y, 0]} castShadow>
          <meshStandardMaterial color={SHELF} roughness={0.54} />
        </RoundedBox>
      ))}
      <RoundedBox args={[0.04, 0.82, 0.33]} radius={0.006} smoothness={2} position={[-0.09, 1.63, 0]}>
        <meshStandardMaterial color={SHELF} roughness={0.54} />
      </RoundedBox>
      <RoundedBox args={[0.04, 0.42, 0.33]} radius={0.006} smoothness={2} position={[0.13, 1.02, 0]}>
        <meshStandardMaterial color={SHELF} roughness={0.54} />
      </RoundedBox>

      {/* Bottom cabinet doors. */}
      {[-0.18, 0.18].map((x) => (
        <group key={x} position={[x, 0.21, 0.172]}>
          <RoundedBox args={[0.345, 0.35, 0.025]} radius={0.006} smoothness={2}>
            <meshStandardMaterial color="#202126" roughness={0.52} />
          </RoundedBox>
          <mesh position={[x < 0 ? 0.13 : -0.13, 0, 0.016]}>
            <boxGeometry args={[0.012, 0.07, 0.012]} />
            <meshStandardMaterial color="#7D654E" roughness={0.35} metalness={0.45} />
          </mesh>
        </group>
      ))}

      {/* Warm shelf lighting. */}
      {[0.79, 1.2, 1.61, 2.02].map((y) => (
        <mesh key={y} position={[0, y, 0.155]}>
          <boxGeometry args={[0.67, 0.008, 0.01]} />
          <meshStandardMaterial color="#E8A66B" emissive="#D97938" emissiveIntensity={0.75} toneMapped={false} />
        </mesh>
      ))}
      <pointLight position={[0, 1.35, 0.5]} intensity={0.65} distance={1.4} color={WARM} />

      <Books position={[-0.31, 0.83, 0.02]} count={7} scale={0.72} />
      <Gamepad position={[0.19, 0.86, 0.03]} />
      <Trophy position={[-0.2, 1.25, 0.02]} />
      <FlowerVase position={[0.19, 1.24, 0.015]} />
      <Books position={[-0.3, 1.65, 0.02]} count={5} scale={0.68} />
      <AnimeFigure position={[0.18, 1.65, 0.02]} hair="#26212E" outfit="#6A3547" accent="#E7B66C" pose={-1} scale={0.9} />

      {/* Plant and candle for softer room details. */}
      <group position={[-0.18, 2.06, 0.02]}>
        <mesh position={[0, 0.055, 0]}>
          <cylinderGeometry args={[0.052, 0.065, 0.11, 22]} />
          <meshStandardMaterial color="#72503B" roughness={0.68} />
        </mesh>
        {[-0.04, -0.015, 0.015, 0.04].map((x, i) => (
          <mesh key={x} position={[x, 0.15 + (i % 2) * 0.035, 0]} rotation={[0, 0, x * 7]} scale={[0.8, 1.6, 0.5]}>
            <sphereGeometry args={[0.035, 16, 10]} />
            <meshStandardMaterial color={i % 2 ? "#537B55" : "#3E6847"} roughness={0.72} />
          </mesh>
        ))}
      </group>
      <group position={[0.22, 2.06, 0.02]}>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.09, 24]} />
          <meshPhysicalMaterial color="#E8DDD0" roughness={0.3} transmission={0.08} clearcoat={0.35} />
        </mesh>
        <pointLight position={[0, 0.11, 0.04]} intensity={0.35} distance={0.6} color="#FFB15F" />
        <mesh position={[0, 0.1, 0]} scale={[0.55, 1, 0.55]}>
          <sphereGeometry args={[0.018, 16, 10]} />
          <meshStandardMaterial color="#FFD08A" emissive="#FF8D3A" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
      </group>
    </group>
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
    () => SIDE_POSTERS.map((p, i) => (i === 0 ? coverTexture(photos[1], p[2] / p[3]) : makePosterTexture(p[5]))),
    [photos],
  );

  const slats = useMemo(() => {
    const xs: number[] = [];
    for (let x = SLAT_MIN_X; x <= SLAT_MAX_X; x += SLAT_STEP) xs.push(x);
    return xs;
  }, []);

  return (
    <group>
      <mesh position={[(ROOM_LEFT + RIGHT_WALL_X + 0.04) / 2, CEILING_Y / 2, -0.005]} receiveShadow>
        <planeGeometry args={[RIGHT_WALL_X + 0.04 - ROOM_LEFT, CEILING_Y]} />
        <meshStandardMaterial map={wallTexBack} roughness={0.95} />
      </mesh>
      <mesh position={[RIGHT_WALL_X + 0.005, CEILING_Y / 2, ROOM_DEPTH / 2]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[ROOM_DEPTH, CEILING_Y]} />
        <meshStandardMaterial map={wallTexSide} roughness={0.95} />
      </mesh>
      <mesh position={[(ROOM_LEFT + RIGHT_WALL_X) / 2, CEILING_Y, ROOM_DEPTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[RIGHT_WALL_X - ROOM_LEFT, ROOM_DEPTH]} />
        <meshStandardMaterial color="#17181B" roughness={0.95} />
      </mesh>
      <mesh position={[(ROOM_LEFT + RIGHT_WALL_X) / 2, 0, ROOM_DEPTH / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[RIGHT_WALL_X - ROOM_LEFT, ROOM_DEPTH]} />
        <meshStandardMaterial map={floorTex} roughness={0.6} />
      </mesh>

      <mesh position={[(ROOM_LEFT + RIGHT_WALL_X) / 2, 0.045, 0.008]}>
        <boxGeometry args={[RIGHT_WALL_X - ROOM_LEFT, 0.09, 0.014]} />
        <meshStandardMaterial color="#232427" roughness={0.6} />
      </mesh>
      <mesh position={[RIGHT_WALL_X - 0.008, 0.045, ROOM_DEPTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[ROOM_DEPTH, 0.09, 0.014]} />
        <meshStandardMaterial color="#232427" roughness={0.6} />
      </mesh>

      <group>
        <mesh position={[(SLAT_MIN_X + SLAT_MAX_X) / 2, CEILING_Y / 2, 0.012]}>
          <boxGeometry args={[SLAT_MAX_X - SLAT_MIN_X + 0.45, CEILING_Y, 0.02]} />
          <meshStandardMaterial color="#141518" roughness={0.9} />
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
              <meshStandardMaterial color="#FFC488" emissive="#FFA85C" emissiveIntensity={1.3} toneMapped={false} />
            </mesh>
            <pointLight position={[x, 1.9, 0.35]} intensity={1.0} distance={2.8} color="#FF9C4F" />
            <pointLight position={[x, 0.9, 0.35]} intensity={0.72} distance={2.2} color="#FF9C4F" />
          </group>
        ))}
      </group>

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
        <mesh key={`sp-${i}`} position={[RIGHT_WALL_X - 0.004, y, z]} rotation={[0, -Math.PI / 2, tilt]}>
          <planeGeometry args={[w, h]} />
          <PosterMaterial tex={sidePosterTex[i]} />
        </mesh>
      ))}

      {/* Dark floating display shelf with original anime-style figurines. */}
      <group position={[0.02, 1.78, 0.16]}>
        <RoundedBox args={[1.55, 0.04, 0.22]} radius={0.008} smoothness={3} castShadow>
          <meshStandardMaterial color={SHELF} roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, -0.024, 0.08]}>
          <boxGeometry args={[1.48, 0.008, 0.012]} />
          <meshStandardMaterial color="#D99657" emissive="#C76A32" emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
        <pointLight position={[0, -0.12, 0.14]} intensity={0.72} distance={1.25} color={WARM} />

        <AnimeFigure position={[-0.54, 0.025, 0.02]} hair="#372B48" outfit="#813A52" accent="#E9C171" pose={1} scale={0.95} />
        <AnimeFigure position={[-0.29, 0.025, 0.02]} hair="#C7C9D5" outfit="#35546A" accent="#79D4E8" pose={-1} scale={1.02} />
        <AnimeFigure position={[-0.02, 0.025, 0.02]} hair="#553126" outfit="#304C3D" accent="#E6A75F" pose={1} scale={0.9} />
        <Books position={[0.22, 0.02, 0]} count={6} scale={0.58} />
        <Gamepad position={[0.58, 0.055, 0.015]} />
      </group>

      <TallShelf />
    </group>
  );
}
