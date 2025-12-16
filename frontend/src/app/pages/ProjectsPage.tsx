import React from "react";
import { getProjects } from "@/lib/data";
import { Blocks } from "@/lib/utils";
import HighlightText from "../components/HighlightText";
import HighlightAction from "../components/HighlightAction";
import SkillItem from "../components/SkillItem";

const projects = await getProjects();

export default function ProjectsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="card px-6 py-4 default-text relative overflow-hidden"
        >
          <HighlightText text={proj.title} className="text-xl font-bold" />
          <div className="flex gap-2 py-2 flex-wrap">
            {proj.skills?.map((skill) => (
              <SkillItem key={skill.id} skill={skill} size="sm" />
            ))}
          </div>
          <div className="py-4">
            {Array.isArray(proj.description) ? (
              <Blocks nodes={proj.description} />
            ) : proj.description ? (
              <p>{proj.description}</p>
            ) : null}
          </div>

          <div className="flex gap-2 py-2">
            <HighlightAction
              as="a"
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1"
            >
              live
            </HighlightAction>
            <HighlightAction
              as="a"
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1"
            >
              repo
            </HighlightAction>
          </div>
        </div>
      ))}
    </div>
  );
}
