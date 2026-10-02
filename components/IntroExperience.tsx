"use client";

import { useEffect, useRef, useState } from "react";

type Node = {
  angle: number;
  radius: number;
  depth: number;
  phase: number;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export function IntroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [introDone, setIntroDone] = useState(false);

  // Phase 1: autoplay illustrated push intro.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-push-active");

    let raf = 0;
    const started = performance.now();
    const duration = 3600;

    const drawIntro = (now: number) => {
      const t = clamp((now - started) / duration);

      // Hold briefly, then push across the screen, then collapse away.
      const push = clamp((t - 0.08) / 0.66);
      const exit = clamp((t - 0.78) / 0.22);
      const stride = Math.sin(push * Math.PI * 12);
      const edge = 28 + push * 50 + exit * 24;
      const bob = (1 - exit) * stride * 5;
      const rotate = -3 + stride * 1.1 + exit * 5;
      const nameOpacity = clamp((t - 0.16) / 0.18) * (1 - exit * 0.55);
      const characterOpacity = clamp(1 - exit * 1.45);
      const overlayOpacity = clamp(1 - (t - 0.93) / 0.07);

      section.style.setProperty("--auto-edge", `${edge}%`);
      section.style.setProperty("--auto-boy-y", `${bob}px`);
      section.style.setProperty("--auto-boy-rotate", `${rotate}deg`);
      section.style.setProperty("--auto-boy-opacity", String(characterOpacity));
      section.style.setProperty("--auto-name-opacity", String(nameOpacity));
      section.style.setProperty("--auto-overlay-opacity", String(overlayOpacity));
      section.style.setProperty("--auto-progress", String(t));

      if (t < 1) {
        raf = requestAnimationFrame(drawIntro);
      } else {
        document.body.style.overflow = previousOverflow;
        document.body.classList.remove("intro-push-active");
        setIntroDone(true);
      }
    };

    raf = requestAnimationFrame(drawIntro);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("intro-push-active");
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("neural-entry-active", entry.isIntersecting);
      },
      { threshold: 0.02 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove("neural-entry-active");
    };
  }, []);

  // Phase 2: scroll drives the neuron/computer tunnel.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !introDone) return;

    const read = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / travel);
      progressRef.current = progress;
      section.style.setProperty("--neural-progress", String(progress));
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);

    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes: Node[] = Array.from({ length: 92 }, (_, i) => ({
      angle: ((i * 137.5) % 360) * (Math.PI / 180),
      radius: 0.14 + (((i * 29) % 100) / 100) * 0.86,
      depth: ((i * 47) % 100) / 100,
      phase: ((i * 13) % 100) / 100,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const started = performance.now();

    const draw = (now: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const min = Math.min(w, h);
      const time = (now - started) / 1000;
      const scroll = progressRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const tunnelShift = scroll * 3.1 + time * 0.028;
      const projected: Array<{ x: number; y: number; a: number; size: number }> = [];

      for (const node of nodes) {
        const z = (node.depth + tunnelShift) % 1;
        const perspective = 0.07 + z * z * 1.34;
        const wobble = Math.sin(time * 0.7 + node.phase * 9) * 0.026;
        const radius = node.radius * min * perspective;
        const angle = node.angle + wobble + scroll * 0.22;

        projected.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius * 0.62,
          a: 0.1 + z * 0.76,
          size: 0.65 + z * 2.65,
        });
      }

      ctx.lineWidth = 0.72;
      for (let i = 0; i < projected.length; i += 1) {
        const p = projected[i];
        for (let j = i + 1; j < Math.min(projected.length, i + 8); j += 1) {
          const q = projected[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < min * 0.175) {
            const alpha =
              (1 - distance / (min * 0.175)) *
              0.16 *
              Math.min(p.a, q.a);
            ctx.strokeStyle = `rgba(160,190,218,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i += 1) {
        const p = projected[i];
        const pulse = 0.5 + 0.5 * Math.sin(time * 3 + i * 0.73 - scroll * 14);
        ctx.fillStyle = `rgba(214,231,245,${p.a * (0.34 + pulse * 0.66)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.7 + pulse * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      const core = clamp((scroll - 0.58) / 0.42);
      if (core > 0) {
        const radius = 8 + core * min * 0.19;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `rgba(240,246,255,${0.98 * core})`);
        gradient.addColorStop(0.18, `rgba(143,163,192,${0.72 * core})`);
        gradient.addColorStop(1, "rgba(59,74,102,0)");
        ctx.fillStyle = gradient;
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
  }, [introDone]);

  return (
    <section
      ref={sectionRef}
      className={`introExperience introExperienceV3 ${introDone ? "introAutoDone" : ""}`}
    >
      <div className="introSticky neuralSticky">
        <canvas ref={canvasRef} className="neuralTunnel neuralTunnelV3" aria-hidden="true" />

        <div className="neuralHud">
          <span>COMPUTER / NERVOUS SYSTEM</span>
          <span>SCROLL TO ENTER ↓</span>
        </div>

        <div className="neuralCoreCopy" aria-hidden="true">
          <span>INPUT</span>
          <i />
          <span>CONTEXT</span>
          <i />
          <span>ACTION</span>
        </div>
      </div>

      <div className="autoPushIntro" aria-hidden={introDone}>
        <div className="autoPushBlack" />

        <div className="autoPushWhite">
          <div className="autoPushType">
            <span>TARUN</span>
            <strong>SAHU</strong>
          </div>

          <div className="autoPushMeta">
            <span>SOFTWARE / AI / SYSTEMS</span>
            <span>PORTFOLIO / 2026</span>
          </div>
        </div>

        <div className="autoPushDivider"><i /></div>

        <div className="autoPushBoy">
          <img src="/assets/tarun-push.svg" alt="" draggable={false} />
          <span className="pushMotionLine pushMotionLineA" />
          <span className="pushMotionLine pushMotionLineB" />
        </div>

        <div className="autoPushHud">
          <span>TARUN KUMAR SAHU</span>
          <span>OPENING SEQUENCE</span>
        </div>
      </div>
    </section>
  );
}
