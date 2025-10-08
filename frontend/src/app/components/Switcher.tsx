"use client";

import { useState } from "react";
import HighlightAction from "./HighlightAction";

type Props = {
  projects: React.ReactNode;
  experiences: React.ReactNode;
};

export default function Switcher({ projects, experiences }: Props) {
  const [active, setActive] = useState<"projects" | "experiences">("projects");

  const base = "px-3 py-1 rounded border transition-colors";

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <HighlightAction
          as="button"
          aria-pressed={active === "projects"}
          onClick={() => setActive("projects")}
          className={`${base} `}
        >
          projects
        </HighlightAction>

        <HighlightAction
          as="button"
          aria-pressed={active === "experiences"}
          onClick={() => setActive("experiences")}
          className={`${base} `}
        >
          experience
        </HighlightAction>
      </div>

      <div>
        <div style={{ display: active === "projects" ? "block" : "none" }}>
          {projects}
        </div>
        <div style={{ display: active === "experiences" ? "block" : "none" }}>
          {experiences}
        </div>
      </div>
    </div>
  );
}
