import { strapi, STRAPI_URL } from "./strapi";
import axios from "axios";

type Site = {
    id: number;
    name: string;
    bio: string;
    resume: Image | null;
};

type Social = {
    id: number;
    platform: string;
    link: string;
}

type Image = {
    id: number;
    name: string;
    url: string;
}

type Skill = {
    id: number;
    tool: string;
    logo: Image | null;
}

export type Project = {
    id: number;
    title: string;
    description: string;
    link: string;
    skills: Skill[] | null;
    github: string;
}

export type Experience = {
    id: number;
    role: string;
    company: string;
    description: string;
    dates: string;
    skills: Skill[] | null;
}

export async function getProjectsWithSkills() {
    try {
      const response = await axios.get(`${STRAPI_URL}/api/projects?populate=skills`);
      return response.data.data; // Access the data array
    } catch (error) {
      return [];
    }
  }

export async function getExperiences(): Promise<Experience[]> {
    const res = (await strapi.find("experiences", {
        populate: {
          skills: {
            populate: {
              logo: true,
            },
          },
        },
        pagination: {
          pageSize: 1000, // Fetch all experiences
          page: 1,
        },
    }));

    const rows =
    (res?.data as Array<{ id: number; role: string; company: string; description: string; dates: string; skills: Skill[] | null;  }>) ??
    [];

    return rows.map((r) => {
        // Handle skills - ensure it's always an array or null
        const skills = Array.isArray(r.skills) 
          ? r.skills.map((skill: any) => ({
              id: skill.id,
              tool: skill.tool,
              logo: skill.logo
                ? {
                    id: skill.logo.id,
                    name: skill.logo.name,
                    url: skill.logo.url,
                  }
                : null,
            }))
          : null;

        return {
            id: r.id,
            role: r.role,
            company: r.company,
            description: r.description,
            dates: r.dates,
            skills,
        };
    });
}

export async function getProjects(): Promise<Project[]>{
    const res = (await strapi.find("projects", {
        populate: {
          skills: {
            populate: {
              logo: { fields: ["id", "name", "url"] },
            },
          },
        },
        pagination: {
          pageSize: 1000, // Fetch all projects
          page: 1,
        },
    }));

    const rows =
    (res?.data as Array<{ id: number; title: string; description: string; link: string; skills: any; github: string;  }>) ??
    [];

    return rows.map((r) => {
        // Handle skills - use same logic as getSkills
        let skills: Skill[] | null = null;
        
        if (r.skills && Array.isArray(r.skills) && r.skills.length > 0) {
          skills = r.skills.map((skill: any) => {
            // Map skill using same structure as getSkills
            return {
              id: skill.id,
              tool: skill.tool,
              logo: skill.logo
                ? {
                    id: skill.logo.id,
                    name: skill.logo.name,
                    url: skill.logo.url,
                  }
                : null,
            };
          });
        }

        return {
            id: r.id,
            title: r.title, 
            description: r.description, 
            link: r.link,
            skills,
            github: r.github
        };
    });
}

export async function getSkills(): Promise<Skill[]>{
    // Fetch all skills by using a large pageSize
    const res = (await strapi.find("skills", {
        fields: ["tool"],                         // only scalar fields you need
        populate: {                               // include media fields explicitly
          logo: { fields: ["id", "name", "url"] },
        },
        pagination: {
          pageSize: 1000, // Fetch up to 1000 skills (should cover most use cases)
          page: 1,
        },
      }));

      const rows =
      (res?.data as Array<{ id: number; tool: string; logo: Image;  }>) ??
      [];

    return rows.map((row) => ({
        id: row.id,
        tool: row.tool,
        logo: row.logo
          ? {
              id: row.logo.id,
              name: row.logo.name,
              url: row.logo.url,
            }
          : null,
      }));
}

export async function getSocials(): Promise<Social[]>{
    const res = (await strapi.find("socials", {
        fields: ["platform", "link"],     // only what we need
    }));

    const rows =
    (res?.data as Array<{ id: number; platform: string; link: string  }>) ??
    [];

    return rows.map((r) => ({
        id: r.id,
        platform: r.platform,
        link: r.link,
      }));
}

function isSite(v: unknown): v is Site {
    return !!v &&
      !Array.isArray(v) &&
      typeof (v as any).id === "number" &&
      typeof (v as any).name === "string" &&
      typeof (v as any).bio !== "undefined";
  }
  
  export async function getSite(): Promise<Site | null> {
    const res = await strapi.find("site", {
      populate: {
        resume: { fields: ["id", "name", "url"] },
      },
    });
    const d: unknown = (res as { data?: unknown })?.data;
    if (!isSite(d)) return null;
    
    // Map the resume field properly
    const resumeData = (d as any).resume;
    const resume = resumeData
      ? {
          id: resumeData.id,
          name: resumeData.name,
          url: resumeData.url,
        }
      : null;
    
    return {
      id: (d as any).id,
      name: (d as any).name,
      bio: (d as any).bio,
      resume,
    };
  }

