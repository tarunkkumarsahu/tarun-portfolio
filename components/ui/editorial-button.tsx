"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export function EditorialButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`editorialButton ${className}`}
      data-cursor-hot
    >
      <span className="editorialButtonCorners" aria-hidden="true" />
      <span className="editorialButtonText">{children}</span>
      <span className="editorialButtonArrow" aria-hidden="true">↗</span>
    </button>
  );
}
