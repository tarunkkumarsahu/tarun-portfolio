"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { MutableRefObject, ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];

export type HeroTimelineState = {
  progress: number;
};

type PieceProps = {
  children: ReactNode;
  assembled: Vec3;
  exploded: Vec3;
  rotation?: Vec3;
  explodedRotation?: Vec3;
  progress: () => number;
};

function Piece({
  children,
  assembled,
  exploded,
  rotation = [0, 0, 0],
  explodedRotation = rotation,
  progress,
}: PieceProps) {
  const ref = useRef<THREE.Group>(null);
  const from = useMemo(() => new THREE.Vector3(...assembled), [assembled]);
  const to = useMemo(() => new THREE.Vector3(...exploded), [exploded]);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!ref.current) return;

    const raw = THREE.MathUtils.clamp(progress(), 0, 1);
    const t = raw * raw * (3 - 2 * raw);
    const ease = 1 - Math.exp(-delta * 8.5);

    target.lerpVectors(from, to, t);
    ref.current.position.lerp(target, ease);
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      THREE.MathUtils.lerp(rotation[0], explodedRotation[0], t),
      ease,
    );
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      THREE.MathUtils.lerp(rotation[1], explodedRotation[1], t),
      ease,
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      THREE.MathUtils.lerp(rotation[2], explodedRotation[2], t),
      ease,
    );
  });

  return (
    <group ref={ref} position={assembled} rotation={rotation}>
      {children}
    </group>
  );
}

function Graphite({ roughness = 0.34 }: { roughness?: number }) {
  return <meshStandardMaterial color="#0b0b0c" metalness={0.68} roughness={roughness} />;
}

function Gunmetal() {
  return <meshStandardMaterial color="#252525" metalness={0.54} roughness={0.42} />;
}

function Ivory() {
  return <meshStandardMaterial color="#e9e5dc" metalness={0.04} roughness={0.5} />;
}

function SignalRed({ strength = 2.2 }: { strength?: number }) {
  return (
    <meshStandardMaterial
      color="#ff4a38"
      emissive="#ff301f"
      emissiveIntensity={strength}
      metalness={0.14}
      roughness={0.28}
    />
  );
}

function SculptureModel({
  timeline,
  inspected,
}: {
  timeline: MutableRefObject<HeroTimelineState>;
  inspected: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  const getProgress = () => {
    if (reducedMotion) return inspected ? 0.2 : 0;
    return Math.max(timeline.current.progress, inspected ? 0.46 : 0);
  };

  useFrame(({ pointer, clock }, delta) => {
    if (!root.current) return;

    const p = getProgress();
    const calm = 1 - p * 0.72;
    const ease = 1 - Math.exp(-delta * 5.5);
    const targetY = reducedMotion ? 0 : pointer.x * 0.1 * calm;
    const targetX = reducedMotion ? 0 : -pointer.y * 0.045 * calm;

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetY, ease);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetX, ease);
    root.current.position.y = reducedMotion
      ? 0
      : Math.sin(clock.elapsedTime * 0.62) * 0.02 * calm;

    const targetScale = 1 + p * 0.08;
    const currentScale = root.current.scale.x;
    const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, ease);
    root.current.scale.setScalar(nextScale);

    if (core.current && !reducedMotion) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.035 * calm;
      core.current.scale.setScalar(pulse);
    }
  });

  const progress = getProgress;

  return (
    <group ref={root} position={[0, 0, 0]}>
      <Piece
        assembled={[0.1, 0.0, -0.18]}
        exploded={[0.05, 0.1, -1.15]}
        rotation={[0.02, 0.02, 0.04]}
        explodedRotation={[0.12, -0.08, 0.2]}
        progress={progress}
      >
        <RoundedBox args={[0.24, 3.2, 0.28]} radius={0.07} smoothness={4}>
          <Gunmetal />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[0.06, 1.34, 0.02]}
        exploded={[0.18, 2.18, 0.8]}
        rotation={[0, 0.02, -0.04]}
        explodedRotation={[0.06, 0.22, -0.18]}
        progress={progress}
      >
        <RoundedBox args={[2.22, 0.3, 0.34]} radius={0.08} smoothness={4}>
          <Graphite roughness={0.3} />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[-0.58, 0.2, 0.02]}
        exploded={[-1.9, 0.56, 0.72]}
        rotation={[0.02, -0.05, -0.15]}
        explodedRotation={[0.1, -0.3, -0.4]}
        progress={progress}
      >
        <RoundedBox args={[0.58, 2.42, 0.34]} radius={0.1} smoothness={5}>
          <Graphite />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[0.62, 0.05, 0.08]}
        exploded={[1.92, 0.18, 0.96]}
        rotation={[-0.02, 0.05, 0.12]}
        explodedRotation={[0.08, 0.34, 0.42]}
        progress={progress}
      >
        <RoundedBox args={[0.7, 2.08, 0.36]} radius={0.11} smoothness={5}>
          <Graphite roughness={0.28} />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[-0.03, 0.28, 0.42]}
        exploded={[-0.38, 0.58, 1.7]}
        rotation={[0, 0, 0.1]}
        explodedRotation={[0.1, -0.12, 0.28]}
        progress={progress}
      >
        <RoundedBox args={[0.28, 1.7, 0.16]} radius={0.07} smoothness={4}>
          <Ivory />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[-0.7, -1.05, 0.12]}
        exploded={[-1.72, -1.5, 0.92]}
        rotation={[0, -0.04, -0.12]}
        explodedRotation={[0.18, -0.28, -0.34]}
        progress={progress}
      >
        <RoundedBox args={[0.84, 0.52, 0.38]} radius={0.1} smoothness={4}>
          <Gunmetal />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[0.58, -1.14, 0.08]}
        exploded={[1.78, -1.64, 1.08]}
        rotation={[0, 0.03, 0.09]}
        explodedRotation={[0.14, 0.3, 0.34]}
        progress={progress}
      >
        <RoundedBox args={[0.94, 0.46, 0.36]} radius={0.1} smoothness={4}>
          <Ivory />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[-0.95, -0.2, 0.18]}
        exploded={[-2.2, -0.42, 1.35]}
        rotation={[0.04, 0.04, -0.72]}
        explodedRotation={[0.18, -0.24, -1.0]}
        progress={progress}
      >
        <RoundedBox args={[0.12, 1.35, 0.14]} radius={0.045} smoothness={3}>
          <Ivory />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[0.28, 0.16, 0.5]}
        exploded={[0.72, 0.52, 2.0]}
        rotation={[0, 0, -0.03]}
        explodedRotation={[0.08, 0.12, 0.12]}
        progress={progress}
      >
        <RoundedBox args={[0.12, 1.28, 0.12]} radius={0.04} smoothness={3}>
          <SignalRed strength={1.8} />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[0.58, 0.92, 0.54]}
        exploded={[1.44, 1.38, 1.82]}
        rotation={[0, 0, 0.01]}
        explodedRotation={[0.1, 0.22, 0.22]}
        progress={progress}
      >
        <RoundedBox args={[0.76, 0.08, 0.1]} radius={0.03} smoothness={3}>
          <SignalRed strength={2.1} />
        </RoundedBox>
      </Piece>

      <Piece
        assembled={[0.12, -0.44, 0.58]}
        exploded={[0.08, -0.18, 2.28]}
        progress={progress}
      >
        <mesh ref={core}>
          <dodecahedronGeometry args={[0.22, 0]} />
          <SignalRed strength={3.1} />
        </mesh>
        <pointLight color="#ff3a26" intensity={2.2} distance={2.3} decay={2} />
      </Piece>
    </group>
  );
}

export function TarunSculpture3D({
  timeline,
}: {
  timeline: MutableRefObject<HeroTimelineState>;
}) {
  const [inspected, setInspected] = useState(false);

  return (
    <div
      className={`tarun-sculpture3d ${inspected ? "is-inspected" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={inspected}
      aria-label={inspected ? "Reassemble identity object" : "Inspect identity object"}
      data-cursor={inspected ? "ASSEMBLE" : "INSPECT"}
      onClick={() => setInspected((value) => !value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setInspected((value) => !value);
        }
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.04, 6.8], fov: 31, near: 0.1, far: 30 }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[-4, 5, 6]} intensity={3.9} color="#fff8e9" />
        <directionalLight position={[4, 1, 4]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[0, -4, 3]} intensity={0.8} color="#ffddd7" />
        <SculptureModel timeline={timeline} inspected={inspected} />
      </Canvas>

      <div className="tarun-sculpture3d__meta" aria-hidden="true">
        <span>TS / IDENTITY OBJECT 01</span>
        <span>{inspected ? "EXPLODED / INSPECT" : "ASSEMBLED / ACTIVE"}</span>
      </div>

      <div className="tarun-sculpture3d__prompt" aria-hidden="true">
        <span>{inspected ? "CLICK TO REASSEMBLE" : "CLICK TO INSPECT"}</span>
        <i />
      </div>
    </div>
  );
}
