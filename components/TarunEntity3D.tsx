"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];

type ExplodingPartProps = {
  children: React.ReactNode;
  assembled: Vec3;
  exploded: Vec3;
  rotation?: Vec3;
  explodedRotation?: Vec3;
  explode: () => number;
};

function ExplodingPart({
  children,
  assembled,
  exploded,
  rotation = [0, 0, 0],
  explodedRotation = rotation,
  explode,
}: ExplodingPartProps) {
  const ref = useRef<THREE.Group>(null);
  const from = useMemo(() => new THREE.Vector3(...assembled), [assembled]);
  const to = useMemo(() => new THREE.Vector3(...exploded), [exploded]);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const t = THREE.MathUtils.clamp(explode(), 0, 1);
    target.lerpVectors(from, to, t);
    const ease = 1 - Math.exp(-delta * 8.5);
    ref.current.position.lerp(target, ease);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, THREE.MathUtils.lerp(rotation[0], explodedRotation[0], t), ease);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, THREE.MathUtils.lerp(rotation[1], explodedRotation[1], t), ease);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, THREE.MathUtils.lerp(rotation[2], explodedRotation[2], t), ease);
  });

  return (
    <group ref={ref} position={assembled} rotation={rotation}>
      {children}
    </group>
  );
}

function Graphite({ roughness = 0.3 }: { roughness?: number }) {
  return <meshStandardMaterial color="#0b0d10" metalness={0.88} roughness={roughness} />;
}

function SoftGraphite() {
  return <meshStandardMaterial color="#22262b" metalness={0.66} roughness={0.36} />;
}

function Ivory() {
  return <meshStandardMaterial color="#e9e5dc" metalness={0.18} roughness={0.34} />;
}

function SignalRed({ emissive = 2.6 }: { emissive?: number }) {
  return (
    <meshStandardMaterial
      color="#ff4a38"
      emissive="#ff2a18"
      emissiveIntensity={emissive}
      metalness={0.28}
      roughness={0.2}
    />
  );
}

function SignalBlue() {
  return (
    <meshStandardMaterial
      color="#173a70"
      emissive="#1d69ff"
      emissiveIntensity={1.15}
      metalness={0.4}
      roughness={0.24}
    />
  );
}

function EntityModel({
  scrollProgress,
  inspected,
}: {
  scrollProgress: MotionValue<number>;
  inspected: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const pulse = useRef<THREE.Mesh>(null);

  const getExplode = () => {
    if (reducedMotion) return inspected ? 0.42 : 0;
    const scroll = scrollProgress.get();
    const scrollExplode = THREE.MathUtils.clamp((scroll - 0.48) / 0.38, 0, 1);
    return Math.max(scrollExplode, inspected ? 0.56 : 0);
  };

  useFrame(({ pointer, clock }, delta) => {
    if (root.current) {
      const explode = getExplode();
      const hoverYaw = reducedMotion ? 0 : pointer.x * 0.12 * (1 - explode * 0.7);
      const hoverPitch = reducedMotion ? 0 : -pointer.y * 0.06 * (1 - explode * 0.7);
      const ease = 1 - Math.exp(-delta * 5.5);
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, hoverYaw, ease);
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, hoverPitch, ease);
      root.current.position.y = reducedMotion ? -0.1 : -0.1 + Math.sin(clock.elapsedTime * 0.75) * 0.035;
    }

    if (pulse.current && !reducedMotion) {
      const s = 1 + Math.sin(clock.elapsedTime * 2.2) * 0.045;
      pulse.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={root} position={[0, -0.1, 0]} scale={0.93}>
      <ExplodingPart assembled={[0, 0.05, 0]} exploded={[0, 0.25, -0.4]} explode={getExplode}>
        <RoundedBox args={[3.2, 2.0, 0.95]} radius={0.16} smoothness={4} position={[0, -1.2, 0.35]}>
          <SoftGraphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[-0.78, -0.92, -0.2]}
        exploded={[-2.45, -0.74, 0.25]}
        rotation={[0.05, 0.11, -0.08]}
        explodedRotation={[0.06, -0.14, -0.28]}
        explode={getExplode}
      >
        <RoundedBox args={[1.32, 1.28, 0.24]} radius={0.11} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[0.78, -0.92, -0.2]}
        exploded={[2.45, -0.74, 0.25]}
        rotation={[0.05, -0.11, 0.08]}
        explodedRotation={[0.06, 0.14, 0.28]}
        explode={getExplode}
      >
        <RoundedBox args={[1.32, 1.28, 0.24]} radius={0.11} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[0, -0.82, -0.4]} exploded={[0, -0.55, 1.4]} explode={getExplode}>
        <mesh ref={pulse}>
          <icosahedronGeometry args={[0.34, 5]} />
          <SignalRed emissive={3.4} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.025, 14, 80]} />
          <Ivory />
        </mesh>
        <pointLight color="#ff3a24" intensity={9} distance={4.2} decay={2} />
      </ExplodingPart>

      <ExplodingPart assembled={[0, 0.1, 0.08]} exploded={[0, 0.8, 0.38]} explode={getExplode}>
        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[0.32, 0.38, 0.72, 48]} />
          <SoftGraphite />
        </mesh>
      </ExplodingPart>

      <ExplodingPart assembled={[0, 1.18, 0]} exploded={[0, 2.2, 0.45]} explode={getExplode}>
        <mesh scale={[0.83, 1.0, 0.74]}>
          <icosahedronGeometry args={[0.88, 5]} />
          <SoftGraphite />
        </mesh>
      </ExplodingPart>

      <ExplodingPart
        assembled={[0, 1.12, -0.63]}
        exploded={[0, 1.42, -2.1]}
        rotation={[0.04, 0, 0]}
        explodedRotation={[0.18, 0, 0]}
        explode={getExplode}
      >
        <RoundedBox args={[1.06, 1.05, 0.17]} radius={0.14} smoothness={4}>
          <Graphite roughness={0.22} />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[-0.52, 1.25, -0.05]}
        exploded={[-1.65, 1.95, 0.35]}
        rotation={[0, -0.12, -0.05]}
        explodedRotation={[0, -0.42, -0.2]}
        explode={getExplode}
      >
        <RoundedBox args={[0.34, 1.12, 0.5]} radius={0.1} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[0.52, 1.25, -0.05]}
        exploded={[1.65, 1.95, 0.35]}
        rotation={[0, 0.12, 0.05]}
        explodedRotation={[0, 0.42, 0.2]}
        explode={getExplode}
      >
        <RoundedBox args={[0.34, 1.12, 0.5]} radius={0.1} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[-0.28, 1.32, -0.74]} exploded={[-0.8, 1.7, -2.3]} rotation={[0, 0, -0.04]} explode={getExplode}>
        <RoundedBox args={[0.43, 0.08, 0.08]} radius={0.035} smoothness={3}>
          <SignalRed emissive={1.65} />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[0.28, 1.32, -0.74]} exploded={[0.8, 1.7, -2.3]} rotation={[0, 0, 0.04]} explode={getExplode}>
        <RoundedBox args={[0.43, 0.08, 0.08]} radius={0.035} smoothness={3}>
          <SignalRed emissive={1.65} />
        </RoundedBox>
      </ExplodingPart>

      {[
        [-0.48, 1.93, -0.02, -0.22],
        [-0.24, 2.04, -0.02, -0.13],
        [0.0, 2.08, -0.02, -0.04],
        [0.24, 2.03, -0.02, 0.08],
        [0.46, 1.91, -0.02, 0.16],
      ].map(([x, y, z, rz], index) => (
        <ExplodingPart
          key={index}
          assembled={[x, y, z] as Vec3}
          exploded={[x * 2.4, y + 1.15 + Math.abs(x) * 0.4, z + 0.5] as Vec3}
          rotation={[0.08, x * 0.22, rz] as Vec3}
          explodedRotation={[0.18, x * 0.6, rz * 1.8] as Vec3}
          explode={getExplode}
        >
          <RoundedBox args={[0.19, 0.56, 0.45]} radius={0.08} smoothness={3}>
            <Graphite />
          </RoundedBox>
        </ExplodingPart>
      ))}

      <ExplodingPart
        assembled={[-1.86, -0.72, 0.18]}
        exploded={[-3.3, 0.1, 1.0]}
        rotation={[0, 0.08, -0.22]}
        explodedRotation={[0.15, 0.2, -0.48]}
        explode={getExplode}
      >
        <RoundedBox args={[0.82, 0.72, 0.68]} radius={0.17} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[1.86, -0.72, 0.18]}
        exploded={[3.3, 0.1, 1.0]}
        rotation={[0, -0.08, 0.22]}
        explodedRotation={[-0.15, -0.2, 0.48]}
        explode={getExplode}
      >
        <RoundedBox args={[0.82, 0.72, 0.68]} radius={0.17} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[-1.42, 0.16, 0.45]} exploded={[-2.8, 1.1, 1.65]} explode={getExplode}>
        <RoundedBox args={[0.34, 0.32, 0.34]} radius={0.08} smoothness={3}>
          <SignalRed emissive={1.4} />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[1.42, 0.16, 0.45]} exploded={[2.8, 1.1, 1.65]} explode={getExplode}>
        <RoundedBox args={[0.34, 0.32, 0.34]} radius={0.08} smoothness={3}>
          <SignalBlue />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[-1.54, -1.32, 0.45]} exploded={[-3.0, -1.35, 0.8]} explode={getExplode}>
        <RoundedBox args={[0.38, 0.3, 0.34]} radius={0.08} smoothness={3}>
          <Ivory />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[1.54, -1.32, 0.45]} exploded={[3.0, -1.35, 0.8]} explode={getExplode}>
        <RoundedBox args={[0.38, 0.3, 0.34]} radius={0.08} smoothness={3}>
          <Ivory />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[-1.1, 0.74, 0.65]} exploded={[-2.15, 1.0, 1.3]} rotation={[0, 0, -0.14]} explode={getExplode}>
        <RoundedBox args={[0.12, 2.15, 0.13]} radius={0.05} smoothness={3}>
          <SoftGraphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart assembled={[1.1, 0.74, 0.65]} exploded={[2.15, 1.0, 1.3]} rotation={[0, 0, 0.14]} explode={getExplode}>
        <RoundedBox args={[0.12, 2.15, 0.13]} radius={0.05} smoothness={3}>
          <SoftGraphite />
        </RoundedBox>
      </ExplodingPart>
    </group>
  );
}

export function TarunEntity3D({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [inspected, setInspected] = useState(false);

  function toggleInspect() {
    setInspected((current) => !current);
  }

  return (
    <div
      className={`tarun-entity3d ${inspected ? "is-inspected" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={inspected ? "Reassemble the Tarun entity" : "Inspect the Tarun entity in exploded view"}
      data-cursor={inspected ? "ASSEMBLE" : "INSPECT"}
      onClick={toggleInspect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleInspect();
        }
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.18, 7.6], fov: 34, near: 0.1, far: 50 }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[-4, 6, 6]} intensity={4.6} color="#fff1df" />
        <directionalLight position={[5, 2, 4]} intensity={2.7} color="#5e86ff" />
        <pointLight position={[-3.2, -0.4, 3.2]} intensity={11} color="#ff3a24" distance={8} />
        <EntityModel scrollProgress={scrollProgress} inspected={inspected} />
      </Canvas>

      <div className="tarun-entity3d__chrome" aria-hidden="true">
        <span>ENTITY / TS-01</span>
        <span>{inspected ? "EXPLODED / INSPECT" : "ASSEMBLED / IDLE"}</span>
      </div>

      <div className="tarun-entity3d__prompt" aria-hidden="true">
        <span>{inspected ? "CLICK TO REASSEMBLE" : "CLICK TO INSPECT"}</span>
        <i />
      </div>

      <div className="tarun-entity3d__layers" aria-hidden="true">
        <span>INTELLIGENCE</span>
        <span>MEMORY</span>
        <span>TOOLS</span>
        <span>MACHINES</span>
      </div>
    </div>
  );
}
