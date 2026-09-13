"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type LoaderPieceProps = {
  from: [number, number, number];
  to: [number, number, number];
  delay: number;
  children: React.ReactNode;
};

function LoaderPiece({ from, to, delay, children }: LoaderPieceProps) {
  const group = useRef<THREE.Group>(null);
  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const raw = THREE.MathUtils.clamp((clock.elapsedTime - delay) / 0.72, 0, 1);
    const t = 1 - Math.pow(1 - raw, 4);
    target.lerpVectors(start, end, t);
    const ease = 1 - Math.exp(-delta * 12);
    group.current.position.lerp(target, ease);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (1 - t) * 0.7, ease);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, (1 - t) * 0.32, ease);
  });

  return (
    <group ref={group} position={from}>
      {children}
    </group>
  );
}

function LoaderModel() {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (root.current && !reducedMotion) {
      root.current.rotation.y = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    }
    if (core.current && !reducedMotion) {
      const s = 1 + Math.sin(clock.elapsedTime * 4) * 0.045;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={root} scale={0.95}>
      <LoaderPiece from={[-3.2, 1.8, 1]} to={[-0.62, 0.0, 0]} delay={0.02}>
        <RoundedBox args={[0.92, 1.45, 0.42]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0c0e11" metalness={0.9} roughness={0.24} />
        </RoundedBox>
      </LoaderPiece>

      <LoaderPiece from={[3.1, 1.5, 0.7]} to={[0.62, 0.0, 0]} delay={0.08}>
        <RoundedBox args={[0.92, 1.45, 0.42]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#0c0e11" metalness={0.9} roughness={0.24} />
        </RoundedBox>
      </LoaderPiece>

      <LoaderPiece from={[-2.2, -2.5, -0.8]} to={[-0.84, -0.72, 0.08]} delay={0.13}>
        <RoundedBox args={[0.72, 0.58, 0.54]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#24272c" metalness={0.7} roughness={0.34} />
        </RoundedBox>
      </LoaderPiece>

      <LoaderPiece from={[2.4, -2.3, -0.7]} to={[0.84, -0.72, 0.08]} delay={0.18}>
        <RoundedBox args={[0.72, 0.58, 0.54]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#24272c" metalness={0.7} roughness={0.34} />
        </RoundedBox>
      </LoaderPiece>

      <LoaderPiece from={[0, 3.2, -1]} to={[0, 0.9, 0.05]} delay={0.23}>
        <mesh scale={[0.78, 1.0, 0.68]}>
          <icosahedronGeometry args={[0.7, 4]} />
          <meshStandardMaterial color="#1d2025" metalness={0.76} roughness={0.3} />
        </mesh>
      </LoaderPiece>

      <LoaderPiece from={[0, 0, 4]} to={[0, -0.2, -0.34]} delay={0.3}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.24, 4]} />
          <meshStandardMaterial
            color="#ff4a38"
            emissive="#ff2b19"
            emissiveIntensity={3.3}
            metalness={0.25}
            roughness={0.18}
          />
        </mesh>
        <pointLight color="#ff3a24" intensity={7} distance={3.2} />
      </LoaderPiece>
    </group>
  );
}

export function LoaderEntity3D() {
  return (
    <div className="loader-entity3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.4]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.1, 6.3], fov: 34 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[-4, 5, 5]} intensity={4.4} color="#fff0da" />
        <directionalLight position={[4, 1, 3]} intensity={2.1} color="#547bff" />
        <LoaderModel />
      </Canvas>
    </div>
  );
}
