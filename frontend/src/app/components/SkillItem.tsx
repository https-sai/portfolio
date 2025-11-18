"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface SkillItemProps {
  skill: {
    id: number;
    tool: string;
    logo: {
      url: string;
    } | null;
  };
  size?: "sm" | "md" | "lg";
}

export default function SkillItem({ skill, size = "md" }: SkillItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showTooltip && itemRef.current && mounted) {
      const updatePosition = () => {
        if (itemRef.current) {
          const rect = itemRef.current.getBoundingClientRect();
          setCoords({
            x: rect.left + rect.width / 2,
            y: rect.top,
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

  if (!skill.logo?.url) return null;

  const tooltipElement =
    showTooltip && mounted ? (
      <div
        className="fixed px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap pointer-events-none shadow-xl z-[99999] transition-opacity duration-200"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y - 10}px`,
          transform: "translate(-50%, -100%)",
        }}
      >
        {skill.tool}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
          <div className="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div
        ref={itemRef}
        className="relative inline-flex items-center justify-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <a className="inline-flex items-center" tabIndex={-1}>
          <img
            src={skill.logo.url}
            alt={skill.tool}
            loading="lazy"
            className={`w-auto opacity-80 hover:opacity-100 transition rounded ${
              size === "sm"
                ? "h-6 sm:h-7"
                : size === "lg"
                ? "h-10 sm:h-12 md:h-14"
                : "h-8 sm:h-9 md:h-10"
            }`}
          />
        </a>
      </div>
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(tooltipElement, document.body)}
    </>
  );
}
