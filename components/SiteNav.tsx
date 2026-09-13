"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const items = [
  ["01", "INDEX", "/"],
  ["02", "WORK", "/work"],
  ["03", "STATION", "/station"],
  ["04", "LAB", "/lab"],
  ["05", "ABOUT", "/about"],
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-nav">
        <a className="site-nav__brand" href="/" aria-label="Back to index">
          TS<span>/26</span>
        </a>

        <nav className="site-nav__links" aria-label="Primary navigation">
          {items.map(([, label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <div className="site-nav__actions">
          <button
            type="button"
            className="site-nav__menu"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu-overlay"
          >
            MENU
          </button>
          <a className="site-nav__contact" href="/contact">
            OPEN CHANNEL <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </div>
      </header>

      <div
        className={`mobile-menu-overlay ${menuOpen ? "mobile-menu-overlay--open" : ""}`}
        id="mobile-menu-overlay"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-overlay__top">
          <span>TS/26 · NAVIGATION</span>
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
            CLOSE <X size={14} strokeWidth={1.4} />
          </button>
        </div>

        <nav className="mobile-menu-overlay__links" aria-label="Mobile navigation">
          {items.map(([number, label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              <span>{number}</span>
              <strong>{label}</strong>
              <i>↗</i>
            </a>
          ))}
        </nav>

        <div className="mobile-menu-overlay__secondary">
          <a href="/contact" onClick={() => setMenuOpen(false)}>OPEN CHANNEL ↗</a>
          <a href="/share" onClick={() => setMenuOpen(false)}>SHARE YOUR WORK ↗</a>
        </div>

        <div className="mobile-menu-overlay__foot">
          <span>SOFTWARE · AI · SYSTEMS · MACHINES</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </>
  );
}
