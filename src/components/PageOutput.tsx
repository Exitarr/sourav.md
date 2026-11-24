import { Suspense, useEffect } from "react";
import { InlineContext } from "./inline";
import { Contact, Education, Info, Project, ProjectDetail, Skill, Work } from "../pages/lazy";

const pages = { "/": Info, "/work": Work, "/skill": Skill, "/project": Project, "/education": Education, "/contact": Contact };

/** Mounts only once the lazy page has loaded, so the terminal can scroll to the real content. */
function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => onReady?.(), [onReady]);
  return null;
}

/** Renders a page's content as terminal output, e.g. `/work` prints the work history inline. */
export function PageOutput({ path, onReady }: { path: string; onReady?: () => void }) {
  const detail = path.match(/^\/project\/(.+)$/);
  const Page = pages[path as keyof typeof pages];
  return (
    <InlineContext.Provider value={true}>
      <div className="font-sans text-[1rem] text-ink">
        <Suspense fallback={<p className="font-mono text-[0.82rem] text-faint">loading…</p>}>
          {detail ? <ProjectDetail slug={detail[1]} /> : Page ? <Page /> : null}
          <Ready onReady={onReady} />
        </Suspense>
      </div>
    </InlineContext.Provider>
  );
}
