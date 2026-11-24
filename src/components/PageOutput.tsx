import { Suspense } from "react";
import { InlineContext } from "./inline";
import { Contact, Education, Info, Project, ProjectDetail, Skill, Work } from "../pages/lazy";

const pages = { "/": Info, "/work": Work, "/skill": Skill, "/project": Project, "/education": Education, "/contact": Contact };

/** Renders a page's content as terminal output, e.g. `/work` prints the work history inline. */
export function PageOutput({ path }: { path: string }) {
  const detail = path.match(/^\/project\/(.+)$/);
  const Page = pages[path as keyof typeof pages];
  return (
    <InlineContext.Provider value={true}>
      <div className="font-sans text-[1rem] text-ink">
        <Suspense fallback={<p className="font-mono text-[0.82rem] text-faint">loading…</p>}>
          {detail ? <ProjectDetail slug={detail[1]} /> : Page ? <Page /> : null}
        </Suspense>
      </div>
    </InlineContext.Provider>
  );
}
