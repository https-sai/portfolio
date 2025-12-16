"use client";

import { useTheme } from "./ThemeProvider";
import HighlightText from "./HighlightText";

export default function ThemeToggle({ text }: { text: string }) {
  const { toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="cursor-pointer">
      <HighlightText
        text={text}
        className="text-2xl sm:text-4xl md:text-5xl font-bold"
      />
    </div>
  );
}
