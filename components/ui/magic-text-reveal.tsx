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
    let visible = false;
    let hovered = false;
    let pointer = { x: -9999, y: -9999 };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
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
      const displayFont =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--font-display")
          .trim() || "Arial";
      o.font = `700 ${Math.min(fontSize, rect.width * 0.11)}px ${displayFont}, Arial, sans-serif`;
      o.fillText(text, rect.width / 2, rect.height / 2);

      const image = o.getImageData(0, 0, off.width, off.height);
      const next: Dot[] = [];
      const step = Math.max(4, Math.round(6 * dpr));

      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          const alpha = image.data[(y * off.width + x) * 4 + 3];
          if (alpha <= 80) continue;

          const tx = x / dpr;
          const ty = y / dpr;
          const angle = (x * 0.17 + y * 0.11) % 6.28;
          const spread = 26 + ((x + y) % 34);

          next.push({
            tx,
            ty,
            x: tx + Math.cos(angle) * spread,
            y: ty + Math.sin(angle) * spread,
            phase: angle,
            alpha: 0.14 + (alpha / 255) * 0.55,
          });
        }
      }

      dots = next;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.34 },
    );
    observer.observe(wrap);

    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
      pointer = { x: -9999, y: -9999 };
    };
    const onMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    wrap.addEventListener("pointermove", onMove);
    addEventListener("resize", build);

    build();

    const start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      for (const dot of dots) {
        const floatX = Math.sin(t * 0.8 + dot.phase * 3.1) * 12;
        const floatY = Math.cos(t * 0.65 + dot.phase * 2.2) * 7;

        let targetX = visible ? dot.tx : dot.tx + floatX * 3.2;
        let targetY = visible ? dot.ty : dot.ty + floatY * 3.2;

        if (visible && !hovered) {
          targetX += floatX * 0.16;
          targetY += floatY * 0.16;
        }

        if (hovered) {
          const dx = dot.tx - pointer.x;
          const dy = dot.ty - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 115) {
            const force = (115 - distance) / 115;
            const safe = Math.max(distance, 1);
            targetX += (dx / safe) * force * 18;
            targetY += (dy / safe) * force * 18;
          }
        }

        const ease = visible ? 0.13 : 0.04;
        dot.x += (targetX - dot.x) * ease;
        dot.y += (targetY - dot.y) * ease;

        ctx.fillStyle = `rgba(242,239,232,${visible ? 0.82 : dot.alpha})`;
        const size = visible ? 1.25 : 1;
        ctx.fillRect(dot.x, dot.y, size, size);
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointermove", onMove);
      removeEventListener("resize", build);
    };
  }, [fontSize, text]);

  return (
    <div ref={wrapRef} className={`magicTextReveal ${className}`} data-liquid-exclude>
      <canvas ref={canvasRef} />
      <span className="srOnly">{text}</span>
    </div>
  );
}
