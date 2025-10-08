import { strapi } from "./strapi";

type Site = {
    id: number;
    name: string;
    bio: string; 
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

type Project = {
    id: number;
    title: string;
    description: string;
    link: string;
    skills: Skill[] | null;
    github: string;
}

type Experience = {
    id: number;
    role: string;
    company: string;
    description: string;
    dates: string;
}

export async function getExperiences() {
    const res = (await strapi.find("experiences", {
        fields: ["role", "company", "description", "dates"],     // only what we need
    })) as any;

    const rows =
    (res?.data as Array<{ id: number; role: string; company: string; description: string; dates: string;  }>) ??
    [];

    return rows.map((r) => ({
        id: r.id,
        role: r.role,
        company: r.company,
        description: r.description,
        dates: r.dates
    }));
}

export async function getProjects(): Promise<Project[]>{
    const res = (await strapi.find("projects", {
        fields: ["title", "description", "link", "github"],
        populate: {
          skills: {
            fields: ["tool"],
            populate: { logo: { fields: ["id", "name", "url"] }, }, // include media object
          },
        },
        
    })) as any;

    const rows =
    (res?.data as Array<{ id: number; title: string; description: string; link: string; skills: Skill[]; github: string;  }>) ??
    [];

    return rows.map((r) => ({
        id: r.id,
        title: r.title, 
        description: r.description, 
        link: r.link,
        skills: r.skills,
        github: r.github
    }));
    
}

export async function getSkills(): Promise<Skill[]>{
    const res = (await strapi.find("skills", {
        fields: ["tool"],                         // only scalar fields you need
        populate: {                               // include media fields explicitly
          logo: { fields: ["id", "name", "url"] },
        },
      })) as any;

    const rows: any[] = res?.data ?? [];

    return rows.map((row) => ({
        id: row.id,
        tool: row.tool,
        logo: row.logo
          ? {
              id: row.logo.id,
              name: row.logo.name,
              url: process.env.STRAPI_URL + row.logo.url,
            }
          : null,
      }));
    
}

export async function getSocials(): Promise<Social[]>{
    const res = (await strapi.find("socials", {
        fields: ["platform", "link"],     // only what we need
    })) as any;

    const rows =
    (res?.data as Array<{ id: number; platform: string; link: string  }>) ??
    [];

    return rows.map((r) => ({
        id: r.id,
        platform: r.platform,
        link: r.link,
      }));
    
}

export async function getSite() {
    // Single type => findOne('<uid>')
    const res = (await strapi.find("site")) as any;
    const data = res?.data as Site | undefined;
    if (!data) return null;
    return {
        id: data.id,
        name: data.name,
        bio: data.bio,
    };
}


