"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps & {
  as?: "button";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type AsLink = CommonProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
};

type Props = AsButton | AsLink;

const variants = {
  rest: { width: "0%" },
  hover: { width: "100%" },
};

export default function HighlightAction(props: Props) {
  const {
    children,
    className = "",

    href,

    onClick,

    type = "button",
    as = "button",

    target,
    color = "",

    rel,
  } = props as any;

  const Comp: any = as === "a" ? motion.a : motion.button;

  return (
    <Comp
      href={href}
      onClick={onClick}
      type={as === "button" ? type : undefined}
      target={target}
      rel={rel}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className={[
        // base look: black bg, white text
        "relative inline-flex items-center justify-center",
        "px-3 py-1 rounded border border-white",
        "bg-black text-white",
        "overflow-hidden select-none",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-white/40",
        className,
      ].join(" ")}
    >
      {/* expanding white background */}
      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-10 bg-white"
      />

      {/* base (white) content above bg */}
      <span className="relative z-20">{children}</span>

      {/* clipped black content that appears only inside the sweep */}
      <motion.span
        aria-hidden
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-30 overflow-hidden"
      >
        <span className="inline-flex items-center px-3 py-1 text-black">
          {children}
        </span>
      </motion.span>
    </Comp>
  );
}
