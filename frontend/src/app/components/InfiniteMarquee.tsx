"use client";
import React from "react";

type InfiniteMarqueeProps = {
  items: React.ReactNode[];
  /** seconds per full loop; higher = slower */
  speedSeconds?: number;
  /** pause the animation when hovering the row */
  pauseOnHover?: boolean;
  /** scroll right-to-left by default; set true to reverse */
  reverse?: boolean;
  /** Tailwind gap class, e.g. "gap-6" (applies inside the UL) */
  gapClass?: string;
  className?: string;
  /** Optional gradient mask on edges */
  fadeEdges?: boolean;
};

export default function InfiniteMarquee({
  items,
  speedSeconds = 30,
  pauseOnHover = true,
  reverse = false,
  gapClass = "gap-6",
  className = "",
  fadeEdges = true,
}: InfiniteMarqueeProps) {
  const ulRef = React.useRef<HTMLUListElement | null>(null);
  const firstARef = React.useRef<HTMLLIElement | null>(null);
  const firstBRef = React.useRef<HTMLLIElement | null>(null);
  const [dist, setDist] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Measure exact distance from first item of pass A to first item of pass B.
  // This automatically includes all internal gaps + the seam gap, with no rounding drift.
  React.useLayoutEffect(() => {
    const ul = ulRef.current;

    const measure = () => {
      const a = firstARef.current;
      const b = firstBRef.current;
      if (!ul || !a || !b) return;

      // offsetLeft is relative to the nearest offsetParent (the UL here), perfect for our case.
      const dx = b.offsetLeft - a.offsetLeft;
      if (dx > 0) setDist(dx);
    };

    measure();

    // Re-measure on resize / content changes
    const ro = new ResizeObserver(measure);
    if (ul) ro.observe(ul);
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [items, gapClass]);

  const styleVars: React.CSSProperties = {
    ["--dur" as any]: `${speedSeconds}s`,
    ["--listW" as any]: `${dist}px`,
    animation:
      dist > 0
        ? `${
            reverse ? "marquee-px-reverse" : "marquee-px"
          } var(--dur) linear infinite`
        : undefined,
    animationPlayState: paused ? "paused" : "running",
  };

  return (
    <div
      className={[
        "relative w-full overflow-hidden",
        fadeEdges
          ? "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          : "",
        className,
      ].join(" ")}
    >
      <ul
        ref={ulRef}
        style={styleVars}
        className={[
          "inline-flex flex-nowrap list-none m-0 p-0 transform-gpu",
          gapClass,
        ].join(" ")}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
        onTouchStart={() => pauseOnHover && setPaused(true)}
        onTouchEnd={() => pauseOnHover && setPaused(false)}
      >
        {/* Pass A */}
        {items.map((it, i) => (
          <li
            key={`a-${i}`}
            ref={i === 0 ? firstARef : undefined}
            className="shrink-0"
          >
            {it}
          </li>
        ))}
        {/* Pass B (duplicate) */}
        {items.map((it, i) => (
          <li
            key={`b-${i}`}
            ref={i === 0 ? firstBRef : undefined}
            className="shrink-0"
            aria-hidden
          >
            {it}
          </li>
        ))}
      </ul>

      {/* Respect reduced motion */}
      <div className="sr-only motion-reduce:not-sr-only">
        Animations are reduced per system preferences.
      </div>
    </div>
  );
}
