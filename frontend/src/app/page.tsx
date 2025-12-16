// app/page.tsx (or wherever Home lives)
import { getSite, getSocials, getSkills } from "../lib/data";
import { Blocks } from "../lib/utils";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencesPage from "./pages/ExperiencesPage";
import Switcher from "./components/Switcher";
import InfiniteMarquee from "./components/InfiniteMarquee";
import HighlightText from "./components/HighlightText";
import ThemeToggle from "./components/ThemeToggle";
import HighlightAction from "./components/HighlightAction";
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
    <main className="w-full">
      {/* Top padding respects iOS safe area & header overlap */}
      <div className="pt-[env(safe-area-inset-top)]" />

      {/* Skills marquee - Maroon space */}
      <div className="w-full outline1 border-b-0">
        {/* 1x3 Grid: 1 column, 3 rows - 10%, 80%, 10% */}
        <div className="grid grid-cols-1 grid-rows-[2fr_6fr_2fr] w-full">
          {/* Row 1: Empty cell (10%) */}
          <div className="border outline2 border-double w-full"></div>

          {/* Row 2: Infinite marquee (80%) */}
          <div className="border-x border-b outline2 w-full flex items-center pt-2">
            <div className="relative w-full" style={{ overflow: "visible" }}>
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

          {/* Row 3: Empty cell (10%) */}
          <div className="border-x border-b-0 outline2 w-full"></div>
        </div>
      </div>

      {/* Header: name + socials/resume - Gray space */}
      <header className="w-full outline1">
        {/* 3x1 Grid: 3 columns, 1 row - 5%, 12%, 78% */}
        <div className="grid grid-cols-[5fr_15fr_80fr] w-full">
          {/* Column 1: Empty cell (5%) */}
          <div className="border-r outline2"></div>

          {/* Column 2: https-sai text (20%) */}
          <div className="border-r outline2">
            <div className="text-left">
              <ThemeToggle text={site.name} />
            </div>
          </div>

          {/* Column 3: Empty cell (75%) */}
          <div className="outline2"></div>
        </div>
      </header>

      {/* contact bento box and glass ui side by side - Green space */}
      <section className="w-full outline1">
        {/* 5x3 Grid: 5 columns, 3 rows - Columns: 5%, 50%, 5%, 35%, 5% | Rows: 5%, 90%, 5% */}
        <div className="grid grid-cols-[1fr_10fr_1fr_7fr_1fr] grid-rows-[1fr_18fr_1fr] w-full">
          {/* Row 1: All 5 columns (5% height) */}
          <div className="border-r border-b outline2"></div>
          <div className="border-r border-b outline2"></div>
          <div className="border-r border-b outline2"></div>
          <div className="border-r border-b outline2"></div>
          <div className="border-b outline2"></div>

          {/* Row 2: Main content (90% height) */}
          {/* Column 1: Left spacer (5%) */}
          <div className="border-r outline2"></div>

          {/* Column 2: Bio card (50%) */}
          <div className="border-r outline2">
            <div className="card px-6 py-4 default-text relative overflow-hidden flex flex-col h-full">
              <div className="flex-1">
                {Array.isArray(site.bio) ? (
                  <Blocks nodes={site.bio} />
                ) : site.bio ? (
                  <p className="default-text opacity-90 leading-relaxed sm:leading-7">
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
                    className="inline-flex items-center gap-2 px-3 py-1"
                  >
                    resume
                  </HighlightAction>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Middle spacer (5%) */}
          <div className="border-r outline2"></div>

          {/* Column 4: Contact card (35%) */}
          <div className="border-r outline2">
            <div className="default-text h-full">
              <Contact />
            </div>
          </div>

          {/* Column 5: Right spacer (5%) */}
          <div className="outline2"></div>

          {/* Row 3: All 5 columns (5% height) */}
          <div className="border-r border-t outline2"></div>
          <div className="border-r border-t outline2"></div>
          <div className="border-r border-t outline2"></div>
          <div className="border-r border-t outline2"></div>
          <div className="border-t outline2"></div>
        </div>
      </section>

      {/* Portfolio Card */}
      <section className="w-full outline1">
        {/* 3x3 Grid: 3 columns, 3 rows - Columns: 20%, 60%, 20% | Rows: 10%, 80%, 10% */}
        <div className="grid grid-cols-[1fr_8fr_1fr] grid-rows-[1fr_8fr_1fr] w-full">
          {/* Row 1: Top spacer (10%) */}
          <div className="border-r border-b outline2"></div>
          <div className="border-r border-b outline2"></div>
          <div className="border-b outline2"></div>

          {/* Row 2: Main content (80%) */}
          {/* Column 1: Left spacer (20%) */}
          <div className="border-r outline2"></div>

          {/* Column 2: Portfolio card (60%) */}
          <div className="border-r outline2">
            <div className="card px-6 py-4 default-text relative overflow-hidden h-full">
              I built this page using Next.js, TailwindCSS, Motion, and Strapi.
              I&apos;m using a collection of reusable components I built that
              can be customized via props (demos + code on my blog). I am
              managing and fetching the content on here using Strapi Headless
              CMS and GraphQL so that I can scale and update the content
              efficiently. I deployed this page using Netlify + Strapi Cloud
              with a CI/CD Pipeline built using Github Actions :)
            </div>
          </div>

          {/* Column 3: Right spacer (20%) */}
          <div className="outline2"></div>

          {/* Row 3: Bottom spacer (10%) */}
          <div className="border-r border-t outline2"></div>
          <div className="border-r border-t outline2"></div>
          <div className="border-t outline2"></div>
        </div>
      </section>

      {/* Switcher: projects/experience - Purple space */}
      <section className="w-full outline1">
        {/* 3x3 Grid: 3 columns, 3 rows - Columns: 10%, 80%, 10% | Rows: 5%, 90%, 5% */}
        <div className="grid grid-cols-[5fr_90fr_5fr] grid-rows-[1fr_18fr_1fr] w-full">
          {/* Row 1: Top spacer (5%) */}
          <div className="border-r border-b outline2"></div>
          <div className="border-r border-b outline2"></div>
          <div className="border-b outline2"></div>

          {/* Row 2: Main content (90%) */}
          {/* Column 1: Left spacer (10%) */}
          <div className="border-r outline2"></div>

          {/* Cell 2x2: Switcher + page content (80% width, 80% height) */}
          <div className="border-r outline2">
            <Switcher
              // Make sure Switcher tabs stack and scroll on mobile (see notes below)
              projects={<ProjectsPage />}
              experiences={<ExperiencesPage />}
            />
          </div>

          {/* Column 3: Right spacer (10%) */}
          <div className="outline2"></div>

          {/* Row 3: Bottom spacer (5%) */}
          <div className="border-r border-t outline2"></div>
          <div className="border-r border-t outline2"></div>
          <div className="border-t outline2"></div>
        </div>
      </section>

      {/* 5th red row */}
      <section className="w-full border outline1 h-[50px]"></section>

      <div className="pb-[env(safe-area-inset-bottom)]" />
    </main>
  );
}
