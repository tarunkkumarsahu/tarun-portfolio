"use client";

import React from "react";

export type FlipLinkItem = {
  label: string;
  href: string;
  meta?: string;
};

export function FlipLinks({ items }: { items: FlipLinkItem[] }) {
  return (
    <div className="flipLinks" data-liquid-exclude>
      {items.map((item) => (
        <FlipLink key={item.label} {...item} />
      ))}
    </div>
  );
}

function FlipLink({ label, href, meta }: FlipLinkItem) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flipLink group"
      aria-label={`${label}${meta ? ` — ${meta}` : ""}`}
    >
      <span className="flipLinkMeta">{meta}</span>
      <span className="flipLinkWord" aria-hidden="true">
        <span className="flipLinkRow">
          {label.split("").map((letter, index) => (
            <span
              className="flipLetter"
              style={{ transitionDelay: `${index * 25}ms` }}
              key={`a-${index}`}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
        <span className="flipLinkRow flipLinkRowAlt">
          {label.split("").map((letter, index) => (
            <span
              className="flipLetter"
              style={{ transitionDelay: `${index * 25}ms` }}
              key={`b-${index}`}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      </span>
      <span className="flipLinkArrow">↗</span>
    </a>
  );
}
