"use client";

import { Suspense, useRef } from "react";
import { Bounds, Center, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";

const MODEL_PATH = "/models/tarun_hero_web.glb";

function ModelScene() {
  const group = useRef<Group>(null);
  const { pointer } = useThree();
  const gltf = useGLTF(MODEL_PATH);

  useFrame((state) => {
    if (!group.current) return;
    const targetY = pointer.x * 0.085;
    const targetX = -pointer.y * 0.04;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.11;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.11;
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.72) * 0.012 - 0.02;
  });

  return (
    <Bounds fit clip observe margin={1.08}>
      <Center>
        <group ref={group}>
          <primitive object={gltf.scene} />
        </group>
      </Center>
    </Bounds>
  );
}

export default function HeroModelCanvas() {
  return (
    <div className="heroModelCanvas" aria-label="Interactive 3D model of Tarun">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0.2, 4.5], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.05} />
        <directionalLight position={[-3, 4, 4]} intensity={3.2} color="#e9eef5" />
        <directionalLight position={[4, 1, 3]} intensity={1.35} color="#ffd8bf" />
        <directionalLight position={[1, 4, -4]} intensity={2.1} color="#8fa3c0" />
        <Suspense fallback={null}>
          <ModelScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
