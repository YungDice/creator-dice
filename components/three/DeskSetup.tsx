"use client";

import { Html, RoundedBox, useTexture } from "@react-three/drei";
import { useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { coverTexture } from "@/components/three/pastelArt";
import type { PCPhase } from "@/components/Experience";

/**
 * The workstation: white desk against the wall, triple-monitor setup (the
 * live site runs on the center screen, pastel fantasy art on the verticals),
 * a premium white PC with a glass side panel and cyan-lit internals, and the
 * desk accessories from the reference — pastel keyboard, cloud wrist rest,
 * mouse, control deck, phone, headphones, microphone and cables.
 */

// Center screen: 0.62m wide 16:9 panel. drei <Html transform> maps 40 CSS px
// to 1 world unit at scale 1.
export const SCREEN_PX = { w: 1024, h: 576 };
const SCREEN_W = 0.62;
const SCREEN_H = (SCREEN_W * SCREEN_PX.h) / SCREEN_PX.w;
const HTML_SCALE = (SCREEN_W / SCREEN_PX.w) * 40;

export const DESK_TOP_Y = 0.74;
const BLACK = "#101114";
const WHITE = "#F8F7F4";

function CoiledCable({
  points,
  color = "#E8E6E2",
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
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  );
}

function MonitorStand({ height = 0.2 }: { height?: number }) {
  return (
    <group>
      <RoundedBox args={[0.24, 0.014, 0.17]} radius={0.006} smoothness={2} position={[0, 0.007, 0]}>
        <meshStandardMaterial color={BLACK} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, height / 2 + 0.01, -0.02]}>
        <boxGeometry args={[0.05, height, 0.025]} />
        <meshStandardMaterial color={BLACK} roughness={0.4} />
      </mesh>
    </group>
  );
}

/** Vertical side monitor showing artwork (unlit material = backlit screen). */
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
          <meshStandardMaterial color={BLACK} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={art} />
        </mesh>
        {/* Screen glow onto the desk */}
        <pointLight position={[0, -h * 0.2, 0.25]} intensity={0.35} distance={0.9} color="#C9D4E4" />
      </group>
    </group>
  );
}

function CenterMonitor({
  phase,
  screenContent,
}: {
  phase: PCPhase;
  screenContent: ReactNode;
}) {
  const standHeight = 0.2;
  const cy = standHeight + 0.02 + SCREEN_H / 2;
  return (
    <group position={[0, DESK_TOP_Y, 0.14]}>
      <MonitorStand height={standHeight} />
      <group position={[0, cy, 0.03]}>
        <RoundedBox args={[SCREEN_W + 0.026, SCREEN_H + 0.026, 0.036]} radius={0.006} smoothness={2} castShadow>
          <meshStandardMaterial color={BLACK} roughness={0.35} />
        </RoundedBox>
        {/* Dark glass behind the DOM screen */}
        <mesh position={[0, 0, 0.0185]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          <meshStandardMaterial color="#08090B" roughness={0.3} />
        </mesh>
        {/* The live site */}
        <Html
          transform
          position={[0, 0, 0.02]}
          scale={HTML_SCALE}
          zIndexRange={[10, 0]}
          style={{ width: SCREEN_PX.w, height: SCREEN_PX.h }}
        >
          <div
            className="h-full w-full overflow-hidden bg-ink"
            style={{ width: SCREEN_PX.w, height: SCREEN_PX.h }}
          >
            {screenContent}
          </div>
        </Html>
        {/* Monitor light bar on top */}
        <group position={[0, SCREEN_H / 2 + 0.022, 0.004]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.013, 0.013, 0.3, 16]} />
            <meshStandardMaterial color={BLACK} roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.008, 0.008]} rotation={[Math.PI / 2.6, 0, 0]}>
            <planeGeometry args={[0.28, 0.008]} />
            <meshStandardMaterial
              color="#FFF7E8"
              emissive="#FFF3DC"
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
      {/* Gentle screen light onto the desk */}
      <pointLight
        position={[0, cy, 0.45]}
        intensity={phase === "on" ? 0.45 : 0.12}
        distance={1.6}
        color="#D8E8FA"
      />
    </group>
  );
}

function PCTower() {
  const caseW = 0.24;
  const caseH = 0.46;
  const caseD = 0.44;
  const fanPositions: [number, number][] = [
    [0.13, 0.08],
    [0.13, -0.06],
    [-0.02, 0.1],
  ];
  return (
    <group position={[0.85, DESK_TOP_Y, 0.3]}>
      {/* White case shell built from panels, open on the glass (-x) side */}
      <group position={[0, caseH / 2 + 0.01, 0]}>
        {/* Top / bottom */}
        <RoundedBox args={[caseW + 0.02, 0.024, caseD]} radius={0.008} smoothness={2} position={[0.01, caseH / 2, 0]}>
          <meshStandardMaterial color={WHITE} roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[caseW + 0.02, 0.024, caseD]} radius={0.008} smoothness={2} position={[0.01, -caseH / 2, 0]}>
          <meshStandardMaterial color={WHITE} roughness={0.35} />
        </RoundedBox>
        {/* Right side, front and rear panels */}
        <RoundedBox args={[0.022, caseH, caseD]} radius={0.008} smoothness={2} position={[0.12, 0, 0]}>
          <meshStandardMaterial color={WHITE} roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[caseW, caseH - 0.02, 0.024]} radius={0.008} smoothness={2} position={[0.01, 0, caseD / 2 - 0.01]}>
          <meshStandardMaterial color={WHITE} roughness={0.35} />
        </RoundedBox>
        <RoundedBox args={[caseW, caseH - 0.02, 0.024]} radius={0.008} smoothness={2} position={[0.01, 0, -caseD / 2 + 0.01]}>
          <meshStandardMaterial color="#EDEDEA" roughness={0.45} />
        </RoundedBox>
        {/* Interior back wall */}
        <mesh position={[0.105, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[caseD - 0.05, caseH - 0.05]} />
          <meshStandardMaterial color="#F4F6F8" roughness={0.5} />
        </mesh>
        {/* Glass side panel */}
        <mesh position={[-0.118, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[caseD - 0.02, caseH - 0.02]} />
          <meshPhysicalMaterial
            color="#DFF0FA"
            transparent
            opacity={0.16}
            roughness={0.05}
            metalness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Illuminated fans on the interior wall */}
        {fanPositions.map(([z, y], i) => (
          <group key={i} position={[0.075, y, z]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh>
              <torusGeometry args={[0.045, 0.007, 12, 32]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, -0.002]}>
              <circleGeometry args={[0.042, 28]} />
              <meshStandardMaterial
                color="#37B8EE"
                emissive="#2FB4EC"
                emissiveIntensity={0.9}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
        {/* Graphics card */}
        <RoundedBox args={[0.13, 0.045, 0.26]} radius={0.008} smoothness={2} position={[0.02, -0.05, 0.04]}>
          <meshStandardMaterial color="#FDFDFB" roughness={0.3} />
        </RoundedBox>
        {/* Pump block with glowing ring */}
        <group position={[0.03, 0.09, -0.06]}>
          <RoundedBox args={[0.06, 0.06, 0.06]} radius={0.008} smoothness={2}>
            <meshStandardMaterial color={WHITE} roughness={0.3} />
          </RoundedBox>
          <mesh position={[-0.032, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <torusGeometry args={[0.02, 0.005, 10, 24]} />
            <meshStandardMaterial
              color="#37B8EE"
              emissive="#2FB4EC"
              emissiveIntensity={1.1}
              toneMapped={false}
            />
          </mesh>
        </group>
        {/* Pale-blue cooling tubes */}
        <CoiledCable
          points={[
            [0.03, 0.12, -0.06],
            [0.0, 0.16, 0.0],
            [0.02, 0.14, 0.1],
            [0.05, 0.02, 0.14],
          ]}
          color="#BCD9EC"
          tube={0.008}
        />
        <CoiledCable
          points={[
            [0.03, 0.06, -0.06],
            [-0.01, 0.0, -0.02],
            [0.03, -0.03, 0.08],
          ]}
          color="#BCD9EC"
          tube={0.008}
        />
        {/* Cyan interior glow */}
        <pointLight position={[-0.03, 0.02, 0.02]} intensity={0.7} distance={0.7} color="#9FE4FF" />
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
        <meshStandardMaterial color="#BFD9EE" roughness={0.45} />
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
            <meshStandardMaterial
              color={accent ? "#A8CBEA" : row % 2 === 0 ? "#F8FAFC" : "#DCEAF6"}
              roughness={0.45}
            />
          </RoundedBox>
        );
      })}
      {/* Spacebar row */}
      <RoundedBox args={[0.12, 0.01, 0.021]} radius={0.0028} smoothness={2} position={[-0.02, 0.031, 0.051]}>
        <meshStandardMaterial color="#F8FAFC" roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[0.05, 0.01, 0.021]} radius={0.0028} smoothness={2} position={[-0.115, 0.031, 0.051]}>
        <meshStandardMaterial color="#A8CBEA" roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[0.05, 0.01, 0.021]} radius={0.0028} smoothness={2} position={[0.08, 0.031, 0.051]}>
        <meshStandardMaterial color="#DCEAF6" roughness={0.45} />
      </RoundedBox>
    </group>
  );
}

function CloudWristRest() {
  return (
    <group position={[-0.14, DESK_TOP_Y + 0.014, 0.615]}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[-0.147 + i * 0.042, i % 2 === 0 ? 0 : 0.004, 0]} scale={[1, 0.62, 0.8]}>
          <sphereGeometry args={[0.027, 20, 16]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

const DECK_COLORS = ["#7FD8FF", "#FFB3C7", "#B8FFC9", "#FFE9A8", "#D7B8FF", "#8CF2E4"];

function ControlDeck() {
  return (
    <group position={[0.17, DESK_TOP_Y + 0.024, 0.41]} rotation={[-0.55, 0.06, 0]}>
      <RoundedBox args={[0.095, 0.03, 0.068]} radius={0.006} smoothness={2}>
        <meshStandardMaterial color="#2A2C30" roughness={0.4} />
      </RoundedBox>
      {DECK_COLORS.map((c, i) => (
        <mesh key={c} position={[-0.028 + (i % 3) * 0.028, 0.016, -0.013 + Math.floor(i / 3) * 0.026]}>
          <boxGeometry args={[0.02, 0.003, 0.018]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function PhoneOnStand() {
  return (
    <group position={[0.63, DESK_TOP_Y, 0.4]} rotation={[0, -0.45, 0]}>
      <RoundedBox args={[0.07, 0.008, 0.055]} radius={0.004} smoothness={2} position={[0, 0.004, 0]}>
        <meshStandardMaterial color="#F2F1EE" roughness={0.4} />
      </RoundedBox>
      <group position={[0, 0.075, -0.012]} rotation={[-0.3, 0, 0]}>
        <RoundedBox args={[0.072, 0.15, 0.007]} radius={0.006} smoothness={2}>
          <meshStandardMaterial color="#1A1B1E" roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.004]}>
          <planeGeometry args={[0.064, 0.14]} />
          <meshStandardMaterial
            color="#DCEBF8"
            emissive="#C8DFF2"
            emissiveIntensity={0.5}
            toneMapped={false}
          />
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
        <meshStandardMaterial color="#F6F5F2" roughness={0.5} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.07, -0.012, 0]} rotation={[0, 0, (s * Math.PI) / 2]}>
          <cylinderGeometry args={[0.038, 0.042, 0.03, 24]} />
          <meshStandardMaterial color="#EFEEEA" roughness={0.45} />
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
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      <mesh position={[0.01, 0.08, 0]} rotation={[0, 0, -0.18]}>
        <cylinderGeometry args={[0.006, 0.006, 0.14, 12]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      <mesh position={[0.025, 0.16, 0]}>
        <sphereGeometry args={[0.032, 20, 16]} />
        <meshStandardMaterial color="#1E1F22" roughness={0.95} />
      </mesh>
    </group>
  );
}

export default function DeskSetup({
  phase,
  screenContent,
}: {
  phase: PCPhase;
  screenContent: ReactNode;
}) {
  const wallpapers = useTexture([
    "/images/wallpaper/wallpaper1.jpg",
    "/images/wallpaper/wallpaper2.jpg",
  ]);
  const leftArt = useMemo(() => coverTexture(wallpapers[0], 0.35 / 0.62), [wallpapers]);
  const rightArt = useMemo(() => coverTexture(wallpapers[1], 0.28 / 0.5), [wallpapers]);

  return (
    <group>
      {/* Desk: white top with rounded edges + white panel legs */}
      <RoundedBox
        args={[1.9, 0.05, 0.72]}
        radius={0.018}
        smoothness={3}
        position={[0.15, DESK_TOP_Y - 0.025, 0.36]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={WHITE} roughness={0.35} />
      </RoundedBox>
      {[-0.72, 1.02].map((x) => (
        <RoundedBox key={x} args={[0.05, DESK_TOP_Y - 0.05, 0.6]} radius={0.01} smoothness={2} position={[x, (DESK_TOP_Y - 0.05) / 2, 0.36]}>
          <meshStandardMaterial color="#F3F2EE" roughness={0.45} />
        </RoundedBox>
      ))}

      {/* Pale cyan LED strip along the wall behind the monitors */}
      <mesh position={[0.1, 0.78, 0.015]}>
        <boxGeometry args={[1.75, 0.014, 0.012]} />
        <meshStandardMaterial
          color="#6FD0F5"
          emissive="#4AC2F0"
          emissiveIntensity={1.1}
          toneMapped={false}
        />
      </mesh>
      <pointLight position={[0, 1.0, 0.12]} intensity={0.5} distance={1.6} color="#AFE8FF" />

      {/* Monitors */}
      <CenterMonitor phase={phase} screenContent={screenContent} />
      <ArtMonitor position={[-0.63, DESK_TOP_Y, 0.18]} rotationY={0.22} w={0.35} h={0.62} art={leftArt} standHeight={0.16} />
      <ArtMonitor position={[0.72, DESK_TOP_Y, 0.12]} rotationY={-0.18} w={0.28} h={0.5} art={rightArt} standHeight={0.14} />

      <PCTower />
      <Keyboard />
      <CloudWristRest />

      {/* Mouse */}
      <group position={[0.27, DESK_TOP_Y, 0.53]} rotation={[0, -0.15, 0]}>
        <RoundedBox args={[0.055, 0.03, 0.09]} radius={0.013} smoothness={3} position={[0, 0.015, 0]}>
          <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.031, -0.018]}>
          <boxGeometry args={[0.006, 0.004, 0.014]} />
          <meshStandardMaterial color="#A8CBEA" roughness={0.4} />
        </mesh>
      </group>

      {/* Small textured deco near the mouse */}
      <group position={[0.3, DESK_TOP_Y + 0.016, 0.63]}>
        {[[-0.014, 0, 0], [0.014, 0, 0], [0, 0.012, 0]].map(([dx, dy], i) => (
          <mesh key={i} position={[dx, dy, 0]}>
            <sphereGeometry args={[0.016, 8, 6]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.95} flatShading />
          </mesh>
        ))}
      </group>

      <ControlDeck />
      <PhoneOnStand />
      <Headphones />
      <Microphone />

      {/* Cables for realism */}
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
          [0.85, DESK_TOP_Y + 0.02, 0.1],
          [0.82, 0.5, 0.05],
          [0.78, 0.12, 0.08],
        ]}
        color="#C9C7C3"
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
