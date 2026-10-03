"use client";

import { useEffect, useState } from "react";

const SPRITE_SOURCE = "/media/portfolio-generated-media.webp.b64";
let cachedSprite: string | null = null;
let pendingSprite: Promise<string> | null = null;

function loadSprite() {
  if (cachedSprite) return Promise.resolve(cachedSprite);
  if (!pendingSprite) {
    pendingSprite = fetch(SPRITE_SOURCE, { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Generated media sprite failed to load: ${response.status}`);
        }
        return response.text();
      })
      .then((base64) => {
        cachedSprite = `data:image/webp;base64,${base64.trim()}`;
        return cachedSprite;
      });
  }
  return pendingSprite;
}

export function useGeneratedMediaSprite() {
  const [sprite, setSprite] = useState(cachedSprite ?? "");

  useEffect(() => {
    let alive = true;
    loadSprite()
      .then((url) => {
        if (alive) setSprite(url);
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      alive = false;
    };
  }, []);

  return sprite;
}
