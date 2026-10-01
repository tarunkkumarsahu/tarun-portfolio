"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Node = {
  angle: number;
  radius: number;
  depth: number;
  phase: number;
};

export function IntroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [boot, setBoot] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const started = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const value = Math.min(100, Math.floor((elapsed / 1850) * 100));
      setBoot(value);
      if (value >= 100) {
        setReady(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      progressRef.current = Math.min(1, Math.max(0, -rect.top / travel));
      section.style.setProperty("--intro-progress", String(progressRef.current));
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes: Node[] = Array.from({ length: 86 }, (_, i) => ({
      angle: ((i * 137.5) % 360) * (Math.PI / 180),
      radius: 0.16 + ((i * 29) % 100) / 100 * 0.84,
      depth: ((i * 47) % 100) / 100,
      phase: ((i * 13) % 100) / 100,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const min = Math.min(w, h);
      const t = (now - start) / 1000;
      const scroll = progressRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const tunnelShift = scroll * 2.8 + t * 0.035;
      const projected: Array<{ x: number; y: number; a: number; size: number }> = [];

      for (const node of nodes) {
        const z = (node.depth + tunnelShift) % 1;
        const perspective = 0.08 + z * z * 1.28;
        const wobble = Math.sin(t * 0.7 + node.phase * 9.0) * 0.03;
        const r = node.radius * min * perspective;
        const a = node.angle + wobble + scroll * 0.18;
        projected.push({
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r * 0.62,
          a: 0.12 + z * 0.72,
          size: 0.7 + z * 2.5,
        });
      }

      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        for (let j = i + 1; j < Math.min(projected.length, i + 8); j++) {
          const q = projected[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < min * 0.18) {
            const alpha = (1 - d / (min * 0.18)) * 0.16 * Math.min(p.a, q.a);
            ctx.strokeStyle = `rgba(160,190,218,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const pulse = 0.5 + 0.5 * Math.sin(t * 3.0 + i * 0.73 - scroll * 14);
        ctx.fillStyle = `rgba(214,231,245,${p.a * (0.35 + pulse * 0.65)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.7 + pulse * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      const core = Math.max(0, (scroll - 0.66) / 0.34);
      if (core > 0) {
        const radius = 8 + core * min * 0.18;
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grd.addColorStop(0, `rgba(240,246,255,${0.98 * core})`);
        grd.addColorStop(0.18, `rgba(143,163,192,${0.72 * core})`);
        grd.addColorStop(1, "rgba(59,74,102,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [ready]);

  return (
    <section ref={sectionRef} className={`introExperience ${ready ? "isReady" : ""}`}>
      <div className="introSticky">
        <canvas ref={canvasRef} className="neuralTunnel" aria-hidden="true" />

        <div className="loaderScene" aria-hidden={ready}>
          <div className="loaderOrbit" style={{ "--boot": boot } as CSSProperties}>
            <div
              className="runnerOrbit"
              style={{ transform: `rotate(${boot * 3.6}deg)` }}
            >
              <svg viewBox="0 0 28 28" className="runnerGlyph" aria-hidden="true">
                <circle cx="16" cy="5" r="2.4" fill="currentColor" />
                <path d="M14.2 8.3 11 13.2l4.1 2.2 2.1-4.4 3.1 2.8M14.6 15.4l-4.8 6.2M15.1 15.1l5.1 5.6M11.2 12.8 7.6 15" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="loaderMark">
              <span />
              <strong>{String(boot).padStart(2, "0")}%</strong>
              <span />
            </div>
          </div>
        </div>

        <div className="introHud">
          <span>TS / 00</span>
          <span className="introScroll">SCROLL ↓</span>
        </div>
      </div>
    </section>
  );
}
