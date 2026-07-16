"use client";

import { RoundedBox } from "@react-three/drei";

type ModelKey = "a" | "b";
type FigurePose = "relaxed" | "wave" | "hero";

type Palette = {
  hair: string;
  hairAccent: string;
  outfit: string;
  outfitAccent: string;
  skin: string;
  eyes: string;
};

const PALETTES: Record<ModelKey, Palette> = {
  a: {
    hair: "#4B2B22",
    hairAccent: "#8A5540",
    outfit: "#D9D0C6",
    outfitAccent: "#7D4C3A",
    skin: "#F0C5AC",
    eyes: "#34242A",
  },
  b: {
    hair: "#6C5A94",
    hairAccent: "#B59BD8",
    outfit: "#382E52",
    outfitAccent: "#D8B6EE",
    skin: "#EEC3AF",
    eyes: "#2B2438",
  },
};

function FigureArm({
  side,
  pose,
  skin,
  sleeve,
}: {
  side: -1 | 1;
  pose: FigurePose;
  skin: string;
  sleeve: string;
}) {
  const raised = pose === "hero" || (pose === "wave" && side === 1);
  const upperRotation: [number, number, number] = raised
    ? [0, 0, side * -0.92]
    : [0.08, 0, side * 0.34];
  const lowerRotation: [number, number, number] = raised
    ? [0, 0, side * -0.22]
    : [0, 0, side * 0.18];

  return (
    <group position={[side * 0.031, 0.139, 0]} rotation={upperRotation}>
      <mesh position={[0, -0.018, 0]}>
        <capsuleGeometry args={[0.0065, 0.03, 4, 8]} />
        <meshStandardMaterial color={sleeve} roughness={0.55} />
      </mesh>
      <group position={[0, -0.045, 0]} rotation={lowerRotation}>
        <mesh position={[0, -0.016, 0]}>
          <capsuleGeometry args={[0.0055, 0.026, 4, 8]} />
          <meshStandardMaterial color={skin} roughness={0.58} />
        </mesh>
        <mesh position={[0, -0.036, 0.001]}>
          <sphereGeometry args={[0.007, 10, 8]} />
          <meshStandardMaterial color={skin} roughness={0.58} />
        </mesh>
      </group>
    </group>
  );
}

export default function VroidFigure({
  model,
  position,
  rotationY = 0,
  scale = 0.105,
  pose = "relaxed",
  baseColor = "#17191D",
}: {
  model: ModelKey;
  position: [number, number, number];
  rotationY?: number;
  scale?: number;
  pose?: FigurePose;
  baseColor?: string;
}) {
  const palette = PALETTES[model];
  const normalizedScale = scale / 0.1;
  const headTilt = pose === "wave" ? -0.08 : pose === "hero" ? 0.04 : 0;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox
        args={[0.12, 0.018, 0.1]}
        radius={0.007}
        smoothness={2}
        position={[0, 0.009, 0]}
        castShadow
      >
        <meshStandardMaterial color={baseColor} roughness={0.3} metalness={0.38} />
      </RoundedBox>
      <mesh position={[0, 0.019, 0]} castShadow>
        <cylinderGeometry args={[0.043, 0.048, 0.012, 16]} />
        <meshStandardMaterial color="#2C3036" roughness={0.28} metalness={0.5} />
      </mesh>

      {/* Lightweight original anime-style collectible. Its face points toward +Z,
          so shelf instances now face the room/camera instead of the wall. */}
      <group scale={normalizedScale} position={[0, 0.025, 0]}>
        {([-1, 1] as const).map((side) => (
          <group key={side} position={[side * 0.013, 0.06, 0]}>
            <mesh position={[0, 0.016, 0]} castShadow>
              <capsuleGeometry args={[0.0065, 0.04, 4, 8]} />
              <meshStandardMaterial color={palette.skin} roughness={0.58} />
            </mesh>
            <RoundedBox
              args={[0.016, 0.027, 0.021]}
              radius={0.004}
              smoothness={2}
              position={[0, -0.018, 0.004]}
              castShadow
            >
              <meshStandardMaterial color="#1B1D22" roughness={0.48} />
            </RoundedBox>
          </group>
        ))}

        <mesh position={[0, 0.105, 0]} castShadow>
          <coneGeometry args={[0.035, 0.052, 14]} />
          <meshStandardMaterial color={palette.outfit} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.142, 0]} castShadow>
          <capsuleGeometry args={[0.021, 0.041, 5, 10]} />
          <meshStandardMaterial color={palette.outfit} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.149, 0.022]}>
          <boxGeometry args={[0.036, 0.008, 0.005]} />
          <meshStandardMaterial color={palette.outfitAccent} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.141, 0.025]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.014, 0.014, 0.005]} />
          <meshStandardMaterial color={palette.outfitAccent} roughness={0.4} />
        </mesh>

        <FigureArm side={-1} pose={pose} skin={palette.skin} sleeve={palette.outfit} />
        <FigureArm side={1} pose={pose} skin={palette.skin} sleeve={palette.outfit} />

        <group position={[0, 0.194, 0]} rotation={[0, 0, headTilt]}>
          <mesh castShadow>
            <sphereGeometry args={[0.03, 16, 12]} />
            <meshStandardMaterial color={palette.skin} roughness={0.56} />
          </mesh>
          <mesh position={[0, 0.006, -0.013]} scale={[1.06, 1.13, 0.88]} castShadow>
            <sphereGeometry args={[0.031, 14, 10]} />
            <meshStandardMaterial color={palette.hair} roughness={0.54} />
          </mesh>
          <mesh position={[-0.013, 0.019, 0.015]} rotation={[0.15, 0, 0.24]} castShadow>
            <coneGeometry args={[0.01, 0.038, 9]} />
            <meshStandardMaterial color={palette.hair} roughness={0.54} />
          </mesh>
          <mesh position={[0.013, 0.019, 0.015]} rotation={[0.15, 0, -0.24]} castShadow>
            <coneGeometry args={[0.01, 0.038, 9]} />
            <meshStandardMaterial color={palette.hair} roughness={0.54} />
          </mesh>
          {model === "b" && (
            <>
              <mesh position={[-0.019, 0.032, -0.005]} rotation={[0, 0, 0.35]} castShadow>
                <coneGeometry args={[0.008, 0.032, 8]} />
                <meshStandardMaterial color={palette.hairAccent} roughness={0.5} />
              </mesh>
              <mesh position={[0.019, 0.032, -0.005]} rotation={[0, 0, -0.35]} castShadow>
                <coneGeometry args={[0.008, 0.032, 8]} />
                <meshStandardMaterial color={palette.hairAccent} roughness={0.5} />
              </mesh>
            </>
          )}
          {([-1, 1] as const).map((side) => (
            <group key={side} position={[side * 0.011, 0.001, 0.027]}>
              <mesh>
                <sphereGeometry args={[0.0042, 8, 6]} />
                <meshStandardMaterial color={palette.eyes} roughness={0.35} />
              </mesh>
              <mesh position={[-side * 0.001, 0.0014, 0.001]}>
                <sphereGeometry args={[0.0013, 6, 4]} />
                <meshBasicMaterial color="#F7F8FA" />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}
