"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform vec2 uClick;
uniform float uTime;
uniform float uMouseStrength;
uniform float uClickAge;

const float PI = 3.141592653589793;

vec3 silver() { return vec3(0.914, 0.933, 0.961); }
vec3 steel()  { return vec3(0.561, 0.639, 0.753); }
vec3 slate()  { return vec3(0.231, 0.290, 0.400); }

vec3 palette(float t) {
  t = fract(t);
  if (t < 0.23) return mix(silver(), steel(), smoothstep(0.0, 0.23, t));
  if (t < 0.49) return mix(steel(), slate(), smoothstep(0.23, 0.49, t));
  if (t < 0.73) return mix(slate(), steel(), smoothstep(0.49, 0.73, t));
  return mix(steel(), silver(), smoothstep(0.73, 1.0, t));
}

float ripple(vec2 uv, vec2 origin, float phase, float falloff) {
  vec2 p = uv - origin;
  p.x *= uResolution.x / max(uResolution.y, 1.0);
  float d = length(p);
  return sin(d * 50.0 - phase) * exp(-d * falloff);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  float mouseWave = ripple(uv, uMouse, uTime * 7.0, 5.4) * uMouseStrength;
  float clickMask = exp(-max(uClickAge, 0.0) * 1.45);
  float clickWave = ripple(uv, uClick, uClickAge * 10.0, 4.2) * clickMask;

  vec2 distorted = uv;
  vec2 mouseDir = normalize((uv - uMouse) + vec2(0.0001));
  vec2 clickDir = normalize((uv - uClick) + vec2(0.0001));
  distorted += mouseDir * mouseWave * 0.020;
  distorted += clickDir * clickWave * 0.034;

  vec2 center = vec2(0.46, 0.45);
  vec2 p = distorted - center;
  p.x *= uResolution.x / max(uResolution.y, 1.0);

  float ph = uTime * 0.25;
  float spin = ph * -1.0;
  float degrees = 159.0 + spin * 60.0 * 0.29;
  float base = radians(degrees);

  float a = atan(p.y, p.x) - base;
  float sweep = fract(a / (2.0 * PI) + 1.0);

  float micro = sin((p.x + p.y) * 18.0 + uTime * 0.25) * 0.004;
  vec3 color = palette(sweep + micro + mouseWave * 0.050 + clickWave * 0.070);

  float radial = distance(distorted, vec2(0.5));
  float vignette = smoothstep(0.52, 0.9, radial);
  color *= 1.0 - vignette * 0.08;

  float spec = pow(max(0.0, 1.0 - length(uv - uMouse) * 2.0), 3.0);
  color += spec * uMouseStrength * 0.11;

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function LiquidOrbitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "uResolution");
    const mouseLoc = gl.getUniformLocation(program, "uMouse");
    const clickLoc = gl.getUniformLocation(program, "uClick");
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const strengthLoc = gl.getUniformLocation(program, "uMouseStrength");
    const clickAgeLoc = gl.getUniformLocation(program, "uClickAge");

    const mouse = { x: 0.5, y: 0.5 };
    const click = { x: 0.5, y: 0.5, at: -100 };
    let strength = 0;
    let targetStrength = 0;
    let previous = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let previousAt = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const excludedAt = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      return Boolean(el?.closest("[data-liquid-exclude]"));
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      mouse.x = (event.clientX - rect.left) / rect.width;
      mouse.y = 1 - (event.clientY - rect.top) / rect.height;

      const now = performance.now();
      const dt = Math.max(8, now - previousAt);
      const velocity =
        Math.hypot(event.clientX - previous.x, event.clientY - previous.y) / dt;

      targetStrength = excludedAt(event.clientX, event.clientY)
        ? 0
        : Math.min(1, velocity * 1.4 + 0.22);

      previous = { x: event.clientX, y: event.clientY };
      previousAt = now;
    };

    const clickHandler = (event: PointerEvent) => {
      if (excludedAt(event.clientX, event.clientY)) return;
      const rect = canvas.getBoundingClientRect();
      click.x = (event.clientX - rect.left) / rect.width;
      click.y = 1 - (event.clientY - rect.top) / rect.height;
      click.at = performance.now() / 1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", clickHandler, { passive: true });
    resize();

    let raf = 0;
    const started = performance.now();

    const draw = (nowMs: number) => {
      const time = (nowMs - started) / 1000;
      const clickAge = nowMs / 1000 - click.at;

      targetStrength *= 0.972;
      strength += (targetStrength - strength) * 0.11;

      gl.useProgram(program);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouse.x, mouse.y);
      gl.uniform2f(clickLoc, click.x, click.y);
      gl.uniform1f(timeLoc, time);
      gl.uniform1f(strengthLoc, strength);
      gl.uniform1f(clickAgeLoc, clickAge);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", clickHandler);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquidOrbitCanvas" aria-hidden="true" />;
}
