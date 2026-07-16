"use client";

import { RoundedBox } from "@react-three/drei";

/**
 * White leather gaming chair: tall backrest with stitched sections, thick
 * seat cushion with side bolsters, headrest pillow, white armrests and a
 * five-star base with casters. Sits in the lower-left foreground.
 */

const LEATHER = "#F3F2EF";
const LEATHER_DIM = "#E4E3DF";
const SEAM = "#DFDEDA";

export default function GamingChair({
  position = [0, 0, 0] as [number, number, number],
  rotationY = 0,
}: {
  position?: [number, number, number];
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Five-star base with casters */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <RoundedBox args={[0.07, 0.045, 0.36]} radius={0.018} smoothness={2} position={[0, 0.05, 0.16]}>
            <meshStandardMaterial color={LEATHER_DIM} roughness={0.4} />
          </RoundedBox>
          <mesh position={[0, 0.035, 0.32]}>
            <sphereGeometry args={[0.036, 16, 12]} />
            <meshStandardMaterial color="#3A3B3E" roughness={0.35} />
          </mesh>
        </group>
      ))}
      {/* Gas lift */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.03, 0.036, 0.3, 20]} />
        <meshStandardMaterial color="#B9BCBE" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Thick seat cushion */}
      <RoundedBox args={[0.52, 0.14, 0.52]} radius={0.05} smoothness={4} position={[0, 0.46, 0.02]} castShadow>
        <meshStandardMaterial color={LEATHER} roughness={0.55} />
      </RoundedBox>
      {/* Seat side bolsters */}
      {[-1, 1].map((s) => (
        <RoundedBox
          key={s}
          args={[0.1, 0.17, 0.48]}
          radius={0.045}
          smoothness={3}
          position={[s * 0.24, 0.49, 0.02]}
          rotation={[0, 0, -s * 0.16]}
        >
          <meshStandardMaterial color={LEATHER_DIM} roughness={0.55} />
        </RoundedBox>
      ))}

      {/* Tall backrest, slightly reclined */}
      <group position={[0, 0.98, -0.21]} rotation={[-0.14, 0, 0]}>
        <RoundedBox args={[0.5, 0.98, 0.15]} radius={0.06} smoothness={4} castShadow>
          <meshStandardMaterial color={LEATHER} roughness={0.55} />
        </RoundedBox>
        {/* Angular side wings */}
        {[-1, 1].map((s) => (
          <RoundedBox
            key={s}
            args={[0.11, 0.72, 0.14]}
            radius={0.05}
            smoothness={3}
            position={[s * 0.245, -0.03, 0.03]}
            rotation={[0, -s * 0.38, 0]}
          >
            <meshStandardMaterial color={LEATHER_DIM} roughness={0.55} />
          </RoundedBox>
        ))}
        {/* Stitched sections */}
        {[-0.11, 0, 0.11].map((x) => (
          <mesh key={x} position={[x, 0.02, 0.077]}>
            <boxGeometry args={[0.008, 0.74, 0.004]} />
            <meshStandardMaterial color={SEAM} roughness={0.7} />
          </mesh>
        ))}
        {[0.22, -0.08, -0.32].map((y) => (
          <mesh key={y} position={[0, y, 0.077]}>
            <boxGeometry args={[0.34, 0.008, 0.004]} />
            <meshStandardMaterial color={SEAM} roughness={0.7} />
          </mesh>
        ))}
        {/* Headrest pillow */}
        <RoundedBox args={[0.3, 0.14, 0.1]} radius={0.045} smoothness={4} position={[0, 0.42, 0.05]}>
          <meshStandardMaterial color="#FBFAF8" roughness={0.6} />
        </RoundedBox>
      </group>

      {/* Armrests */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.31, 0, 0.04]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.035, 0.18, 0.05]} />
            <meshStandardMaterial color="#DDDCD8" roughness={0.45} />
          </mesh>
          <RoundedBox args={[0.09, 0.035, 0.28]} radius={0.015} smoothness={3} position={[0, 0.71, 0]}>
            <meshStandardMaterial color={LEATHER} roughness={0.5} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}
