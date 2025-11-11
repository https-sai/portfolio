"use client";
import React, { useRef } from "react";

export default function DottedHoverGrid({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  let ticking = false;

  const updatePos = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!ticking) {
      requestAnimationFrame(() => {
        ref.current!.style.setProperty("--x", `${x}px`);
        ref.current!.style.setProperty("--y", `${y}px`);
        ticking = false;
      });
      ticking = true;
    }
  };

  const clearPos = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--x", `-1000px`);
    ref.current.style.setProperty("--y", `-1000px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={updatePos}
      onMouseLeave={clearPos}
      className={`grid-bg w-full overflow-x-hidden ${className}`}
    >
      {children}
    </div>
  );
}
