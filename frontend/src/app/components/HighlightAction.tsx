"use client";

import { motion } from "framer-motion";
import type { ReactNode, MouseEventHandler } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type ButtonProps = CommonProps & {
  as?: "button"; // default
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type LinkProps = CommonProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
};

type Props = ButtonProps | LinkProps;

const variants = {
  rest: { width: "0%" },
  hover: { width: "100%" },
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      {/* expanding white background */}
      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-10 bg-white"
      />

      {/* base (white) content above bg */}
      <span className="relative z-20 inline-flex items-center">{children}</span>

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
    </>
  );
}

export default function HighlightAction(props: Props) {
  const baseClasses = [
    "relative inline-flex items-center justify-center",
    "px-3 py-1 rounded border border-white",
    "bg-black text-white",
    "overflow-hidden select-none",
    "transition-colors focus:outline-none focus:ring-2 focus:ring-white/40",
    props.className ?? "",
  ].join(" ");

  // Discriminate on props.as to keep types strict
  if (props.as === "a") {
    const { href, target, rel, children } = props;
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        animate="rest"
        className={baseClasses}
      >
        <Inner>{children}</Inner>
      </motion.a>
    );
  }

  // default: button
  const { type = "button", onClick, children } = props;
  return (
    <motion.button
      type={type}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className={baseClasses}
    >
      <Inner>{children}</Inner>
    </motion.button>
  );
}
