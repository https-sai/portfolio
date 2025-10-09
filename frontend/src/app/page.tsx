import { getSite, getSocials, getSkills } from "../lib/data";
import { Blocks } from "../lib/utils";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import Switcher from "./components/Switcher";
import InfiniteMarquee from "./components/InfiniteMarquee";
import Postit from "./components/Postit";
import HighlightText from "./components/HighlightText";
import HighlightAction from "./components/HighlightAction";
import { STRAPI_URL } from "@/lib/strapi";

export const revalidate = 60; // optional ISR (refresh at most once/minute)

// Blocks moved to src/lib/utils.ts

export default async function Home() {
  const site = await getSite();
  const socials = await getSocials();
  const skills = await getSkills();

  if (!site) {
    return (
      <main className="p-8">
        No site settings found. Create & **Publish** the single record in
        Strapi.
      </main>
    );
  }

  return (
    <main className="w-full dotted-background-container">
      <div className="py-8 pt-20">
        <InfiniteMarquee
          items={skills?.map((skill) => (
            <a
              key={skill.id}
              className="inline-flex items-center"
              tabIndex={-1}
            >
              <img
                key={skill.id}
                src={STRAPI_URL! + skill.logo?.url}
                loading="lazy"
                className="h-10 w-auto opacity-80 hover:opacity-100 hover:grayscale-0 transition rounded"
              />
            </a>
          ))}
          speedSeconds={30}
          gapClass="gap-10"
          reverse={true}
          fadeEdges={false}
        />
      </div>

      <div className="px-50 py-5 inline-flex items-center">
        <div>
          <HighlightText text={site.name} className="text-5xl font-bold" />
        </div>

        <div className="ml-50">
          <ul className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <li key={s.id}>
                <HighlightAction
                  as="a"
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.platform}
                </HighlightAction>
              </li>
            ))}
            <li>
              <HighlightAction as="a" href="#" target="_blank" rel="noreferrer">
                resume
              </HighlightAction>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-50 py-5">
        <Postit>
          {Array.isArray(site.bio) ? (
            <Blocks nodes={site.bio} />
          ) : site.bio ? (
            <p className="text-gray-700">{site.bio}</p>
          ) : null}
        </Postit>
      </div>

      <div className="px-50 py-4">
        <Switcher
          projects={<ProjectsPage />}
          experiences={<ExperiencesPage />}
        />
      </div>
    </main>
  );
}
