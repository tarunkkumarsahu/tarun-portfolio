"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export function TurnstileField() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hostRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey || !ready || !hostRef.current || !window.turnstile || widgetRef.current) return;

    widgetRef.current = window.turnstile.render(hostRef.current, {
      sitekey: siteKey,
      theme: "light",
      size: "flexible",
      callback: (value: unknown) => setToken(typeof value === "string" ? value : ""),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });

    return () => {
      if (widgetRef.current && window.turnstile) window.turnstile.remove(widgetRef.current);
      widgetRef.current = null;
    };
  }, [ready, siteKey]);

  if (!siteKey) {
    return <input type="hidden" name="turnstileToken" value="" />;
  }

  return (
    <div className="platform-form__verification">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <span>VERIFICATION</span>
      <div ref={hostRef} />
      <input type="hidden" name="turnstileToken" value={token} readOnly />
    </div>
  );
}
