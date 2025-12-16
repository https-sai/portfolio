"use client";

import { useState } from "react";
import HighlightAction from "./HighlightAction";

type Props = {
  projects: React.ReactNode;
  experiences: React.ReactNode;
};

export default function Switcher({ projects, experiences }: Props) {
  const [active, setActive] = useState<"projects" | "experiences">("projects");

  const base = "px-3 py-1 transition-colors";

  return (
    <div className="grid grid-cols-1 grid-rows-[30px_20px_1fr] w-full h-full">
      {/* Row 1: Buttons */}
      <div className="border-b outline3">
        <div className="flex">
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
      </div>

      {/* Row 2: Empty */}
      <div className="border-b outline3"></div>

      {/* Row 3: Page content */}
      <div className="outline3 min-h-0 overflow-auto">
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
