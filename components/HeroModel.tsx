"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useEffect, useState } from "react";

const MODEL_PATH = "/models/tarun_hero_web.glb";
const FALLBACK_PHOTO = "https://avatars.githubusercontent.com/u/220187164?v=4";

const LazyHeroModelCanvas = dynamic(
  () => import("@/components/HeroModelCanvas"),
  {
    ssr: false,
    loading: () => <LoadingModel />,
  },
);

function LoadingModel() {
  return (
    <div className="heroModelLoading" aria-hidden="true">
      <span />
      <small>LOADING HERO</small>
    </div>
  );
}

function HeroFallback() {
  return (
    <div className="heroFallbackClean" aria-label="Portrait of Tarun">
      <div className="heroFallbackPortrait">
        <img
          src={FALLBACK_PHOTO}
          alt="Tarun Kumar Sahu"
          draggable={false}
          loading="eager"
          decoding="async"
        />
      </div>
      <small className="heroModelComing">3D FALLBACK / PORTRAIT MODE</small>
    </div>
  );
}

class HeroModelErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <HeroFallback />;
    return this.props.children;
  }
}

export function HeroModel() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(MODEL_PATH, {
      method: "HEAD",
      cache: "force-cache",
      signal: controller.signal,
    })
      .then((response) => setAvailable(response.ok))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setAvailable(false);
      });

    return () => controller.abort();
  }, []);

  if (available === null) return <LoadingModel />;
  if (!available) return <HeroFallback />;

  return (
    <HeroModelErrorBoundary>
      <LazyHeroModelCanvas />
    </HeroModelErrorBoundary>
  );
}
