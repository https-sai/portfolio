"use client";

import { motion } from "framer-motion";
import type { ReactNode, MouseEventHandler } from "react";
import { useTheme } from "./ThemeProvider";

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
  const { theme } = useTheme();

  // Highlight uses default text color, hover text uses default bg color
  // Light mode: black highlight, white hover text
  // Dark mode: white highlight, black hover text
  const bgColor = "var(--default-text-color)"; // Use text color for highlight
  const hoverTextColor = "var(--default-bg-color)"; // Use bg color for hover text

  return (
    <>
      {/* expanding background */}
      <motion.span
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-10"
        style={{ backgroundColor: bgColor }}
      />

      {/* base (default) content above bg */}
      <span className="relative z-20 inline-flex items-center">{children}</span>

      {/* clipped content that appears only inside the sweep */}
      <motion.span
        aria-hidden
        variants={variants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-y-0 left-0 z-30 overflow-hidden"
      >
        <span
          className="inline-flex items-center px-3 py-0.5"
          style={{ color: hoverTextColor }}
        >
          {children}
        </span>
      </motion.span>
    </>
  );
}

export default function HighlightAction(props: Props) {
  const baseClasses = [
    "relative inline-flex items-center justify-center",
    "px-3 h-[30px] card",
    "default-text",
    "overflow-hidden select-none",
    "transition-colors focus:outline-none focus:ring-2",
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
