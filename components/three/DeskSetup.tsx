"use client";

import { Html, RoundedBox, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { coverTexture } from "@/components/three/pastelArt";
import type { PCPhase } from "@/components/Experience";

export const SCREEN_PX = { w: 1024, h: 576 };
const SCREEN_W = 0.62;
const SCREEN_H = (SCREEN_W * SCREEN_PX.h) / SCREEN_PX.w;
const HTML_SCALE = (SCREEN_W / SCREEN_PX.w) * 40;

export const DESK_TOP_Y = 0.74;
const BLACK = "#0D0F12";
const WHITE = "#F4F2ED";
const WALNUT = "#6B3E25";
const WALNUT_DARK = "#382016";
const CYAN = "#4ED9FF";

function CoiledCable({
  points,
  color = "#D7D2CA",
  tube = 0.004,
}: {
  points: [number, number, number][];
  color?: string;
  tube?: number;
}) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 48, tube, 8, false);
  }, [points, tube]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
  );
}

function MonitorStand({ height = 0.2 }: { height?: number }) {
  return (
    <group>
      <RoundedBox args={[0.24, 0.014, 0.17]} radius={0.006} smoothness={2} position={[0, 0.007, 0]}>
        <meshStandardMaterial color={BLACK} roughness={0.32} metalness={0.25} />
      </RoundedBox>
      <mesh position={[0, height / 2 + 0.01, -0.02]}>
        <boxGeometry args={[0.05, height, 0.025]} />
        <meshStandardMaterial color={BLACK} roughness={0.32} metalness={0.25} />
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
          <meshStandardMaterial color={BLACK} roughness={0.3} metalness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={art} />
        </mesh>
        <pointLight position={[0, -h * 0.2, 0.25]} intensity={0.3} distance={0.9} color="#D8D6D2" />
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
          <meshStandardMaterial color={BLACK} roughness={0.28} metalness={0.2} />
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
      <pointLight
        position={[0, cy, 0.45]}
        intensity={phase === "on" ? 0.45 : 0.12}
        distance={1.6}
        color="#D8E8FA"
      />
    </group>
  );
}

function SpinningFan({
  position,
  rotation = [0, 0, 0],
  radius = 0.045,
  speed = 7,
  glow = CYAN,
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
        <meshStandardMaterial color="#D9DEE2" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, -0.002]}>
        <circleGeometry args={[radius * 0.9, 32]} />
        <meshStandardMaterial color="#10151B" roughness={0.3} />
      </mesh>
      <group ref={blades}>
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 7;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * radius * 0.42, Math.sin(a) * radius * 0.42, 0.004]}
              rotation={[0, 0, a + 0.55]}
            >
              <boxGeometry args={[radius * 0.2, radius * 0.72, 0.007]} />
              <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={0.65} toneMapped={false} />
            </mesh>
          );
        })}
      </group>
      <mesh position={[0, 0, 0.009]}>
        <cylinderGeometry args={[radius * 0.2, radius * 0.2, 0.012, 20]} />
        <meshStandardMaterial color="#E8EBED" roughness={0.25} metalness={0.55} />
      </mesh>
    </group>
  );
}

function GPU5080() {
  return (
    <group position={[-0.035, -0.065, 0.035]}>
      <RoundedBox args={[0.072, 0.115, 0.31]} radius={0.012} smoothness={3} castShadow>
        <meshStandardMaterial color="#161A20" roughness={0.26} metalness={0.68} />
      </RoundedBox>
      <RoundedBox args={[0.076, 0.085, 0.285]} radius={0.01} smoothness={3} position={[-0.004, 0, 0]}>
        <meshStandardMaterial color="#343B43" roughness={0.22} metalness={0.78} />
      </RoundedBox>
      <SpinningFan position={[-0.042, 0, -0.082]} rotation={[0, -Math.PI / 2, 0]} radius={0.033} speed={8.5} glow="#8DE8FF" />
      <SpinningFan position={[-0.042, 0, 0.082]} rotation={[0, -Math.PI / 2, 0]} radius={0.033} speed={8.1} glow="#8DE8FF" />
      <mesh position={[-0.043, -0.048, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.25, 0.008]} />
        <meshStandardMaterial color="#B9FF7A" emissive="#76D43B" emissiveIntensity={1.25} toneMapped={false} />
      </mesh>
      <Text
        position={[-0.044, 0.047, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fontSize={0.013}
        letterSpacing={0.04}
        color="#F4F7F8"
        anchorX="center"
        anchorY="middle"
      >
        GEFORCE RTX 5080
      </Text>
      <mesh position={[0.005, 0.062, 0.02]}>
        <boxGeometry args={[0.035, 0.02, 0.055]} />
        <meshStandardMaterial color="#0A0B0D" roughness={0.35} />
      </mesh>
    </group>
  );
}

function PCTower() {
  const caseW = 0.29;
  const caseH = 0.5;
  const caseD = 0.46;
  const fans: [number, number][] = [
    [0.14, 0.1],
    [0.14, -0.04],
    [0.14, -0.18],
  ];

  return (
    <group position={[0.87, DESK_TOP_Y, 0.29]}>
      <group position={[0, caseH / 2 + 0.01, 0]}>
        <RoundedBox args={[caseW + 0.02, 0.024, caseD]} radius={0.008} smoothness={2} position={[0, caseH / 2, 0]}>
          <meshStandardMaterial color={WHITE} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[caseW + 0.02, 0.024, caseD]} radius={0.008} smoothness={2} position={[0, -caseH / 2, 0]}>
          <meshStandardMaterial color="#D9D8D4" roughness={0.42} />
        </RoundedBox>
        <RoundedBox args={[0.024, caseH, caseD]} radius={0.008} smoothness={2} position={[caseW / 2, 0, 0]}>
          <meshStandardMaterial color={WHITE} roughness={0.32} />
        </RoundedBox>
        <RoundedBox args={[caseW, caseH - 0.02, 0.024]} radius={0.008} smoothness={2} position={[0, 0, caseD / 2 - 0.01]}>
          <meshStandardMaterial color={WHITE} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[caseW, caseH - 0.02, 0.024]} radius={0.008} smoothness={2} position={[0, 0, -caseD / 2 + 0.01]}>
          <meshStandardMaterial color="#D8D7D3" roughness={0.45} />
        </RoundedBox>

        <mesh position={[0.125, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[caseD - 0.05, caseH - 0.05]} />
          <meshStandardMaterial color="#232931" roughness={0.55} metalness={0.25} />
        </mesh>

        {/* Motherboard, RAM and cable-management details. */}
        <RoundedBox args={[0.018, 0.29, 0.29]} radius={0.006} smoothness={2} position={[0.105, 0.015, -0.015]}>
          <meshStandardMaterial color="#171D22" roughness={0.5} metalness={0.2} />
        </RoundedBox>
        {[-0.03, 0.0, 0.03, 0.06].map((z, i) => (
          <mesh key={z} position={[0.085, 0.105, z]}>
            <boxGeometry args={[0.024, 0.09, 0.014]} />
            <meshStandardMaterial
              color={i % 2 ? "#B8F1FF" : "#F8F9FA"}
              emissive={i % 2 ? CYAN : "#FFFFFF"}
              emissiveIntensity={0.35}
              toneMapped={false}
            />
          </mesh>
        ))}

        {fans.map(([z, y], i) => (
          <SpinningFan
            key={i}
            position={[0.078, y, z]}
            rotation={[0, -Math.PI / 2, 0]}
            radius={0.044}
            speed={6.8 + i * 0.7}
          />
        ))}

        <group position={[0.025, 0.1, -0.08]}>
          <RoundedBox args={[0.065, 0.065, 0.065]} radius={0.01} smoothness={3}>
            <meshStandardMaterial color="#E8EAEC" roughness={0.3} metalness={0.25} />
          </RoundedBox>
          <mesh position={[-0.034, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <torusGeometry args={[0.022, 0.005, 10, 28]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.15} toneMapped={false} />
          </mesh>
        </group>

        <GPU5080 />

        <CoiledCable
          points={[
            [0.02, 0.13, -0.08],
            [-0.015, 0.18, 0.01],
            [0.015, 0.16, 0.13],
            [0.05, 0.04, 0.15],
          ]}
          color="#C8E9F5"
          tube={0.007}
        />
        <CoiledCable
          points={[
            [0.02, 0.07, -0.08],
            [-0.02, 0.01, -0.03],
            [0.01, -0.03, 0.06],
          ]}
          color="#C8E9F5"
          tube={0.007}
        />

        <mesh position={[-caseW / 2 - 0.001, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[caseD - 0.02, caseH - 0.02]} />
          <meshPhysicalMaterial
            color="#D9EFF5"
            transparent
            opacity={0.13}
            roughness={0.06}
            metalness={0.15}
            transmission={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight position={[-0.04, 0.02, 0.02]} intensity={0.82} distance={0.8} color="#8BE7FF" />
      </group>
    </group>
  );
}

function Keyboard() {
  const rows = 4;
  const cols = 13;
  return (
    <group position={[-0.14, DESK_TOP_Y, 0.5]} rotation={[0, 0.02, 0]}>
      <RoundedBox args={[0.34, 0.028, 0.125]} radius={0.01} smoothness={3} position={[0, 0.014, 0]} castShadow>
        <meshStandardMaterial color="#D9DEE2" roughness={0.42} />
      </RoundedBox>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const accent = (col * 7 + row * 3) % 11 === 0;
        return (
          <RoundedBox
            key={i}
            args={[0.021, 0.01, 0.021]}
            radius={0.0028}
            smoothness={2}
            position={[-0.147 + col * 0.0245, 0.031, -0.041 + row * 0.0245]}
          >
            <meshStandardMaterial color={accent ? "#A9C9D8" : row % 2 === 0 ? "#F4F1EB" : "#D4D8DA"} roughness={0.45} />
          </RoundedBox>
        );
      })}
      <RoundedBox args={[0.12, 0.01, 0.021]} radius={0.0028} smoothness={2} position={[-0.02, 0.031, 0.051]}>
        <meshStandardMaterial color="#F4F1EB" roughness={0.45} />
      </RoundedBox>
    </group>
  );
}

const DECK_COLORS = ["#70D4FF", "#E75B70", "#9BE3B4", "#FFD18A", "#BDA9E8", "#74E1D4"];

function ControlDeck() {
  return (
    <group position={[0.17, DESK_TOP_Y + 0.016, 0.41]} rotation={[0, 0.08, 0]}>
      <RoundedBox args={[0.105, 0.026, 0.075]} radius={0.006} smoothness={2}>
        <meshStandardMaterial color="#171A1F" roughness={0.32} metalness={0.35} />
      </RoundedBox>
      {DECK_COLORS.map((c, i) => (
        <mesh key={c} position={[-0.031 + (i % 3) * 0.031, 0.014, -0.015 + Math.floor(i / 3) * 0.03]}>
          <boxGeometry args={[0.022, 0.003, 0.02]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.8} toneMapped={false} />
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

function Headphones() {
  return (
    <group position={[-0.66, DESK_TOP_Y + 0.045, 0.47]} rotation={[Math.PI / 2, 0, 0.5]}>
      <mesh>
        <torusGeometry args={[0.07, 0.011, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#D9D7D2" roughness={0.45} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.07, -0.012, 0]} rotation={[0, 0, (s * Math.PI) / 2]}>
          <cylinderGeometry args={[0.038, 0.042, 0.03, 24]} />
          <meshStandardMaterial color="#23262B" roughness={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function Microphone() {
  return (
    <group position={[-0.48, DESK_TOP_Y, 0.33]}>
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[0.032, 0.036, 0.012, 24]} />
        <meshStandardMaterial color="#2A2D31" roughness={0.35} metalness={0.3} />
      </mesh>
      <mesh position={[0.01, 0.08, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.006, 0.006, 0.14, 12]} />
        <meshStandardMaterial color="#3B3F44" roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[0.025, 0.16, 0]}>
        <sphereGeometry args={[0.032, 20, 16]} />
        <meshStandardMaterial color="#111317" roughness={0.95} />
      </mesh>
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
      <Keyboard />

      <group position={[0.27, DESK_TOP_Y, 0.53]} rotation={[0, -0.15, 0]}>
        <RoundedBox args={[0.055, 0.03, 0.09]} radius={0.013} smoothness={3} position={[0, 0.015, 0]}>
          <meshStandardMaterial color="#E7E5E0" roughness={0.38} />
        </RoundedBox>
        <mesh position={[0, 0.031, -0.018]}>
          <boxGeometry args={[0.006, 0.004, 0.014]} />
          <meshStandardMaterial color="#8CBACB" roughness={0.4} />
        </mesh>
      </group>

      <ControlDeck />
      <PhoneOnStand />
      <Headphones />
      <Microphone />

      <CoiledCable
        points={[
          [-0.05, DESK_TOP_Y + 0.01, 0.44],
          [-0.02, DESK_TOP_Y + 0.005, 0.2],
          [0.0, 0.6, 0.04],
          [0.02, 0.18, 0.03],
        ]}
      />
      <CoiledCable
        points={[
          [0.87, DESK_TOP_Y + 0.02, 0.1],
          [0.84, 0.5, 0.05],
          [0.8, 0.12, 0.08],
        ]}
        color="#27282B"
      />
      <CoiledCable
        points={[
          [0.27, DESK_TOP_Y + 0.01, 0.48],
          [0.3, DESK_TOP_Y + 0.005, 0.3],
          [0.34, DESK_TOP_Y, 0.16],
        ]}
        tube={0.0025}
      />
    </group>
  );
}
