// components/HighlightName.tsx
"use client";
import { motion } from "framer-motion";

export default function HighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const variants = { rest: { width: "0%" }, hover: { width: "100%" } };

  return (
    <motion.span
      className="relative inline-block cursor-pointer align-baseline"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className={`relative z-10 text-white ${className}`}>{text}</span>

      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-0 rounded-sm bg-white"
      />

      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-20 overflow-hidden"
      >
        <span className={`block text-black ${className}`}>{text}</span>
      </motion.span>
    </motion.span>
  );
}
