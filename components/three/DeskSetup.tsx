"use client";

import { Html, Instance, Instances, RoundedBox, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { coverTexture } from "@/components/three/pastelArt";
import type { PCPhase } from "@/components/Experience";

export const SCREEN_PX = { w: 1024, h: 576 };
const SCREEN_W = 0.62;
const SCREEN_H = (SCREEN_W * SCREEN_PX.h) / SCREEN_PX.w;
const HTML_SCALE = (SCREEN_W / SCREEN_PX.w) * 40;

export const DESK_TOP_Y = 0.74;
const BLACK = "#0B0D10";
const WALNUT = "#6B3E25";
const WALNUT_DARK = "#382016";
const AMBER = "#FFB066";
const AMBER_DEEP = "#D9823D";
const CASE_METAL = "#181B20";
const CASE_PANEL = "#252A31";
const CASE_TRIM = "#090B0E";
const SMOKED_GLASS = "#0D1B22";

function Cable({
  points,
  color = "#24262A",
  tube = 0.0035,
}: {
  points: [number, number, number][];
  color?: string;
  tube?: number;
}) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, Math.max(32, points.length * 12), tube, 8, false);
  }, [points, tube]);

  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color={color} roughness={0.68} />
    </mesh>
  );
}

function MonitorStand({ height = 0.2 }: { height?: number }) {
  return (
    <group>
      <RoundedBox args={[0.24, 0.014, 0.17]} radius={0.006} smoothness={2} position={[0, 0.007, 0]} castShadow>
        <meshStandardMaterial color={BLACK} roughness={0.3} metalness={0.32} />
      </RoundedBox>
      <mesh position={[0, height / 2 + 0.01, -0.02]} castShadow>
        <boxGeometry args={[0.05, height, 0.025]} />
        <meshStandardMaterial color={BLACK} roughness={0.3} metalness={0.32} />
      </mesh>
    </group>
  );
}

function ArtMonitor({
  position,
  rotationY,
  w,
  h,
  art,
  standHeight = 0.18,
}: {
  position: [number, number, number];
  rotationY: number;
  w: number;
  h: number;
  art: THREE.Texture;
  standHeight?: number;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <MonitorStand height={standHeight} />
      <group position={[0, standHeight + 0.02 + h / 2, 0.02]}>
        <RoundedBox args={[w + 0.024, h + 0.024, 0.032]} radius={0.006} smoothness={2} castShadow>
          <meshStandardMaterial color={BLACK} roughness={0.28} metalness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={art} />
        </mesh>
        <pointLight position={[0, -h * 0.2, 0.25]} intensity={0.27} distance={0.9} color="#D8D6D2" />
      </group>
    </group>
  );
}

function CenterMonitor({ phase, screenContent }: { phase: PCPhase; screenContent: ReactNode }) {
  const standHeight = 0.2;
  const cy = standHeight + 0.02 + SCREEN_H / 2;

  return (
    <group position={[0, DESK_TOP_Y, 0.14]}>
      <MonitorStand height={standHeight} />
      <group position={[0, cy, 0.03]}>
        <RoundedBox args={[SCREEN_W + 0.026, SCREEN_H + 0.026, 0.036]} radius={0.006} smoothness={2} castShadow>
          <meshStandardMaterial color={BLACK} roughness={0.27} metalness={0.22} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0185]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshStandardMaterial color="#050608" roughness={0.25} />
        </mesh>
        <Html
          transform
          position={[0, 0, 0.02]}
          scale={HTML_SCALE}
          zIndexRange={[10, 0]}
          style={{ width: SCREEN_PX.w, height: SCREEN_PX.h }}
        >
          <div className="h-full w-full overflow-hidden bg-ink" style={{ width: SCREEN_PX.w, height: SCREEN_PX.h }}>
            {screenContent}
          </div>
        </Html>
        <group position={[0, SCREEN_H / 2 + 0.022, 0.004]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.013, 0.013, 0.3, 16]} />
            <meshStandardMaterial color={BLACK} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.008, 0.008]} rotation={[Math.PI / 2.6, 0, 0]}>
            <planeGeometry args={[0.28, 0.008]} />
            <meshStandardMaterial color="#FFF4DD" emissive="#FFD8A5" emissiveIntensity={1.2} toneMapped={false} />
          </mesh>
        </group>
      </group>
      <pointLight position={[0, cy, 0.45]} intensity={phase === "on" ? 0.45 : 0.12} distance={1.6} color="#D8E8FA" />
    </group>
  );
}

function SpinningFan({
  position,
  rotation = [0, 0, 0],
  radius = 0.045,
  speed = 7,
  glow = AMBER,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  radius?: number;
  speed?: number;
  glow?: string;
}) {
  const blades = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (blades.current) blades.current.rotation.z -= delta * speed;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, radius * 0.13, 12, 36]} />
        <meshStandardMaterial color="#4A515B" roughness={0.24} metalness={0.72} />
      </mesh>
      <mesh position={[0, 0, -0.003]}>
        <circleGeometry args={[radius * 0.9, 32]} />
        <meshStandardMaterial color="#090C10" roughness={0.26} />
      </mesh>
      <group ref={blades}>
        <Instances limit={11}>
          <boxGeometry args={[radius * 0.15, radius * 0.72, 0.007]} />
          <meshStandardMaterial color="#27323A" emissive={glow} emissiveIntensity={0.35} toneMapped={false} />
          {Array.from({ length: 11 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 11;
            return (
              <Instance
                key={i}
                position={[Math.cos(a) * radius * 0.42, Math.sin(a) * radius * 0.42, 0.004]}
                rotation={[0, 0, a + 0.6]}
              />
            );
          })}
        </Instances>
      </group>
      <mesh position={[0, 0, 0.009]}>
        <cylinderGeometry args={[radius * 0.2, radius * 0.2, 0.012, 20]} />
        <meshStandardMaterial color="#AAB1B7" roughness={0.22} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <torusGeometry args={[radius * 0.13, radius * 0.028, 8, 20]} />
        <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}

function VentPanel({
  position,
  rotation = [0, 0, 0],
  rows = 6,
  cols = 5,
  spacing = 0.024,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  rows?: number;
  cols?: number;
  spacing?: number;
}) {
  const holes = useMemo(() => {
    const out: [number, number][] = [];
    for (let i = 0; i < rows * cols; i++) {
      out.push([((i % cols) - (cols - 1) / 2) * spacing, (Math.floor(i / cols) - (rows - 1) / 2) * spacing]);
    }
    return out;
  }, [rows, cols, spacing]);

  return (
    <group position={position} rotation={rotation}>
      <Instances limit={holes.length}>
        <circleGeometry args={[0.004, 10]} />
        <meshStandardMaterial color="#06080A" roughness={0.35} />
        {holes.map(([x, y], i) => (
          <Instance key={i} position={[x, y, 0]} />
        ))}
      </Instances>
    </group>
  );
}

function GPU5080() {
  return (
    <group position={[-0.035, -0.055, 0.035]}>
      <RoundedBox args={[0.078, 0.125, 0.32]} radius={0.014} smoothness={4} castShadow>
        <meshStandardMaterial color="#11151A" roughness={0.22} metalness={0.78} />
      </RoundedBox>
      <RoundedBox args={[0.082, 0.095, 0.292]} radius={0.011} smoothness={4} position={[-0.004, 0, 0]}>
        <meshStandardMaterial color="#343B43" roughness={0.2} metalness={0.82} />
      </RoundedBox>
      <SpinningFan position={[-0.045, 0, -0.088]} rotation={[0, -Math.PI / 2, 0]} radius={0.035} speed={9.2} glow="#FFC58F" />
      <SpinningFan position={[-0.045, 0, 0.088]} rotation={[0, -Math.PI / 2, 0]} radius={0.035} speed={8.8} glow="#FFC58F" />
      <mesh position={[-0.046, -0.052, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.26, 0.008]} />
        <meshStandardMaterial color="#FFC58F" emissive={AMBER_DEEP} emissiveIntensity={1.15} toneMapped={false} />
      </mesh>
      <Text
        position={[-0.047, 0.052, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.012}
        letterSpacing={0.04}
        color="#F4F7F8"
        anchorX="center"
        anchorY="middle"
      >
        GEFORCE RTX 5080
      </Text>
      <RoundedBox args={[0.045, 0.022, 0.06]} radius={0.005} smoothness={2} position={[0.005, 0.07, 0.02]}>
        <meshStandardMaterial color="#090B0E" roughness={0.3} />
      </RoundedBox>
      <Cable
        points={[
          [0.005, 0.08, 0.02],
          [0.04, 0.105, 0.04],
          [0.075, 0.14, 0.08],
          [0.1, 0.18, 0.12],
        ]}
        color="#1A1C20"
        tube={0.006}
      />
      {[[-0.035, -0.045], [0, -0.045], [0.035, -0.045]].map(([z, y], i) => (
        <mesh key={i} position={[0.042, y, z]} rotation={[0, -Math.PI / 2, 0]}>
          <torusGeometry args={[0.018, 0.003, 8, 20]} />
          <meshStandardMaterial color="#B17846" roughness={0.25} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function PCTower() {
  const caseW = 0.31;
  const caseH = 0.52;
  const caseD = 0.47;
  const sideFans: [number, number][] = [
    [0.145, 0.11],
    [0.145, -0.035],
    [0.145, -0.18],
  ];

  return (
    <group position={[0.87, DESK_TOP_Y, 0.29]}>
      {[-0.11, 0.11].flatMap((x) => [-0.18, 0.18].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 0.018, z]}>
          <cylinderGeometry args={[0.018, 0.022, 0.036, 16]} />
          <meshStandardMaterial color={CASE_TRIM} roughness={0.45} metalness={0.4} />
        </mesh>
      )))}

      <group position={[0, caseH / 2 + 0.035, 0]}>
        <RoundedBox args={[caseW + 0.026, 0.028, caseD]} radius={0.01} smoothness={3} position={[0, caseH / 2, 0]} castShadow>
          <meshStandardMaterial color={CASE_METAL} roughness={0.3} metalness={0.62} />
        </RoundedBox>
        <RoundedBox args={[caseW + 0.026, 0.028, caseD]} radius={0.01} smoothness={3} position={[0, -caseH / 2, 0]} castShadow>
          <meshStandardMaterial color={CASE_TRIM} roughness={0.38} metalness={0.65} />
        </RoundedBox>
        <RoundedBox args={[0.028, caseH, caseD]} radius={0.009} smoothness={3} position={[caseW / 2, 0, 0]} castShadow>
          <meshStandardMaterial color={CASE_METAL} roughness={0.3} metalness={0.62} />
        </RoundedBox>
        <RoundedBox args={[caseW, caseH - 0.02, 0.03]} radius={0.009} smoothness={3} position={[0, 0, caseD / 2 - 0.012]} castShadow>
          <meshStandardMaterial color={CASE_PANEL} roughness={0.35} metalness={0.58} />
        </RoundedBox>
        <RoundedBox args={[caseW, caseH - 0.02, 0.03]} radius={0.009} smoothness={3} position={[0, 0, -caseD / 2 + 0.012]} castShadow>
          <meshStandardMaterial color={CASE_TRIM} roughness={0.46} metalness={0.45} />
        </RoundedBox>

        {[-caseW / 2, caseW / 2].flatMap((x) => [-caseD / 2, caseD / 2].map((z) => (
          <RoundedBox key={`${x}-${z}`} args={[0.022, caseH, 0.022]} radius={0.006} smoothness={2} position={[x, 0, z]}>
            <meshStandardMaterial color="#353B42" roughness={0.24} metalness={0.75} />
          </RoundedBox>
        )))}

        <VentPanel position={[0, 0.03, caseD / 2 + 0.004]} rows={14} cols={8} spacing={0.022} />
        <VentPanel position={[0, caseH / 2 + 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]} rows={5} cols={10} spacing={0.022} />

        <RoundedBox args={[0.25, 0.115, 0.39]} radius={0.012} smoothness={3} position={[0.005, -0.19, 0]}>
          <meshStandardMaterial color="#101318" roughness={0.36} metalness={0.55} />
        </RoundedBox>
        <Text position={[-0.132, -0.18, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.014} color="#717A83" anchorX="center" anchorY="middle">
          1000W
        </Text>

        <mesh position={[0.128, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[caseD - 0.055, caseH - 0.055]} />
          <meshStandardMaterial color="#222931" roughness={0.54} metalness={0.32} />
        </mesh>

        <RoundedBox args={[0.018, 0.31, 0.305]} radius={0.006} smoothness={2} position={[0.108, 0.02, -0.015]}>
          <meshStandardMaterial color="#10161B" roughness={0.48} metalness={0.28} />
        </RoundedBox>
        {[[-0.06, 0.08], [0.0, 0.08], [0.06, 0.08], [-0.06, 0.0], [0.0, 0.0], [0.06, 0.0]].map(([z, y], i) => (
          <mesh key={i} position={[0.095, y, z]} rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[0.035, 0.02, 0.007]} />
            <meshStandardMaterial color={i % 2 ? "#314A3C" : "#3A4149"} roughness={0.35} metalness={0.4} />
          </mesh>
        ))}
        {[-0.045, -0.015, 0.015, 0.045].map((z, i) => (
          <RoundedBox key={z} args={[0.026, 0.1, 0.016]} radius={0.004} smoothness={2} position={[0.086, 0.12, z]}>
            <meshStandardMaterial color={i % 2 ? "#FFD9A8" : "#FFC4B0"} emissive={i % 2 ? "#FFA85C" : "#E8384F"} emissiveIntensity={0.5} toneMapped={false} />
          </RoundedBox>
        ))}

        {sideFans.map(([z, y], i) => (
          <SpinningFan key={i} position={[0.076, y, z]} rotation={[0, -Math.PI / 2, 0]} radius={0.044} speed={7.1 + i * 0.6} />
        ))}
        <SpinningFan position={[-0.03, caseH / 2 - 0.012, -0.07]} rotation={[-Math.PI / 2, 0, 0]} radius={0.043} speed={7.6} glow="#FF9C6B" />
        <SpinningFan position={[-0.03, caseH / 2 - 0.012, 0.07]} rotation={[-Math.PI / 2, 0, 0]} radius={0.043} speed={7.9} glow="#FF9C6B" />

        <group position={[0.025, 0.105, -0.08]}>
          <RoundedBox args={[0.07, 0.07, 0.07]} radius={0.012} smoothness={3}>
            <meshStandardMaterial color="#1F252C" roughness={0.24} metalness={0.52} />
          </RoundedBox>
          <mesh position={[-0.037, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <torusGeometry args={[0.024, 0.005, 10, 28]} />
            <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={1.1} toneMapped={false} />
          </mesh>
        </group>

        <GPU5080 />

        {/* Chipset heatsink with cooling fins on the lower motherboard. */}
        <group position={[0.096, -0.03, 0.06]}>
          <RoundedBox args={[0.008, 0.055, 0.055]} radius={0.002} smoothness={2}>
            <meshStandardMaterial color="#2A3138" roughness={0.3} metalness={0.7} />
          </RoundedBox>
          <Instances limit={6}>
            <boxGeometry args={[0.014, 0.05, 0.0035]} />
            <meshStandardMaterial color="#3A424B" roughness={0.25} metalness={0.8} />
            {[-0.021, -0.0126, -0.0042, 0.0042, 0.0126, 0.021].map((z) => (
              <Instance key={z} position={[-0.007, 0, z]} />
            ))}
          </Instances>
        </group>

        {/* Ribbed AIO coolant tubes running from the pump block to the top radiator. */}
        <Cable
          points={[
            [0.03, 0.135, -0.1],
            [0.02, 0.2, -0.125],
            [-0.02, 0.235, -0.095],
          ]}
          color="#101317"
          tube={0.008}
        />
        <Cable
          points={[
            [0.045, 0.135, -0.065],
            [0.052, 0.205, -0.095],
            [0.0, 0.238, -0.062],
          ]}
          color="#101317"
          tube={0.008}
        />

        <Cable
          points={[
            [0.02, 0.14, -0.08],
            [-0.02, 0.2, 0.01],
            [0.015, 0.18, 0.13],
            [0.05, 0.06, 0.16],
          ]}
          color="#4A6070"
          tube={0.007}
        />
        <Cable
          points={[
            [0.02, 0.075, -0.08],
            [-0.025, 0.015, -0.03],
            [0.01, -0.025, 0.065],
          ]}
          color="#4A6070"
          tube={0.007}
        />
        <Cable
          points={[
            [0.08, 0.15, -0.12],
            [0.04, 0.08, -0.17],
            [0.02, -0.02, -0.18],
          ]}
          color="#181A1E"
          tube={0.005}
        />

        {/* Tempered-glass side panel: clear pane, brushed frame, corner thumb screws. */}
        <group position={[-caseW / 2 - 0.004, 0, 0]}>
          <mesh rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[caseD - 0.03, caseH - 0.03]} />
            <meshPhysicalMaterial
              color={SMOKED_GLASS}
              transparent
              opacity={0.18}
              roughness={0.04}
              metalness={0.1}
              transmission={0.55}
              clearcoat={1}
              clearcoatRoughness={0.06}
              side={THREE.DoubleSide}
            />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={`h${s}`} position={[0, s * (caseH / 2 - 0.022), 0]}>
              <boxGeometry args={[0.007, 0.014, caseD - 0.03]} />
              <meshStandardMaterial color="#353B42" roughness={0.24} metalness={0.78} />
            </mesh>
          ))}
          {[-1, 1].map((s) => (
            <mesh key={`v${s}`} position={[0, 0, s * (caseD / 2 - 0.022)]}>
              <boxGeometry args={[0.007, caseH - 0.03, 0.014]} />
              <meshStandardMaterial color="#353B42" roughness={0.24} metalness={0.78} />
            </mesh>
          ))}
          {[-1, 1].flatMap((sy) =>
            [-1, 1].map((sz) => (
              <mesh
                key={`s${sy}-${sz}`}
                position={[-0.004, sy * (caseH / 2 - 0.04), sz * (caseD / 2 - 0.04)]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.007, 0.007, 0.006, 6]} />
                <meshStandardMaterial color="#8B939A" roughness={0.22} metalness={0.85} />
              </mesh>
            )),
          )}
        </group>

        {/* Warm accent strip down the front edge. */}
        <mesh position={[-caseW / 2 + 0.02, 0, caseD / 2 + 0.004]}>
          <boxGeometry args={[0.008, caseH - 0.09, 0.005]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER_DEEP} emissiveIntensity={1.0} toneMapped={false} />
        </mesh>

        <mesh position={[0.04, caseH / 2 + 0.018, caseD / 2 - 0.04]}>
          <cylinderGeometry args={[0.012, 0.012, 0.008, 20]} />
          <meshStandardMaterial color="#FFE3C0" emissive="#FFC488" emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
        <mesh position={[-0.02, caseH / 2 + 0.018, caseD / 2 - 0.04]}>
          <cylinderGeometry args={[0.006, 0.006, 0.008, 16]} />
          <meshStandardMaterial color="#8B939A" roughness={0.25} metalness={0.75} />
        </mesh>

        <pointLight position={[-0.04, 0.02, 0.02]} intensity={0.75} distance={0.8} color="#FFA85C" />
        <pointLight position={[0.01, 0.15, -0.05]} intensity={0.24} distance={0.55} color="#E8384F" />
      </group>
    </group>
  );
}

function Keyboard() {
  const rows = 4;
  const cols = 13;
  const keycapGeom = useMemo(() => new RoundedBoxGeometry(0.021, 0.01, 0.021, 2, 0.0028), []);
  const { plainKeys, accentKeys } = useMemo(() => {
    const plain: { position: [number, number, number]; color: string }[] = [];
    const accent: [number, number, number][] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Slight per-row ramp gives the keys a real typing-angle profile.
        const position: [number, number, number] = [
          -0.147 + col * 0.0245,
          0.0305 + (rows - 1 - row) * 0.0011,
          -0.041 + row * 0.0245,
        ];
        if ((col * 7 + row * 3) % 11 === 0) accent.push(position);
        else plain.push({ position, color: row % 2 === 0 ? "#33302B" : "#282B30" });
      }
    }
    return { plainKeys: plain, accentKeys: accent };
  }, []);

  return (
    <group position={[-0.14, DESK_TOP_Y + 0.006, 0.5]} rotation={[0, 0.02, 0]}>
      <RoundedBox args={[0.34, 0.028, 0.125]} radius={0.01} smoothness={3} position={[0, 0.014, 0]} castShadow>
        <meshStandardMaterial color="#1C1E22" roughness={0.38} metalness={0.25} />
      </RoundedBox>
      <Instances geometry={keycapGeom} limit={plainKeys.length}>
        <meshStandardMaterial roughness={0.5} />
        {plainKeys.map((key, i) => (
          <Instance key={i} position={key.position} color={key.color} />
        ))}
      </Instances>
      <Instances geometry={keycapGeom} limit={Math.max(accentKeys.length, 1)}>
        <meshStandardMaterial color="#E6A263" emissive="#D9823D" emissiveIntensity={0.3} roughness={0.42} toneMapped={false} />
        {accentKeys.map((position, i) => (
          <Instance key={i} position={position} />
        ))}
      </Instances>
      <RoundedBox args={[0.12, 0.01, 0.021]} radius={0.0028} smoothness={2} position={[-0.02, 0.0305, 0.051]}>
        <meshStandardMaterial color="#33302B" roughness={0.5} />
      </RoundedBox>
      {/* Volume knob on the top-right corner. */}
      <mesh position={[0.152, 0.034, -0.048]}>
        <cylinderGeometry args={[0.008, 0.008, 0.014, 14]} />
        <meshStandardMaterial color="#8B939A" roughness={0.24} metalness={0.8} />
      </mesh>
      {/* Faint warm underglow, matching the desk's LED strip. */}
      <mesh position={[0, 0.004, 0.064]}>
        <boxGeometry args={[0.32, 0.004, 0.003]} />
        <meshStandardMaterial color="#E6A263" emissive="#D9823D" emissiveIntensity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}

const DECK_COLORS = ["#70D4FF", "#E75B70", "#9BE3B4", "#FFD18A", "#BDA9E8", "#74E1D4"];

function ControlDeck() {
  return (
    <group position={[0.17, DESK_TOP_Y + 0.022, 0.41]} rotation={[0, 0.08, 0]}>
      <RoundedBox args={[0.105, 0.026, 0.075]} radius={0.006} smoothness={2} castShadow>
        <meshStandardMaterial color="#171A1F" roughness={0.32} metalness={0.35} />
      </RoundedBox>
      {DECK_COLORS.map((color, i) => (
        <mesh key={color} position={[-0.031 + (i % 3) * 0.031, 0.014, -0.015 + Math.floor(i / 3) * 0.03]}>
          <boxGeometry args={[0.022, 0.003, 0.02]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function PhoneOnStand() {
  return (
    <group position={[0.63, DESK_TOP_Y, 0.4]} rotation={[0, -0.45, 0]}>
      <RoundedBox args={[0.07, 0.008, 0.055]} radius={0.004} smoothness={2} position={[0, 0.004, 0]}>
        <meshStandardMaterial color="#D9D6D0" roughness={0.4} />
      </RoundedBox>
      <group position={[0, 0.075, -0.012]} rotation={[-0.3, 0, 0]}>
        <RoundedBox args={[0.072, 0.15, 0.007]} radius={0.006} smoothness={2}>
          <meshStandardMaterial color="#17191D" roughness={0.28} />
        </RoundedBox>
        <mesh position={[0, 0, 0.004]}>
          <planeGeometry args={[0.064, 0.14]} />
          <meshStandardMaterial color="#D6E8F0" emissive="#B9D9E8" emissiveIntensity={0.45} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function CableGrommet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.021, 0.005, 10, 24]} />
        <meshStandardMaterial color="#16181B" roughness={0.48} />
      </mesh>
      <mesh position={[0, -0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.018, 24]} />
        <meshStandardMaterial color="#08090B" roughness={0.55} />
      </mesh>
    </group>
  );
}

function DeskMat() {
  return (
    <group position={[0.02, DESK_TOP_Y, 0.47]}>
      <RoundedBox args={[0.78, 0.006, 0.32]} radius={0.003} smoothness={2} position={[0, 0.003, 0]} receiveShadow>
        <meshStandardMaterial color="#141619" roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 0.0065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.75, 0.29]} />
        <meshStandardMaterial color="#1A1D21" roughness={0.85} />
      </mesh>
      {/* Small amber logo mark in the corner. */}
      <mesh position={[0.345, 0.0068, 0.115]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <planeGeometry args={[0.016, 0.016]} />
        <meshStandardMaterial color="#E6A263" emissive="#D9823D" emissiveIntensity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CoffeeMug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.004, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.008, 18]} />
        <meshStandardMaterial color="#4A2C20" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.052, 0]} castShadow>
        <cylinderGeometry args={[0.036, 0.031, 0.088, 20, 1, true]} />
        <meshStandardMaterial color="#C8B49A" roughness={0.42} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.031, 0.031, 0.004, 20]} />
        <meshStandardMaterial color="#C8B49A" roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.086, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.033, 20]} />
        <meshStandardMaterial color="#2A1A10" roughness={0.28} />
      </mesh>
      <mesh position={[0.043, 0.055, 0]}>
        <torusGeometry args={[0.019, 0.005, 8, 18]} />
        <meshStandardMaterial color="#C8B49A" roughness={0.42} />
      </mesh>
    </group>
  );
}

function Speaker({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[0.085, 0.13, 0.09]} radius={0.008} smoothness={2} position={[0, 0.065, 0]} castShadow>
        <meshStandardMaterial color="#15171B" roughness={0.55} />
      </RoundedBox>
      <mesh position={[0, 0.042, 0.046]}>
        <circleGeometry args={[0.026, 20]} />
        <meshStandardMaterial color="#0A0C0E" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.042, 0.047]}>
        <torusGeometry args={[0.026, 0.0028, 8, 20]} />
        <meshStandardMaterial color="#33383E" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.042, 0.0475]}>
        <circleGeometry args={[0.009, 12]} />
        <meshStandardMaterial color="#4A2C20" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0.046]}>
        <circleGeometry args={[0.012, 14]} />
        <meshStandardMaterial color="#101215" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.1, 0.047]}>
        <torusGeometry args={[0.012, 0.002, 6, 16]} />
        <meshStandardMaterial color="#33383E" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.028, 0.012, 0.046]}>
        <circleGeometry args={[0.0028, 8]} />
        <meshStandardMaterial color="#FFD9A8" emissive="#FFA85C" emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

const STICKY_NOTES: [number, number, number, string][] = [
  [-0.56, 0.36, 0.28, "#F1D28B"],
  [-0.51, 0.42, -0.4, "#EFA3B6"],
  [-0.545, 0.47, 0.12, "#A6DC7E"],
];

function DeskClutter() {
  return (
    <group>
      {STICKY_NOTES.map(([x, z, rot, color], i) => (
        <mesh key={i} position={[x, DESK_TOP_Y + 0.0015 + i * 0.0004, z]} rotation={[-Math.PI / 2, 0, rot]}>
          <planeGeometry args={[0.045, 0.045]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
      ))}
      {/* Pen resting beside the notes. */}
      <group position={[-0.5, DESK_TOP_Y + 0.004, 0.49]} rotation={[0, 0.9, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.0032, 0.0032, 0.11, 10]} />
          <meshStandardMaterial color="#1A1C20" roughness={0.35} />
        </mesh>
        <mesh position={[0.062, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.0032, 0.014, 10]} />
          <meshStandardMaterial color="#B17846" roughness={0.28} metalness={0.7} />
        </mesh>
        <mesh position={[-0.03, 0.0032, 0]}>
          <boxGeometry args={[0.03, 0.0016, 0.004]} />
          <meshStandardMaterial color="#8B939A" roughness={0.3} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function DeskSetup({ phase, screenContent }: { phase: PCPhase; screenContent: ReactNode }) {
  const wallpapers = useTexture([
    "/images/wallpaper/wallpaper1.jpg",
    "/images/wallpaper/wallpaper2.jpg",
  ]);
  const leftArt = useMemo(() => coverTexture(wallpapers[0], 0.35 / 0.62), [wallpapers]);
  const rightArt = useMemo(() => coverTexture(wallpapers[1], 0.28 / 0.5), [wallpapers]);

  return (
    <group>
      <RoundedBox
        args={[1.9, 0.055, 0.72]}
        radius={0.018}
        smoothness={3}
        position={[0.15, DESK_TOP_Y - 0.027, 0.36]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={WALNUT} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0.15, DESK_TOP_Y - 0.057, 0.71]}>
        <boxGeometry args={[1.82, 0.018, 0.018]} />
        <meshStandardMaterial color={WALNUT_DARK} roughness={0.55} />
      </mesh>
      {[-0.72, 1.02].map((x) => (
        <RoundedBox
          key={x}
          args={[0.055, DESK_TOP_Y - 0.05, 0.6]}
          radius={0.01}
          smoothness={2}
          position={[x, (DESK_TOP_Y - 0.05) / 2, 0.36]}
          castShadow
        >
          <meshStandardMaterial color={WALNUT_DARK} roughness={0.58} />
        </RoundedBox>
      ))}

      <mesh position={[0.1, 0.78, 0.015]}>
        <boxGeometry args={[1.75, 0.014, 0.012]} />
        <meshStandardMaterial color="#E6A263" emissive="#D9823D" emissiveIntensity={0.85} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 1.0, 0.12]} intensity={0.35} distance={1.6} color="#FFB66F" />

      <CenterMonitor phase={phase} screenContent={screenContent} />
      <ArtMonitor position={[-0.63, DESK_TOP_Y, 0.18]} rotationY={0.22} w={0.35} h={0.62} art={leftArt} standHeight={0.16} />
      <ArtMonitor position={[0.53, DESK_TOP_Y, 0.12]} rotationY={-0.08} w={0.28} h={0.5} art={rightArt} standHeight={0.14} />

      <PCTower />
      <DeskMat />
      <Keyboard />
      <CoffeeMug position={[-0.44, DESK_TOP_Y, 0.55]} />
      <Speaker position={[-0.44, DESK_TOP_Y, 0.07]} rotationY={0.28} />
      <Speaker position={[0.355, DESK_TOP_Y, 0.04]} rotationY={-0.2} />
      <DeskClutter />

      <group position={[0.27, DESK_TOP_Y + 0.006, 0.53]} rotation={[0, -0.15, 0]}>
        <RoundedBox args={[0.055, 0.03, 0.09]} radius={0.013} smoothness={3} position={[0, 0.015, 0]} castShadow>
          <meshStandardMaterial color="#24262B" roughness={0.34} metalness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0.031, -0.018]}>
          <boxGeometry args={[0.006, 0.004, 0.014]} />
          <meshStandardMaterial color="#E6A263" emissive="#D9823D" emissiveIntensity={0.45} roughness={0.4} toneMapped={false} />
        </mesh>
      </group>

      <ControlDeck />
      <PhoneOnStand />

      <CableGrommet position={[0.04, DESK_TOP_Y + 0.004, 0.075]} />
      <CableGrommet position={[0.47, DESK_TOP_Y + 0.004, 0.075]} />

      {/* Every visible cable terminates at a device, then dives straight down through a desk grommet. */}
      <Cable
        points={[
          [-0.05, DESK_TOP_Y + 0.012, 0.44],
          [-0.04, DESK_TOP_Y + 0.008, 0.31],
          [0.0, DESK_TOP_Y + 0.006, 0.17],
          [0.04, DESK_TOP_Y + 0.004, 0.075],
          [0.04, DESK_TOP_Y - 0.06, 0.072],
          [0.04, 0.24, 0.02],
        ]}
        color="#26221E"
        tube={0.0038}
      />
      <Cable
        points={[
          [0.17, DESK_TOP_Y + 0.018, 0.375],
          [0.16, DESK_TOP_Y + 0.008, 0.26],
          [0.1, DESK_TOP_Y + 0.005, 0.14],
          [0.04, DESK_TOP_Y + 0.004, 0.075],
          [0.04, DESK_TOP_Y - 0.06, 0.072],
        ]}
        color="#17191D"
        tube={0.003}
      />
      <Cable
        points={[
          [0.27, DESK_TOP_Y + 0.012, 0.485],
          [0.32, DESK_TOP_Y + 0.008, 0.34],
          [0.4, DESK_TOP_Y + 0.006, 0.18],
          [0.47, DESK_TOP_Y + 0.004, 0.075],
          [0.47, DESK_TOP_Y - 0.06, 0.072],
          [0.47, 0.22, 0.02],
        ]}
        color="#26221E"
        tube={0.0028}
      />
      <Cable
        points={[
          [0.87, DESK_TOP_Y + 0.03, 0.065],
          [0.9, DESK_TOP_Y - 0.04, 0.025],
          [0.93, 0.46, -0.005],
          [0.95, 0.12, -0.008],
        ]}
        color="#15171A"
        tube={0.0045}
      />
    </group>
  );
}
