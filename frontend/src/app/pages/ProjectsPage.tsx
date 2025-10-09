import React from "react";
import { getProjects } from "@/lib/data";
import { Blocks } from "@/lib/utils";
import HighlightText from "../components/HighlightText";
import HighlightAction from "../components/HighlightAction";
import { STRAPI_URL } from "@/lib/strapi";

const projects = await getProjects();

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {projects.map((proj) => (
        <div key={proj.id} className="border p-4 rounded hover:bg-white/5">
          <HighlightText text={proj.title} className="text-xl font-bold" />
          <div className="flex gap-2 py-2">
            {proj.skills?.map((skill) => (
              <img
                key={skill.id}
                src={skill.logo?.url}
                className="w-5 h-5 opacity-80 hover:opacity-100 rounded"
              ></img>
            ))}
          </div>
          <div className="px-2 py-4">
            {Array.isArray(proj.description) ? (
              <Blocks nodes={proj.description} />
            ) : proj.description ? (
              <p className="text-gray-700">{proj.description}</p>
            ) : null}
          </div>

          <div className="flex gap-2 py-2">
            <HighlightAction
              as="a"
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded border-white"
            >
              live
            </HighlightAction>
            <HighlightAction
              as="a"
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 rounded border-white"
            >
              repo
            </HighlightAction>
          </div>
        </div>
      ))}
    </div>
  );
}
