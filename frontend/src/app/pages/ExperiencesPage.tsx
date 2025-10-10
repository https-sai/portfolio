import React from "react";
import { getExperiences } from "@/lib/data";
import { Blocks } from "@/lib/utils";
import HighlightText from "../components/HighlightText";

const experiences = await getExperiences();

export default function ExperiencesPage() {
  return (
    <div className="space-y-6">
      {experiences.reverse().map((exp) => (
        <div key={exp.id} className="border p-4 rounded hover:bg-white/5">
          <div className="space-y-2">
            <h1>
              <HighlightText
                text={exp.role}
                className="text-2xl font-bold mb-2"
              />
            </h1>
            <h1>
              <HighlightText text={exp.company} className="font-bold mb-2" />
            </h1>
            <h1>
              <HighlightText
                text={exp.dates}
                className="text-xs font-bold mb-2"
              />
            </h1>
          </div>
          <div className="p-4">
            {Array.isArray(exp.description) ? (
              <Blocks nodes={exp.description} />
            ) : exp.description ? (
              <p>{exp.description}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
