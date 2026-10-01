"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  phase: number;
  alpha: number;
};

export function MagicTextReveal({
  text,
  className = "",
  fontSize = 88,
}: {
  text: string;
  className?: string;
  fontSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let raf = 0;
    let hovered = false;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const off = document.createElement("canvas");
      off.width = canvas.width;
      off.height = canvas.height;
      const o = off.getContext("2d");
      if (!o) return;

      o.scale(dpr, dpr);
      o.fillStyle = "#f2efe8";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = `700 ${Math.min(fontSize, rect.width * 0.11)}px Arial, sans-serif`;
      o.fillText(text, rect.width / 2, rect.height / 2);

      const image = o.getImageData(0, 0, off.width, off.height);
      const next: Dot[] = [];
      const step = Math.max(4, Math.round(6 * dpr));

      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const alpha = image.data[(y * off.width + x) * 4 + 3];
          if (alpha > 80) {
            const tx = x / dpr;
            const ty = y / dpr;
            const angle = ((x * 0.17 + y * 0.11) % 6.28);
            const spread = 22 + ((x + y) % 28);
            next.push({
              tx,
              ty,
              x: tx + Math.cos(angle) * spread,
              y: ty + Math.sin(angle) * spread,
              phase: angle,
              alpha: 0.12 + (alpha / 255) * 0.5,
            });
          }
        }
      }
      dots = next;
    };

    const enter = () => {
      hovered = true;
    };
    const leave = () => {
      hovered = false;
    };

    wrap.addEventListener("pointerenter", enter);
    wrap.addEventListener("pointerleave", leave);
    window.addEventListener("resize", build);
    build();

    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const rect = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      ctx.save();
      ctx.scale(dpr, dpr);

      for (const dot of dots) {
        const floatX = Math.sin(t * 0.9 + dot.phase * 3.1) * 8;
        const floatY = Math.cos(t * 0.7 + dot.phase * 2.2) * 5;
        const targetX = hovered ? dot.tx : dot.tx + floatX;
        const targetY = hovered ? dot.ty : dot.ty + floatY;
        dot.x += (targetX - dot.x) * (hovered ? 0.16 : 0.045);
        dot.y += (targetY - dot.y) * (hovered ? 0.16 : 0.045);

        ctx.fillStyle = `rgba(242,239,232,${hovered ? 0.82 : dot.alpha})`;
        ctx.fillRect(dot.x, dot.y, hovered ? 1.35 : 1, hovered ? 1.35 : 1);
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointerenter", enter);
      wrap.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", build);
    };
  }, [fontSize, text]);

  return (
    <div ref={wrapRef} className={`magicTextReveal ${className}`} data-liquid-exclude>
      <canvas ref={canvasRef} />
      <span className="srOnly">{text}</span>
    </div>
  );
}
