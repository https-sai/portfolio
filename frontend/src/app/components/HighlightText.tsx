// components/HighlightName.tsx
"use client";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function HighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { theme } = useTheme();
  const variants = { rest: { width: "0%" }, hover: { width: "100%" } };

  // Highlight uses default text color, hover text uses default bg color
  // Light mode: black highlight, white hover text
  // Dark mode: white highlight, black hover text
  const baseTextColor = theme === "dark" ? "default-text" : "text-black";

  return (
    <motion.span
      className="relative inline-block cursor-pointer align-baseline"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className={`relative z-10 ${baseTextColor} ${className}`}>
        {text}
      </span>

      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-0"
        style={{ backgroundColor: "var(--default-text-color)" }}
      />

      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-20 overflow-hidden"
      >
        <span
          className={`block ${className}`}
          style={{ color: "var(--default-bg-color)" }}
        >
          {text}
        </span>
      </motion.span>
    </motion.span>
  );
}
