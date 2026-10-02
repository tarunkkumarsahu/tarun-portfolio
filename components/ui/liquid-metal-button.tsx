"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: "text" | "icon";
  icon?: "sparkles" | "arrow";
  ariaLabel?: string;
}

export function LiquidMetalButton({
  label = "Get Started",
  onClick,
  viewMode = "text",
  icon = "sparkles",
  ariaLabel,
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const dimensions = useMemo(
    () =>
      viewMode === "icon"
        ? {
            width: 46,
            height: 46,
            innerWidth: 42,
            innerHeight: 42,
            shaderWidth: 46,
            shaderHeight: 46,
          }
        : {
            width: 168,
            height: 48,
            innerWidth: 164,
            innerHeight: 44,
            shaderWidth: 168,
            shaderHeight: 48,
          },
    [viewMode],
  );

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          border-radius: 100px !important;
        }
        @keyframes ripple-animation {
          0% { transform: translate(-50%, -50%) scale(0); opacity: .62; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    try {
      if (shaderRef.current) {
        shaderMount.current?.destroy?.();
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6,
        );
      }
    } catch (error) {
      console.error("Liquid metal shader failed to mount:", error);
    }

    return () => {
      shaderMount.current?.destroy?.();
      shaderMount.current = null;
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    shaderMount.current?.setSpeed?.(2.4);
    window.setTimeout(
      () => shaderMount.current?.setSpeed?.(isHovered ? 1 : 0.6),
      300,
    );

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const ripple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: rippleId.current++,
      };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(
        () => setRipples((prev) => prev.filter((item) => item.id !== ripple.id)),
        600,
      );
    }

    onClick?.();
  };

  return (
    <div className="liquidMetalButton" data-cursor-hot>
      <div
        className="liquidMetalPerspective"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <div className="liquidMetalLabel" aria-hidden="true">
          {viewMode === "icon" ? (
            icon === "arrow" ? <ArrowUpRight size={16} /> : <Sparkles size={16} />
          ) : (
            <span>{label}</span>
          )}
        </div>

        <div
          className="liquidMetalInner"
          style={{
            width: dimensions.innerWidth,
            height: dimensions.innerHeight,
            transform: isPressed
              ? "translateZ(10px) translateY(1px) scale(.98)"
              : "translateZ(10px)",
          }}
        />

        <div
          className="liquidMetalShaderShell"
          style={{
            width: dimensions.shaderWidth,
            height: dimensions.shaderHeight,
            transform: isPressed
              ? "translateZ(0) translateY(1px) scale(.98)"
              : "translateZ(0)",
            boxShadow: isHovered
              ? "0 18px 35px rgba(0,0,0,.22)"
              : "0 9px 24px rgba(0,0,0,.16)",
          }}
        >
          <div
            ref={shaderRef}
            className="shader-container-exploded"
            style={{
              width: dimensions.shaderWidth,
              height: dimensions.shaderHeight,
            }}
          />
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="liquidMetalHitbox"
          style={{ width: dimensions.width, height: dimensions.height }}
          onClick={handleClick}
          onMouseEnter={() => {
            setIsHovered(true);
            shaderMount.current?.setSpeed?.(1);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
            shaderMount.current?.setSpeed?.(0.6);
          }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          aria-label={ariaLabel ?? label}
        >
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="liquidMetalRipple"
              style={{ left: ripple.x, top: ripple.y }}
            />
          ))}
        </button>
      </div>
    </div>
  );
}
