import React from "react";
import { getExperiences } from "@/lib/data";
import { Blocks } from "@/lib/utils";
import HighlightText from "../components/HighlightText";

const experiences = await getExperiences();

// Sort experiences by dates, latest first
const sortedExperiences = [...experiences].sort((a, b) => {
  const getDateValue = (dateStr: string): number => {
    // Handle "Present" or "Current" as the latest
    if (
      dateStr.toLowerCase().includes("present") ||
      dateStr.toLowerCase().includes("current")
    ) {
      return Infinity;
    }

    // Extract the end year from date strings like "2024 - 2025" or "Jan 2024 - Dec 2025"
    // Try to find the last 4-digit year in the string
    const yearMatches = dateStr.match(/\b(19|20)\d{2}\b/g);
    if (yearMatches && yearMatches.length > 0) {
      // Get the last (most recent) year
      return parseInt(yearMatches[yearMatches.length - 1], 10);
    }

    // If no year found, try to parse as date
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.getTime();
    }

    // Fallback: return 0 for unparseable dates
    return 0;
  };

  const dateA = getDateValue(a.dates);
  const dateB = getDateValue(b.dates);

  // Sort descending (latest first)
  return dateB - dateA;
});

export default function ExperiencesPage() {
  return (
    <div className="space-y-6">
      {sortedExperiences.map((exp) => (
        <div
          key={exp.id}
          className="glass-card border border-white/50 rounded-lg p-4 text-white relative overflow-hidden"
        >
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
            <h1 className="text-xs font-bold mb-2">{exp.dates}</h1>
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
