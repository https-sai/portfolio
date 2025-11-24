// app/page.tsx (or wherever Home lives)
import { getSite, getSocials, getSkills } from "../lib/data";
import { Blocks } from "../lib/utils";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import Switcher from "./components/Switcher";
import InfiniteMarquee from "./components/InfiniteMarquee";
import Postit from "./components/Postit";
import HighlightText from "./components/HighlightText";
import HighlightAction from "./components/HighlightAction";
import DottedHoverGrid from "./components/DottedHoverGrid";
import { Contact } from "./components/Contact";
import SkillItem from "./components/SkillItem";

export default async function Home() {
  const site = await getSite();
  const skills = await getSkills();

  if (!site) {
    return (
      <main className="p-6 sm:p-8">
        No site settings found. Create & **Publish** the single record in
        Strapi.
      </main>
    );
  }

  return (
    <DottedHoverGrid>
      <main className="w-full">
        {/* Top padding respects iOS safe area & header overlap */}
        <div className="pt-[env(safe-area-inset-top)]" />

        {/* Skills marquee */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 md:pt-16">
          <div className="relative pb-12" style={{ overflow: "visible" }}>
            <InfiniteMarquee
              items={skills?.map((skill) => (
                <SkillItem key={skill.id} skill={skill} />
              ))}
              speedSeconds={50}
              gapClass="gap-6 sm:gap-8 md:gap-10"
              reverse
              fadeEdges={true}
              // If you implement prefers-reduced-motion in InfiniteMarquee, you can pass a prop here to disable.
            />
          </div>
        </div>

        {/* Header: name + socials/resume */}
        <header className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-4 sm:py-6 md:py-8 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="text-center md:text-left">
              <HighlightText
                text={site.name}
                className="text-2xl sm:text-4xl md:text-5xl font-bold"
              />
            </div>
          </div>
        </header>

        {/* contact bento box and glass ui side by side */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12 p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="glass-card flex-1 p-8 text-white relative overflow-hidden rounded-lg border border-white/50 hover:border-white/50 flex flex-col">
              <div className="flex-1">
                {Array.isArray(site.bio) ? (
                  <Blocks nodes={site.bio} />
                ) : site.bio ? (
                  <p className="text-white/90 leading-relaxed sm:leading-7">
                    {site.bio}
                  </p>
                ) : null}
              </div>
              <div className="flex gap-2 py-2 mt-4">
                {site.resume?.url && (
                  <HighlightAction
                    as="a"
                    href={site.resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded border-white"
                  >
                    resume
                  </HighlightAction>
                )}
              </div>
            </div>
            <div className="flex-1 text-white">
              <Contact />
            </div>
          </div>
        </section>

        {/* Bio / Post-it */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-4 sm:py-6">
            <Postit>
              I built this page using Next.js, TailwindCSS, Motion, and Strapi.
              I&apos;m using a collection of reusable components I built that
              can be customized via props (demos + code on my blog). I am
              managing and fetching the content on here using Strapi Headless
              CMS and GraphQL so that I can scale and update the content
              efficiently. I deployed this page using Netlify + Strapi Cloud
              with a CI/CD Pipeline built using Github Actions :)
            </Postit>
          </div>
        </section>

        {/* Switcher: projects/experience */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-4 sm:py-6 md:py-8">
            <Switcher
              // Make sure Switcher tabs stack and scroll on mobile (see notes below)
              projects={<ProjectsPage />}
              experiences={<ExperiencesPage />}
            />
          </div>
        </section>

        <div className="pb-[env(safe-area-inset-bottom)]" />
      </main>
    </DottedHoverGrid>
  );
}
