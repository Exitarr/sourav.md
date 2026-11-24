import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { TagList } from "./Tag";
import type { Project } from "../content/resume";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-2 py-4 sm:grid-cols-[9rem_1fr]">
      <dt className="pt-0.5 font-mono text-[0.82rem] text-muted">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}

function Bullets({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="max-w-[66ch] space-y-2 text-[0.95rem]">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className={`select-none font-mono ${accent ? "text-moss" : "text-amber"}`}>
            {accent ? "+" : "·"}
          </span>
          <span className="text-ink/90">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-term inline-flex items-center gap-1 break-all">
      {children}
      <ArrowUpRight aria-hidden="true" size={14} className="shrink-0 text-faint" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/** Full project description: problem, implementation, impact, stack, links. */
export function ProjectBody({ project }: { project: Project }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {project.problem && (
        <Row label="about">
          <p className="max-w-[66ch] text-[0.95rem] text-ink/90">{project.problem}</p>
        </Row>
      )}
      <Row label="implementation">
        <Bullets items={project.implementation} />
      </Row>
      {project.impact && (
        <Row label="impact">
          <Bullets items={project.impact} accent />
        </Row>
      )}
      <Row label="stack">
        <TagList items={project.stack} label={`${project.name} technologies`} />
      </Row>
      {(project.live || project.repo) && (
        <Row label="links">
          <p className="flex flex-col gap-1.5 font-mono text-[0.88rem] sm:flex-row sm:flex-wrap sm:gap-x-6">
            {project.live && <External href={project.live}>{project.live.replace(/^https?:\/\//, "")}</External>}
            {project.repo && <External href={project.repo}>{project.repo.replace(/^https?:\/\//, "")}</External>}
          </p>
        </Row>
      )}
    </dl>
  );
}
