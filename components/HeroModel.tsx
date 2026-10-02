"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
      <small className="heroModelComing">3D CHARACTER / COMING NEXT</small>
    </div>
  );
}

export function HeroModel() {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(MODEL_PATH, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        if (!cancelled) setAvailable(response.ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (available === null) return <LoadingModel />;
  if (!available) return <HeroFallback />;

  return <LazyHeroModelCanvas />;
}
