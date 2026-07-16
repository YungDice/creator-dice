"use client";

import { RoundedBox } from "@react-three/drei";

const LEATHER = "#17191D";
const LEATHER_DIM = "#22262C";
const SIDE = "#4A2C20";
const SEAM = "#A9673F";
const METAL = "#596068";

export default function GamingChair({
  position = [0, 0, 0] as [number, number, number],
  rotationY = 0,
}: {
  position?: [number, number, number];
  rotationY?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Five-star powder-coated base and real caster-shaped wheels. */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <RoundedBox args={[0.065, 0.04, 0.37]} radius={0.016} smoothness={2} position={[0, 0.055, 0.16]}>
            <meshStandardMaterial color="#24282D" roughness={0.32} metalness={0.5} />
          </RoundedBox>
          <group position={[0, 0.035, 0.34]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.037, 0.037, 0.026, 18]} />
              <meshStandardMaterial color="#0E1013" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.016, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.005, 16]} />
              <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.75} />
            </mesh>
          </group>
        </group>
      ))}

      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.03, 0.038, 0.3, 20]} />
        <meshStandardMaterial color={METAL} roughness={0.28} metalness={0.78} />
      </mesh>
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[0.085, 0.1, 0.035, 24]} />
        <meshStandardMaterial color="#15181B" roughness={0.4} />
      </mesh>

      {/* Thick dark seat with warm-brown side bolsters. */}
      <RoundedBox args={[0.52, 0.14, 0.52]} radius={0.05} smoothness={4} position={[0, 0.46, 0.02]} castShadow>
        <meshStandardMaterial color={LEATHER} roughness={0.52} />
      </RoundedBox>
      <RoundedBox args={[0.34, 0.018, 0.36]} radius={0.025} smoothness={3} position={[0, 0.536, 0.025]}>
        <meshStandardMaterial color={LEATHER_DIM} roughness={0.6} />
      </RoundedBox>
      {[-1, 1].map((s) => (
        <RoundedBox
          key={s}
          args={[0.105, 0.17, 0.48]}
          radius={0.045}
          smoothness={3}
          position={[s * 0.24, 0.49, 0.02]}
          rotation={[0, 0, -s * 0.16]}
        >
          <meshStandardMaterial color={SIDE} roughness={0.5} />
        </RoundedBox>
      ))}

      {/* Reclined backrest with contrasting piping and segmented upholstery. */}
      <group position={[0, 0.98, -0.21]} rotation={[-0.14, 0, 0]}>
        <RoundedBox args={[0.5, 0.98, 0.15]} radius={0.06} smoothness={4} castShadow>
          <meshStandardMaterial color={LEATHER} roughness={0.5} />
        </RoundedBox>
        {[-1, 1].map((s) => (
          <RoundedBox
            key={s}
            args={[0.115, 0.75, 0.145]}
            radius={0.05}
            smoothness={3}
            position={[s * 0.245, -0.03, 0.03]}
            rotation={[0, -s * 0.38, 0]}
          >
            <meshStandardMaterial color={SIDE} roughness={0.5} />
          </RoundedBox>
        ))}

        {[-0.13, 0.13].map((x) => (
          <mesh key={x} position={[x, 0.015, 0.077]}>
            <boxGeometry args={[0.008, 0.77, 0.004]} />
            <meshStandardMaterial color={SEAM} roughness={0.68} />
          </mesh>
        ))}
        {[0.23, -0.06, -0.34].map((y) => (
          <mesh key={y} position={[0, y, 0.078]}>
            <boxGeometry args={[0.3, 0.007, 0.004]} />
            <meshStandardMaterial color="#3A3E44" roughness={0.7} />
          </mesh>
        ))}

        {/* Subtle tufting buttons. */}
        {[-0.1, 0, 0.1].flatMap((x) =>
          [-0.18, 0.02, 0.2].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.081]}>
              <sphereGeometry args={[0.009, 12, 8]} />
              <meshStandardMaterial color="#0B0D0F" roughness={0.7} />
            </mesh>
          )),
        )}

        <RoundedBox args={[0.31, 0.14, 0.105]} radius={0.045} smoothness={4} position={[0, 0.42, 0.05]}>
          <meshStandardMaterial color="#20242A" roughness={0.58} />
        </RoundedBox>

        {/* Lumbar pillow. */}
        <RoundedBox args={[0.3, 0.18, 0.11]} radius={0.05} smoothness={4} position={[0, -0.22, 0.075]}>
          <meshStandardMaterial color={LEATHER_DIM} roughness={0.62} />
        </RoundedBox>
      </group>

      {/* Adjustable armrests with metal supports. */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.31, 0, 0.04]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.036, 0.2, 0.05]} />
            <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.68} />
          </mesh>
          <RoundedBox args={[0.095, 0.04, 0.29]} radius={0.016} smoothness={3} position={[0, 0.72, 0]}>
            <meshStandardMaterial color="#181B1F" roughness={0.48} />
          </RoundedBox>
          <mesh position={[0, 0.739, 0]}>
            <boxGeometry args={[0.06, 0.004, 0.22]} />
            <meshStandardMaterial color="#30343A" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
