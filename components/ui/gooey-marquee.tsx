"use client";

interface GooeyMarqueeProps {
  text: string;
  className?: string;
  speed?: number;
}

export function GooeyMarquee({
  text,
  className = "",
  speed = 16,
}: GooeyMarqueeProps) {
  const repeated = `${text}     ${text}     ${text}`;

  return (
    <div className={`gooeyMarquee ${className}`} aria-label={text}>
      <div className="gooeyMarqueeBlur" aria-hidden="true">
        <p style={{ animationDuration: `${speed}s` }}>{repeated}</p>
      </div>
      <div className="gooeyMarqueeSharp">
        <p style={{ animationDuration: `${speed}s` }}>{repeated}</p>
      </div>
    </div>
  );
}
