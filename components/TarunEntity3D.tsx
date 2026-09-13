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
    const t = THREE.MathUtils.smoothstep(THREE.MathUtils.clamp(explode(), 0, 1), 0, 1);
    target.lerpVectors(from, to, t);
    const ease = 1 - Math.exp(-delta * 9);
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

function Graphite({ roughness = 0.28 }: { roughness?: number }) {
  return <meshStandardMaterial color="#111214" metalness={0.72} roughness={roughness} />;
}

function Gunmetal() {
  return <meshStandardMaterial color="#2b2c2d" metalness={0.56} roughness={0.36} />;
}

function Ivory() {
  return <meshStandardMaterial color="#e9e5dc" metalness={0.06} roughness={0.42} />;
}

function SignalRed({ strength = 2.5 }: { strength?: number }) {
  return (
    <meshStandardMaterial
      color="#ff4a38"
      emissive="#ff2d1a"
      emissiveIntensity={strength}
      metalness={0.12}
      roughness={0.3}
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
    if (reducedMotion) return inspected ? 0.28 : 0;
    const scroll = scrollProgress.get();
    const scrollExplode = THREE.MathUtils.clamp((scroll - 0.42) / 0.46, 0, 1);
    return Math.max(scrollExplode, inspected ? 0.52 : 0);
  };

  useFrame(({ pointer, clock }, delta) => {
    if (!root.current) return;

    const explode = getExplode();
    const idle = 1 - explode * 0.72;
    const targetYaw = reducedMotion ? 0 : pointer.x * 0.105 * idle;
    const targetPitch = reducedMotion ? 0 : -pointer.y * 0.045 * idle;
    const ease = 1 - Math.exp(-delta * 5.5);

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetYaw, ease);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetPitch, ease);
    root.current.position.y = reducedMotion ? -0.12 : -0.12 + Math.sin(clock.elapsedTime * 0.72) * 0.025 * idle;

    if (core.current && !reducedMotion) {
      const pulse = 1 + Math.sin(clock.elapsedTime * 2.25) * 0.045;
      core.current.scale.setScalar(pulse);
    }
  });

  const explode = getExplode;

  return (
    <group ref={root} position={[0, -0.12, 0]} scale={1.06}>
      {/* spine + neck */}
      <ExplodingPart assembled={[0, -0.48, -0.12]} exploded={[0, -0.38, -1.15]} explode={explode}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.21, 1.72, 24]} />
          <Gunmetal />
        </mesh>
      </ExplodingPart>

      <ExplodingPart assembled={[0, 0.42, -0.04]} exploded={[0, 0.7, -0.62]} explode={explode}>
        <mesh>
          <cylinderGeometry args={[0.19, 0.24, 0.72, 24]} />
          <Graphite />
        </mesh>
        <mesh position={[0, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.025, 10, 44]} />
          <Ivory />
        </mesh>
      </ExplodingPart>

      {/* central head core */}
      <ExplodingPart assembled={[0, 1.35, 0]} exploded={[0, 2.18, 0.22]} explode={explode}>
        <RoundedBox args={[1.02, 1.26, 0.72]} radius={0.2} smoothness={5} scale={[0.92, 1.05, 0.86]}>
          <Graphite roughness={0.23} />
        </RoundedBox>
      </ExplodingPart>

      {/* face chassis */}
      <ExplodingPart assembled={[0, 1.27, 0.43]} exploded={[0, 1.84, 1.56]} explode={explode}>
        <RoundedBox args={[0.88, 0.88, 0.12]} radius={0.1} smoothness={4}>
          <Ivory />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.08, 0.07]} radius={0.03} smoothness={3} position={[0, 0.16, 0.085]}>
          <SignalRed strength={1.6} />
        </RoundedBox>
        <RoundedBox args={[0.45, 0.13, 0.06]} radius={0.03} smoothness={3} position={[0, -0.22, 0.078]}>
          <Gunmetal />
        </RoundedBox>
      </ExplodingPart>

      {/* left/right head shells */}
      <ExplodingPart
        assembled={[-0.49, 1.4, -0.02]}
        exploded={[-1.5, 1.84, 0.25]}
        rotation={[0, -0.05, -0.025]}
        explodedRotation={[0.05, -0.34, -0.18]}
        explode={explode}
      >
        <RoundedBox args={[0.24, 1.05, 0.72]} radius={0.09} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[0.49, 1.4, -0.02]}
        exploded={[1.5, 1.84, 0.25]}
        rotation={[0, 0.05, 0.025]}
        explodedRotation={[0.05, 0.34, 0.18]}
        explode={explode}
      >
        <RoundedBox args={[0.24, 1.05, 0.72]} radius={0.09} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      {/* crown fins hint at a human hair silhouette without literal hair */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, index) => (
        <ExplodingPart
          key={x}
          assembled={[x, 2.03 - Math.abs(x) * 0.12, -0.05]}
          exploded={[x * 2.5, 2.85 + Math.abs(x) * 0.35, 0.38]}
          rotation={[0.08, x * 0.18, x * 0.22]}
          explodedRotation={[0.18, x * 0.65, x * 0.65]}
          explode={explode}
        >
          <RoundedBox args={[0.12, 0.5 + (index === 2 ? 0.08 : 0), 0.46]} radius={0.045} smoothness={3}>
            <Graphite roughness={0.2} />
          </RoundedBox>
        </ExplodingPart>
      ))}

      {/* chest inner frame */}
      <ExplodingPart assembled={[0, -0.72, 0]} exploded={[0, -0.42, -0.72]} explode={explode}>
        <RoundedBox args={[2.2, 1.3, 0.54]} radius={0.22} smoothness={5}>
          <Gunmetal />
        </RoundedBox>
      </ExplodingPart>

      {/* split chest plates */}
      <ExplodingPart
        assembled={[-0.58, -0.7, 0.36]}
        exploded={[-2.05, -0.48, 0.9]}
        rotation={[0.02, 0.08, -0.07]}
        explodedRotation={[0.04, -0.16, -0.24]}
        explode={explode}
      >
        <RoundedBox args={[0.98, 1.08, 0.18]} radius={0.12} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      <ExplodingPart
        assembled={[0.58, -0.7, 0.36]}
        exploded={[2.05, -0.48, 0.9]}
        rotation={[0.02, -0.08, 0.07]}
        explodedRotation={[0.04, 0.16, 0.24]}
        explode={explode}
      >
        <RoundedBox args={[0.98, 1.08, 0.18]} radius={0.12} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      {/* intelligence core */}
      <ExplodingPart assembled={[0, -0.62, 0.58]} exploded={[0, -0.25, 1.78]} explode={explode}>
        <mesh ref={core}>
          <octahedronGeometry args={[0.24, 2]} />
          <SignalRed strength={3.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.018, 12, 64]} />
          <Ivory />
        </mesh>
        <pointLight color="#ff3b28" intensity={5.5} distance={3.1} decay={2} />
      </ExplodingPart>

      {/* clavicle rails */}
      <ExplodingPart assembled={[-0.83, 0.0, 0.12]} exploded={[-1.88, 0.54, 0.5]} rotation={[0, 0, -0.34]} explode={explode}>
        <RoundedBox args={[0.12, 1.05, 0.13]} radius={0.04} smoothness={3}>
          <Ivory />
        </RoundedBox>
      </ExplodingPart>
      <ExplodingPart assembled={[0.83, 0.0, 0.12]} exploded={[1.88, 0.54, 0.5]} rotation={[0, 0, 0.34]} explode={explode}>
        <RoundedBox args={[0.12, 1.05, 0.13]} radius={0.04} smoothness={3}>
          <Ivory />
        </RoundedBox>
      </ExplodingPart>

      {/* shoulders */}
      <ExplodingPart
        assembled={[-1.42, -0.52, 0.02]}
        exploded={[-2.78, 0.05, 0.75]}
        rotation={[0, 0.06, -0.12]}
        explodedRotation={[0.1, 0.2, -0.35]}
        explode={explode}
      >
        <RoundedBox args={[0.72, 0.7, 0.6]} radius={0.18} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>
      <ExplodingPart
        assembled={[1.42, -0.52, 0.02]}
        exploded={[2.78, 0.05, 0.75]}
        rotation={[0, -0.06, 0.12]}
        explodedRotation={[0.1, -0.2, 0.35]}
        explode={explode}
      >
        <RoundedBox args={[0.72, 0.7, 0.6]} radius={0.18} smoothness={4}>
          <Graphite />
        </RoundedBox>
      </ExplodingPart>

      {/* four system modules, deliberately small so the sculpture stays primary */}
      {[
        [-1.15, -1.3, 0.18, -2.55, -1.22, 0.92],
        [-0.42, -1.45, 0.25, -1.15, -2.15, 1.15],
        [0.42, -1.45, 0.25, 1.15, -2.15, 1.15],
        [1.15, -1.3, 0.18, 2.55, -1.22, 0.92],
      ].map(([x, y, z, ex, ey, ez], index) => (
        <ExplodingPart
          key={index}
          assembled={[x, y, z] as Vec3}
          exploded={[ex, ey, ez] as Vec3}
          rotation={[0, 0, (index - 1.5) * 0.08]}
          explodedRotation={[0.12, (index - 1.5) * 0.22, (index - 1.5) * 0.2]}
          explode={explode}
        >
          <RoundedBox args={[0.42, 0.26, 0.3]} radius={0.07} smoothness={3}>
            {index === 1 ? <SignalRed strength={1.25} /> : index === 2 ? <Ivory /> : <Gunmetal />}
          </RoundedBox>
        </ExplodingPart>
      ))}
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
        shadows
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.12, 7.2], fov: 28, near: 0.1, far: 40 }}
      >
        <ambientLight intensity={1.9} />
        <directionalLight position={[-4, 5, 5]} intensity={5.2} color="#fff7eb" />
        <directionalLight position={[4, 2, 4]} intensity={2.8} color="#ffddd5" />
        <directionalLight position={[0, 3, -3]} intensity={3.1} color="#ffffff" />
        <EntityModel scrollProgress={scrollProgress} inspected={inspected} />
      </Canvas>

      <div className="tarun-entity3d__chrome" aria-hidden="true">
        <span>ENTITY / TS-01</span>
        <span>{inspected ? "EXPLODED / INSPECT" : "ASSEMBLED / HUMAN SYSTEM"}</span>
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
