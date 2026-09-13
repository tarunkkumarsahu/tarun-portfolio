"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];

type ExplodingPartProps = {
  children: ReactNode;
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
    const raw = THREE.MathUtils.clamp(explode(), 0, 1);
    const t = raw * raw * (3 - 2 * raw);
    target.lerpVectors(from, to, t);
    const ease = 1 - Math.exp(-delta * 8.5);
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

  return <group ref={ref} position={assembled} rotation={rotation}>{children}</group>;
}

function Graphite({ roughness = 0.42 }: { roughness?: number }) {
  return <meshStandardMaterial color="#111214" metalness={0.54} roughness={roughness} />;
}

function Gunmetal() {
  return <meshStandardMaterial color="#313234" metalness={0.5} roughness={0.5} />;
}

function Ivory() {
  return <meshStandardMaterial color="#e9e5dc" metalness={0.02} roughness={0.58} />;
}

function SignalRed({ strength = 2.2 }: { strength?: number }) {
  return (
    <meshStandardMaterial
      color="#ff4a38"
      emissive="#ff351f"
      emissiveIntensity={strength}
      metalness={0.08}
      roughness={0.38}
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
  const core = useRef<THREE.Mesh>(null);
  const reducedMotion = useReducedMotion();

  const getExplode = () => {
    if (reducedMotion) return inspected ? 0.2 : 0;
    const scroll = scrollProgress.get();
    const scrollExplode = THREE.MathUtils.clamp((scroll - 0.46) / 0.42, 0, 1);
    return Math.max(scrollExplode, inspected ? 0.54 : 0);
  };

  useFrame(({ pointer, clock }, delta) => {
    if (!root.current) return;
    const explode = getExplode();
    const calm = 1 - explode * 0.8;
    const ease = 1 - Math.exp(-delta * 5.2);
    const targetYaw = reducedMotion ? -0.08 : -0.08 + pointer.x * 0.08 * calm;
    const targetPitch = reducedMotion ? 0.015 : 0.015 - pointer.y * 0.035 * calm;

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetYaw, ease);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetPitch, ease);
    root.current.position.y = reducedMotion
      ? -0.08
      : -0.08 + Math.sin(clock.elapsedTime * 0.65) * 0.018 * calm;

    if (core.current && !reducedMotion) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.1) * 0.035;
      core.current.scale.setScalar(pulse);
    }
  });

  const explode = getExplode;

  return (
    <group ref={root} position={[0, -0.08, 0]} scale={1.12}>
      {/* spine / neck */}
      <ExplodingPart assembled={[0, 0.22, -0.18]} exploded={[0, 0.25, -1.18]} explode={explode}>
        <mesh>
          <cylinderGeometry args={[0.17, 0.23, 0.86, 18]} />
          <Gunmetal />
        </mesh>
        <mesh position={[0, 0.29, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.025, 8, 36]} />
          <Ivory />
        </mesh>
      </ExplodingPart>

      {/* faceted human-like head core */}
      <ExplodingPart assembled={[0, 1.42, -0.02]} exploded={[0, 2.18, -0.15]} explode={explode}>
        <mesh scale={[0.84, 1.04, 0.8]}>
          <icosahedronGeometry args={[0.78, 2]} />
          <meshStandardMaterial color="#151618" metalness={0.46} roughness={0.46} flatShading />
        </mesh>
      </ExplodingPart>

      {/* split side shells */}
      <ExplodingPart
        assembled={[-0.57, 1.45, 0.03]}
        exploded={[-1.62, 1.88, 0.38]}
        rotation={[0.02, -0.06, -0.04]}
        explodedRotation={[0.06, -0.36, -0.18]}
        explode={explode}
      >
        <RoundedBox args={[0.22, 0.98, 0.62]} radius={0.07} smoothness={3}>
          <Graphite roughness={0.34} />
        </RoundedBox>
      </ExplodingPart>
      <ExplodingPart
        assembled={[0.57, 1.45, 0.03]}
        exploded={[1.62, 1.88, 0.38]}
        rotation={[0.02, 0.06, 0.04]}
        explodedRotation={[0.06, 0.36, 0.18]}
        explode={explode}
      >
        <RoundedBox args={[0.22, 0.98, 0.62]} radius={0.07} smoothness={3}>
          <Graphite roughness={0.34} />
        </RoundedBox>
      </ExplodingPart>

      {/* visor: one quiet signal instead of a robot face */}
      <ExplodingPart assembled={[0, 1.47, 0.67]} exploded={[0, 1.68, 1.72]} explode={explode}>
        <RoundedBox args={[0.92, 0.095, 0.065]} radius={0.025} smoothness={3}>
          <Ivory />
        </RoundedBox>
        <RoundedBox args={[0.64, 0.026, 0.025]} radius={0.01} smoothness={2} position={[0.12, 0, 0.05]}>
          <SignalRed strength={1.7} />
        </RoundedBox>
      </ExplodingPart>

      {/* jaw architecture */}
      <ExplodingPart
        assembled={[-0.31, 0.93, 0.48]}
        exploded={[-0.92, 1.0, 1.12]}
        rotation={[0.05, -0.08, -0.22]}
        explodedRotation={[0.12, -0.3, -0.42]}
        explode={explode}
      >
        <RoundedBox args={[0.24, 0.58, 0.16]} radius={0.05} smoothness={3}><Gunmetal /></RoundedBox>
      </ExplodingPart>
      <ExplodingPart
        assembled={[0.31, 0.93, 0.48]}
        exploded={[0.92, 1.0, 1.12]}
        rotation={[0.05, 0.08, 0.22]}
        explodedRotation={[0.12, 0.3, 0.42]}
        explode={explode}
      >
        <RoundedBox args={[0.24, 0.58, 0.16]} radius={0.05} smoothness={3}><Gunmetal /></RoundedBox>
      </ExplodingPart>

      {/* crown fins: subtle silhouette cue, not literal hair */}
      {[-0.28, 0, 0.28].map((x, index) => (
        <ExplodingPart
          key={x}
          assembled={[x, 2.06 + (index === 1 ? 0.06 : 0), -0.16]}
          exploded={[x * 2.6, 2.88 + Math.abs(x) * 0.5, 0.12]}
          rotation={[0.16, x * 0.25, x * 0.34]}
          explodedRotation={[0.28, x * 0.8, x * 0.9]}
          explode={explode}
        >
          <RoundedBox args={[0.13, 0.46 + (index === 1 ? 0.08 : 0), 0.36]} radius={0.04} smoothness={3}>
            <Graphite roughness={0.3} />
          </RoundedBox>
        </ExplodingPart>
      ))}

      {/* internal torso chassis */}
      <ExplodingPart assembled={[0, -0.7, -0.08]} exploded={[0, -0.55, -1.0]} explode={explode}>
        <RoundedBox args={[1.28, 1.72, 0.44]} radius={0.19} smoothness={4}>
          <Gunmetal />
        </RoundedBox>
      </ExplodingPart>

      {/* collar rails create the shoulder line */}
      <ExplodingPart
        assembled={[-0.65, -0.02, 0.1]}
        exploded={[-1.72, 0.42, 0.5]}
        rotation={[0, 0, -0.72]}
        explodedRotation={[0.12, -0.18, -0.94]}
        explode={explode}
      >
        <RoundedBox args={[0.15, 1.18, 0.16]} radius={0.045} smoothness={3}><Ivory /></RoundedBox>
      </ExplodingPart>
      <ExplodingPart
        assembled={[0.65, -0.02, 0.1]}
        exploded={[1.72, 0.42, 0.5]}
        rotation={[0, 0, 0.72]}
        explodedRotation={[0.12, 0.18, 0.94]}
        explode={explode}
      >
        <RoundedBox args={[0.15, 1.18, 0.16]} radius={0.045} smoothness={3}><Ivory /></RoundedBox>
      </ExplodingPart>

      {/* split chest armour: angled into one coherent silhouette */}
      <ExplodingPart
        assembled={[-0.43, -0.72, 0.34]}
        exploded={[-1.82, -0.5, 0.92]}
        rotation={[0.02, 0.08, -0.14]}
        explodedRotation={[0.08, -0.2, -0.34]}
        explode={explode}
      >
        <RoundedBox args={[0.78, 1.18, 0.17]} radius={0.11} smoothness={4}><Graphite /></RoundedBox>
      </ExplodingPart>
      <ExplodingPart
        assembled={[0.43, -0.72, 0.34]}
        exploded={[1.82, -0.5, 0.92]}
        rotation={[0.02, -0.08, 0.14]}
        explodedRotation={[0.08, 0.2, 0.34]}
        explode={explode}
      >
        <RoundedBox args={[0.78, 1.18, 0.17]} radius={0.11} smoothness={4}><Graphite /></RoundedBox>
      </ExplodingPart>

      {/* shoulders */}
      <ExplodingPart
        assembled={[-1.15, -0.5, -0.02]}
        exploded={[-2.6, -0.05, 0.72]}
        rotation={[0.02, 0.08, -0.18]}
        explodedRotation={[0.16, 0.22, -0.42]}
        explode={explode}
      >
        <RoundedBox args={[0.58, 0.78, 0.54]} radius={0.16} smoothness={4}><Graphite roughness={0.38} /></RoundedBox>
      </ExplodingPart>
      <ExplodingPart
        assembled={[1.15, -0.5, -0.02]}
        exploded={[2.6, -0.05, 0.72]}
        rotation={[0.02, -0.08, 0.18]}
        explodedRotation={[0.16, -0.22, 0.42]}
        explode={explode}
      >
        <RoundedBox args={[0.58, 0.78, 0.54]} radius={0.16} smoothness={4}><Graphite roughness={0.38} /></RoundedBox>
      </ExplodingPart>

      {/* intelligence core, recessed until the system opens */}
      <ExplodingPart assembled={[0, -0.58, 0.62]} exploded={[0, -0.22, 1.82]} explode={explode}>
        <mesh ref={core} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.08, 32]} />
          <SignalRed strength={3.0} />
        </mesh>
        <mesh position={[0, 0, -0.045]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.29, 0.022, 10, 48]} />
          <Ivory />
        </mesh>
        <pointLight color="#ff3a25" intensity={3.4} distance={2.4} decay={2} />
      </ExplodingPart>

      {/* lower frame keeps the bust grounded */}
      <ExplodingPart assembled={[-0.55, -1.42, -0.02]} exploded={[-1.25, -2.02, 0.52]} rotation={[0, 0, 0.12]} explode={explode}>
        <RoundedBox args={[0.28, 0.88, 0.32]} radius={0.08} smoothness={3}><Gunmetal /></RoundedBox>
      </ExplodingPart>
      <ExplodingPart assembled={[0.55, -1.42, -0.02]} exploded={[1.25, -2.02, 0.52]} rotation={[0, 0, -0.12]} explode={explode}>
        <RoundedBox args={[0.28, 0.88, 0.32]} radius={0.08} smoothness={3}><Gunmetal /></RoundedBox>
      </ExplodingPart>
    </group>
  );
}

export function TarunEntity3D({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [inspected, setInspected] = useState(false);

  return (
    <div
      className={`tarun-entity3d ${inspected ? "is-inspected" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={inspected}
      aria-label={inspected ? "Reassemble Tarun entity" : "Inspect Tarun entity"}
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
        dpr={[1, 1.45]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.05, 7.3], fov: 27, near: 0.1, far: 40 }}
      >
        <ambientLight intensity={1.55} />
        <directionalLight position={[-4.2, 5.4, 5]} intensity={4.1} color="#fff9ef" />
        <directionalLight position={[4, 2.1, 4.2]} intensity={2.1} color="#ffe9e0" />
        <directionalLight position={[0, 4, -4]} intensity={2.5} color="#ffffff" />
        <EntityModel scrollProgress={scrollProgress} inspected={inspected} />
      </Canvas>

      <span className="tarun-entity3d__state" aria-hidden="true">
        {inspected ? "INSPECT / OPEN" : "ENTITY / TS-01"}
      </span>
    </div>
  );
}
