"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import type { Group, Mesh } from "three";

const ACCENT = "#c8365a";

/** A pod. The accent one breathes, so the model reads as live. */
function Pod({
  position,
  accent,
  delay,
}: {
  position: [number, number, number];
  accent?: boolean;
  delay: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !accent) return;
    ref.current.scale.y = 1 + Math.sin((clock.elapsedTime + delay) * 2.2) * 0.16;
  });

  return (
    <RoundedBox
      ref={ref}
      args={[0.36, 0.36, 0.36]}
      radius={0.06}
      smoothness={3}
      position={position}
    >
      <meshStandardMaterial
        color={accent ? ACCENT : "#c9cad2"}
        roughness={0.42}
        metalness={0.08}
        emissive={accent ? ACCENT : "#000000"}
        emissiveIntensity={accent ? 0.3 : 0}
      />
    </RoundedBox>
  );
}

/** One worker node: a slab with pods sitting on it. */
function Node({
  position,
  pods,
  hot,
}: {
  position: [number, number, number];
  pods: number;
  hot?: boolean;
}) {
  return (
    <group position={position}>
      <RoundedBox args={[1.9, 0.22, 1.9]} radius={0.05} smoothness={3}>
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.6}
          metalness={0.04}
        />
      </RoundedBox>

      {Array.from({ length: pods }).map((_, i) => (
        <Pod
          key={i}
          position={[-0.55 + (i % 3) * 0.55, 0.29, -0.3 + Math.floor(i / 3) * 0.55]}
          accent={hot && i === 0}
          delay={i * 0.35}
         
        />
      ))}
    </group>
  );
}

/** Slow drift, so it feels alive without demanding attention. */
function Rig({ reduced }: { reduced: boolean }) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y = clock.elapsedTime * 0.11;
  });

  return (
    <group ref={ref}>
      <Node position={[-1.15, 0, -1.15]} pods={4} />
      <Node position={[1.15, 0, -1.15]} pods={3} />
      <Node position={[-1.15, 0, 1.15]} pods={2} />
      <Node position={[1.15, 0, 1.15]} pods={5} hot />
    </group>
  );
}

export default function ClusterScene() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [4.6, 3.4, 4.6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 4]} intensity={1.15} />
      <directionalLight position={[-4, 3, -4]} intensity={0.3} />

      <Rig reduced={reduced} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.35}
      />
    </Canvas>
  );
}
