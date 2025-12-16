"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

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

  if (!skill.logo?.url) return null;

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
        {skill.tool}
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
        ref={itemRef}
        className="relative inline-flex items-center justify-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <a className="inline-flex items-center" tabIndex={-1}>
          <Image
            src={skill.logo.url}
            alt={skill.tool}
            width={40}
            height={40}
            className={`w-auto opacity-80 hover:opacity-100 transition rounded ${
              size === "sm"
                ? "h-6 sm:h-7"
                : size === "lg"
                ? "h-10 sm:h-12 md:h-14"
                : "h-8 sm:h-9 md:h-10"
            }`}
            unoptimized
          />
        </a>
      </div>
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(tooltipElement, document.body)}
    </>
  );
}
