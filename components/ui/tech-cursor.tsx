"use client";

import { useEffect, useRef } from "react";

type IconAsset = {
  name: string;
  src: string;
  image: HTMLImageElement;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  image: HTMLImageElement;
};

const ICONS = [
  {
    name: "JavaScript",
    src: "https://cdn.21st.dev/assets/mirror/c1/c16e56a3018fdec5e1a5f81b8c9c78916461f27d3cacb9bdf01c5db6dd987bc0.png",
  },
  {
    name: "TypeScript",
    src: "https://cdn.21st.dev/assets/mirror/54/543879830b5fbeb29965638f83f6e8ddfbe5e2b56f4305d3461ab4f564570ef5.png",
  },
  {
    name: "React",
    src: "https://cdn.21st.dev/assets/mirror/08/08fe52f4ff4229461a6bd00e48e3da81d5b952ccb15d2ad80c01027d3813738f.svg",
  },
  {
    name: "Next.js",
    src: "https://cdn.21st.dev/assets/mirror/55/55995dfad6ecb4945a1e856ddca03c5e16aa5bf13fd21b4df6a74ae79357bcfc.svg",
  },
  {
    name: "HTML",
    src: "https://cdn.21st.dev/assets/mirror/34/347bbc1b9f5fa6cb9473536ba3d46e9ec837371d51092901fb0b353ff2f2f73a.png",
  },
  {
    name: "CSS",
    src: "https://cdn.21st.dev/assets/mirror/55/55478d6aec55c04103523a45a2731c49f8fa0b3b704c017cba1a63ea2bd6e86c.png",
  },
] as const;

export function TechIconTrail({
  selector = "#system,#workstation",
}: {
  selector?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastSpawn = 0;
    let lastX = 0;
    let lastY = 0;
    const particles: Particle[] = [];
    let assets: IconAsset[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const load = async () => {
      assets = (
        await Promise.all(
          ICONS.map(
            ({ name, src }) =>
              new Promise<IconAsset | null>((resolve) => {
                const image = new Image();
                image.crossOrigin = "anonymous";
                image.onload = () => resolve({ name, src, image });
                image.onerror = () => resolve(null);
                image.src = src;
              }),
          ),
        )
      ).filter(Boolean) as IconAsset[];
    };

    const move = (event: PointerEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY);
      if (!target?.closest(selector) || assets.length === 0) {
        lastX = event.clientX;
        lastY = event.clientY;
        return;
      }

      const speed = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      const now = performance.now();
      const delay = Math.max(42, 120 - speed * 3.5);

      if (speed > 3 && now - lastSpawn > delay && particles.length < 28) {
        const asset = assets[Math.floor(Math.random() * assets.length)];
        particles.push({
          x: event.clientX,
          y: event.clientY,
          vx: (Math.random() - 0.5) * 0.55,
          vy: -0.35 - Math.random() * 0.45,
          alpha: 0.72,
          size: 17 + Math.random() * 9,
          image: asset.image,
        });
        lastSpawn = now;
      }

      lastX = event.clientX;
      lastY = event.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.018;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.drawImage(p.image, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    load();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, [selector]);

  return <canvas ref={canvasRef} className="techIconTrailCanvas" aria-hidden="true" />;
}
