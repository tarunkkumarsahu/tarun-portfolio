"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera, type Group } from "three";

const MODEL_PATH = "/models/tarun_hero_web.glb";

// Values exported with the final Blender hero. The asset is a front-optimized
// relief, so we preserve its authored camera and keep interaction deliberately
// restrained instead of treating it like a 360-degree character.
const CAMERA_POSITION = [-0.02230785, 0.18909504, 2.08321691] as const;
const CAMERA_QUATERNION = [
  -0.04375459,
  -0.00057454,
  -0.01311701,
  0.99895602,
] as const;
const BASE_FOV = 31.9423017;
const PROJECTION_OFFSET = [-0.01924867, -0.07713816] as const;

// Bounds of the exported front relief. Rotating around this point keeps the
// face/laptop composition anchored while the mouse supplies a small parallax.
const MODEL_CENTER = [-0.0264088, -0.0386458, 0.14690975] as const;
const MAX_YAW = MathUtils.degToRad(3.2);
const MAX_PITCH = MathUtils.degToRad(2.2);

function ModelScene() {
  const pivot = useRef<Group>(null);
  const reducedMotion = useRef(false);
  const { pointer, camera, size } = useThree();
  const gltf = useGLTF(MODEL_PATH);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => {
      reducedMotion.current = query.matches;
    };
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;

    camera.position.set(...CAMERA_POSITION);
    camera.quaternion.set(...CAMERA_QUATERNION);
    camera.near = 0.01;
    camera.far = 100;

    // The authored projection is square. On narrower hero containers, increase
    // vertical FOV just enough to preserve the same horizontal crop.
    const aspect = Math.max(0.25, size.width / Math.max(1, size.height));
    const baseTan = Math.tan(MathUtils.degToRad(BASE_FOV) / 2) * 1.035;
    const framedTan = aspect < 1 ? baseTan / aspect : baseTan;
    camera.fov = MathUtils.radToDeg(2 * Math.atan(framedTan));
    camera.aspect = aspect;

    const width = Math.max(1, size.width);
    const height = Math.max(1, size.height);
    camera.setViewOffset(
      width,
      height,
      (PROJECTION_OFFSET[0] * width) / 2,
      (-PROJECTION_OFFSET[1] * height) / 2,
      width,
      height,
    );
    camera.updateProjectionMatrix();

    return () => camera.clearViewOffset();
  }, [camera, size.height, size.width]);

  useFrame((state) => {
    const node = pivot.current;
    if (!node) return;

    const reduced = reducedMotion.current;
    const targetY = reduced ? 0 : MathUtils.clamp(pointer.x, -1, 1) * MAX_YAW;
    const targetX = reduced ? 0 : -MathUtils.clamp(pointer.y, -1, 1) * MAX_PITCH;

    node.rotation.y += (targetY - node.rotation.y) * 0.075;
    node.rotation.x += (targetX - node.rotation.x) * 0.075;

    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.68) * 0.0045;
    node.position.set(
      MODEL_CENTER[0],
      MODEL_CENTER[1] + idle,
      MODEL_CENTER[2],
    );
  });

  return (
    <group ref={pivot} position={MODEL_CENTER}>
      <group
        position={[-MODEL_CENTER[0], -MODEL_CENTER[1], -MODEL_CENTER[2]]}
      >
        <primitive object={gltf.scene} />
      </group>
    </group>
  );
}

export default function HeroModelCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const [active, setActive] = useState(true);
  const [compactGpu, setCompactGpu] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const coarse = window.matchMedia("(pointer: coarse)");
    const compact = window.matchMedia("(max-width: 760px)");
    const readDevice = () => setCompactGpu(coarse.matches || compact.matches);
    readDevice();
    coarse.addEventListener("change", readDevice);
    compact.addEventListener("change", readDevice);

    const syncActivity = () => setActive(inView.current && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        syncActivity();
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );
    observer.observe(host);
    document.addEventListener("visibilitychange", syncActivity);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncActivity);
      coarse.removeEventListener("change", readDevice);
      compact.removeEventListener("change", readDevice);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="heroModelCanvas"
      aria-label="Interactive 3D model of Tarun"
    >
      <Canvas
        flat
        frameloop={active ? "always" : "never"}
        dpr={compactGpu ? [1, 1.15] : [1, 1.35]}
        camera={{
          position: [...CAMERA_POSITION],
          fov: BASE_FOV,
          near: 0.01,
          far: 100,
        }}
        gl={{
          antialias: !compactGpu,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Most visible lighting is already baked into the reference-derived
            base color. Keep web relighting quiet so the face stays faithful. */}
        <ambientLight intensity={0.92} />
        <directionalLight
          position={[-3, 4, 4]}
          intensity={0.34}
          color="#f3f0e8"
        />
        <directionalLight
          position={[3, 1.4, 3]}
          intensity={0.12}
          color="#ffd8bf"
        />
        <Suspense fallback={null}>
          <ModelScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
