"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "./ThemeProvider";
import HighlightText from "./HighlightText";

export default function ThemeToggle({ text }: { text: string }) {
  const { toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showTooltip && toggleRef.current && mounted) {
      const updatePosition = () => {
        if (toggleRef.current) {
          const rect = toggleRef.current.getBoundingClientRect();
          setCoords({
            x: rect.left + rect.width / 2,
            y: rect.bottom,
          });
        }
      };
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [showTooltip, mounted]);

  const tooltipElement =
    showTooltip && mounted ? (
      <div
        className="fixed px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap pointer-events-none shadow-xl z-[99999] transition-opacity duration-200"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y + 10}px`,
          transform: "translate(-50%, 0%)",
          backgroundColor: "var(--default-text-color)",
          color: "var(--default-bg-color)",
          border:
            "1px dotted color-mix(in srgb, var(--default-text-color) 20%, transparent)",
        }}
      >
        switch mode
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px">
          <div
            className="border-6 border-transparent"
            style={{ borderBottomColor: "var(--default-text-color)" }}
          ></div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div
        ref={toggleRef}
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-pointer"
      >
        <HighlightText
          text={text}
          className="text-2xl sm:text-4xl md:text-5xl font-bold"
        />
      </div>
      {mounted && createPortal(tooltipElement, document.body)}
    </>
  );
}
