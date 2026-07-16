"use client";

import { RoundedBox, useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export const VROID_MODEL_URLS = {
  a: "https://raw.githubusercontent.com/madjin/vrm-samples/master/vroid/stable/AvatarSample_A.vrm",
  b: "https://raw.githubusercontent.com/madjin/vrm-samples/master/vroid/stable/AvatarSample_B.vrm",
} as const;

type ModelKey = keyof typeof VROID_MODEL_URLS;
type FigurePose = "relaxed" | "wave" | "hero";

function findBone(root: THREE.Object3D, names: string[]): THREE.Object3D | undefined {
  for (const name of names) {
    const exact = root.getObjectByName(name);
    if (exact) return exact;
  }

  const normalized = names.map((name) => name.toLowerCase().replace(/[^a-z]/g, ""));
  let match: THREE.Object3D | undefined;
  root.traverse((object) => {
    if (match) return;
    const current = object.name.toLowerCase().replace(/[^a-z]/g, "");
    if (normalized.some((name) => current.endsWith(name) || current.includes(name))) match = object;
  });
  return match;
}

function setRotation(
  root: THREE.Object3D,
  names: string[],
  rotation: [number, number, number],
) {
  const bone = findBone(root, names);
  if (bone) bone.rotation.set(...rotation);
}

function applyPose(root: THREE.Object3D, pose: FigurePose) {
  const leftUpper = ["J_Bip_L_UpperArm", "LeftUpperArm", "leftUpperArm"];
  const rightUpper = ["J_Bip_R_UpperArm", "RightUpperArm", "rightUpperArm"];
  const leftLower = ["J_Bip_L_LowerArm", "LeftLowerArm", "leftLowerArm"];
  const rightLower = ["J_Bip_R_LowerArm", "RightLowerArm", "rightLowerArm"];
  const head = ["J_Bip_C_Head", "Head", "head"];
  const hips = ["J_Bip_C_Hips", "Hips", "hips"];

  if (pose === "wave") {
    setRotation(root, leftUpper, [0.05, 0.05, -1.12]);
    setRotation(root, leftLower, [0, 0, -0.12]);
    setRotation(root, rightUpper, [-0.2, -0.05, 0.28]);
    setRotation(root, rightLower, [0.05, 0.05, 1.45]);
    setRotation(root, head, [0.02, -0.16, 0.05]);
    setRotation(root, hips, [0, 0.06, 0]);
    return;
  }

  if (pose === "hero") {
    setRotation(root, leftUpper, [0.1, 0.05, -0.86]);
    setRotation(root, rightUpper, [0.1, -0.05, 0.86]);
    setRotation(root, leftLower, [-0.05, 0, -0.28]);
    setRotation(root, rightLower, [-0.05, 0, 0.28]);
    setRotation(root, head, [-0.03, 0.12, -0.03]);
    return;
  }

  setRotation(root, leftUpper, [0.08, 0.02, -1.08]);
  setRotation(root, rightUpper, [0.08, -0.02, 1.08]);
  setRotation(root, leftLower, [-0.06, 0.02, -0.18]);
  setRotation(root, rightLower, [-0.06, -0.02, 0.18]);
  setRotation(root, head, [0.02, 0.08, -0.02]);
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
  const gltf = useGLTF(VROID_MODEL_URLS[model]) as unknown as { scene: THREE.Group };
  const figure = useMemo(() => clone(gltf.scene) as THREE.Group, [gltf.scene]);

  useLayoutEffect(() => {
    figure.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
    });
    applyPose(figure, pose);
  }, [figure, pose]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[0.12, 0.018, 0.1]} radius={0.007} smoothness={3} position={[0, 0.009, 0]} castShadow>
        <meshStandardMaterial color={baseColor} roughness={0.28} metalness={0.42} />
      </RoundedBox>
      <mesh position={[0, 0.019, 0]}>
        <cylinderGeometry args={[0.043, 0.048, 0.012, 32]} />
        <meshStandardMaterial color="#2C3036" roughness={0.25} metalness={0.55} />
      </mesh>
      <primitive object={figure} scale={scale} position={[0, 0.025, 0]} />
    </group>
  );
}

useGLTF.preload(VROID_MODEL_URLS.a);
useGLTF.preload(VROID_MODEL_URLS.b);
