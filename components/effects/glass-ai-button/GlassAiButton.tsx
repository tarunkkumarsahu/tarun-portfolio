import { useEffect, useRef, useState, type CSSProperties } from "react";

import sourceDocument from "./sources/glass-ai-button.html?raw";

export type GlassAiButtonProps = {
  className?: string;
  style?: CSSProperties;
  onActivate?: () => void;
};

const PORTFOLIO_SOURCE_DOCUMENT = sourceDocument
  .split("GPT 6 Sol").join("TAP HERE")
  .replace(
    "</body>",
    `<script>
      document.getElementById("activate")?.addEventListener("click", () => {
        parent.postMessage({
          source: "threeui-glass-ai-button",
          type: "threeui-glass-activate"
        }, "*");
      });
    <\/script></body>`,
  );

export function GlassAiButton({
  className = "",
  style,
  onActivate,
}: GlassAiButtonProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [documentVisible, setDocumentVisible] = useState(() => (
    typeof document === "undefined" || !document.hidden
  ));
  const [hostVisible, setHostVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setHostVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setHostVisible(entry?.isIntersecting ?? true);
    }, { rootMargin: "80px" });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const update = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!onActivate) return undefined;

    const onMessage = (event: MessageEvent) => {
      if (event.data?.source !== "threeui-glass-ai-button") return;
      if (event.data?.type !== "threeui-glass-activate") return;
      onActivate();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onActivate]);

  const mounted = hostVisible && documentVisible;

  useEffect(() => {
    setReady(false);
  }, [mounted]);

  return (
    <div
      ref={hostRef}
      className={`threeui-background glass-ai-button${className ? ` ${className}` : ""}`}
      role="group"
      aria-label="Interactive glass project archive button"
      data-state={!mounted ? "paused" : ready ? "ready" : "loading"}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#a8b0bd",
        pointerEvents: "auto",
        ...style,
      }}
    >
      {mounted ? (
        <iframe
          ref={frameRef}
          title="Glass project archive button"
          srcDoc={PORTFOLIO_SOURCE_DOCUMENT}
          sandbox="allow-scripts"
          loading="eager"
          onLoad={() => setReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
            background: "#a8b0bd",
            opacity: ready ? 1 : 0,
            pointerEvents: ready ? "auto" : "none",
            transition: "opacity 240ms ease-out",
          }}
        />
      ) : null}
    </div>
  );
}
