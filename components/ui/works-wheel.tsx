"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  title: string;
  image: string;
  href?: string;
  description?: string;
  meta?: string;
}

export interface WorksWheelProps
  extends Omit<React.ComponentPropsWithoutRef<"section">, "children"> {
  items: WorksWheelItem[];
  label?: string;
  action?: string;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const STEP = 40;
const WHEEL_UNITS = 880;
const DRAG_UNITS = 420;
const SETTLE = 130;
const EASE = 0.2;

export function WorksWheel({
  items,
  label = "SELECTED SYSTEMS",
  action = "OPEN SYSTEM",
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const centerLabelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const target = React.useRef(0);
  const turn = React.useRef(0);
  const dragY = React.useRef<number | null>(null);
  const settling = React.useRef<number | null>(null);
  const [active, setActive] = React.useState(0);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const [reduced, setReduced] = React.useState(false);
  const visibleRef = React.useRef(false);

  React.useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    read();

    const ro = new ResizeObserver(read);
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "35% 0px", threshold: 0 },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const metrics = React.useMemo(() => {
    const cardW = Math.min(size.h * 0.39 * 1.45, size.w * 0.34);
    const cardH = cardW / 1.45;
    const drumR = cardH * 2.2;
    const ringR = cardH * 1.12;
    const depth = cardH * 2.75;
    const ringScale = items.length
      ? clamp((((2 * Math.PI * ringR) / items.length) * 0.82) / (cardW || 1), 0.18, 1)
      : 1;

    return { cardW, cardH, drumR, ringR, depth, ringScale };
  }, [size, items.length]);

  const goTo = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, items.length);
    },
    [items.length],
  );

  React.useEffect(() => {
    if (!size.h) return;

    let frame = 0;
    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visibleRef.current) return;

      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const morph = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-morph * metrics.drumR}px)`;
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const d = index - pos;
        const ringDeg = d * (360 / Math.max(items.length, 1));
        const drumDeg = d * STEP;
        const bow = -metrics.cardH * 1.8 * (1 - Math.cos((drumDeg * Math.PI) / 180));

        const drumTransform =
          `translateX(${bow}px) rotateX(${drumDeg}deg) translateZ(${metrics.drumR}px)`;

        card.style.transform =
          morph < 1
            ? `rotateZ(${(1 - morph) * ringDeg}deg) translateY(${-(1 - morph) * metrics.ringR}px) translateX(${morph * bow}px) rotateX(${morph * drumDeg}deg) translateZ(${morph * metrics.drumR}px)`
            : drumTransform;

        card.style.opacity =
          morph > 0.52 && Math.abs(d) > 1.65 ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 3));

        const face = card.firstElementChild as HTMLElement | null;
        if (face) {
          face.style.transform = `scale(${lerp(metrics.ringScale, 1, morph)})`;
        }
      });

      if (centerLabelRef.current) {
        centerLabelRef.current.style.opacity = String(1 - morph);
        centerLabelRef.current.style.transform = `scale(${1 - morph * 0.12})`;
      }

      const nearest = clamp(Math.round(pos), 0, Math.max(0, items.length - 1));
      setActive((current) => (current === nearest ? current : nearest));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [items.length, metrics, reduced, size.h]);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < items.length) event.preventDefault();
      goTo(next);

      if (settling.current) clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => goTo(Math.round(target.current)),
        SETTLE,
      );
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (settling.current) clearTimeout(settling.current);
    };
  }, [goTo, items.length]);

  const current = items[active];

  return (
    <section className={cn("worksWheel", className)} {...props}>
      <div
        ref={stageRef}
        className="worksWheelStage"
        tabIndex={0}
        role="listbox"
        aria-label={label}
        onPointerDown={(event) => {
          dragY.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragY.current === null) return;
          goTo(target.current + (dragY.current - event.clientY) / DRAG_UNITS);
          dragY.current = event.clientY;
        }}
        onPointerUp={() => {
          dragY.current = null;
          goTo(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") goTo(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") goTo(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
        style={{ perspective: metrics.depth }}
      >
        <div ref={wheelRef} className="worksWheelRotor">
          {items.map((item, index) => {
            return (
              <a
                key={item.title}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[index] = node;
                }}
                href={item.href ?? "#"}
                target={item.href ? "_blank" : undefined}
                rel={item.href ? "noreferrer" : undefined}
                onClick={(event) => {
                  if (!item.href) event.preventDefault();
                }}
                role="option"
                aria-selected={index === active}
                className="worksWheelCard"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
                data-cursor-hot
              >
                <span className="worksWheelFace">
                  <img src={item.image} alt="" draggable={false} />
                  <span className="worksWheelScan" />
                  <small>{item.meta ?? `SYS / ${String(index + 1).padStart(2, "0")}`}</small>
                  {item.href ? <b>{action} ↗</b> : null}
                </span>
              </a>
            );
          })}
        </div>

        <div ref={centerLabelRef} className="worksWheelCenterLabel">
          <span>{label}</span>
          <small>SCROLL / DRAG TO OPEN</small>
        </div>

        <div className="worksWheelActiveCopy">
          <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          <h3>{current?.title}</h3>
          <p>{current?.description}</p>
        </div>

        <ol className="worksWheelIndex">
          {items.map((item, index) => (
            <li key={item.title}>
              <button
                type="button"
                className={index === active ? "active" : ""}
                onClick={() => goTo(index + 1)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default WorksWheel;
