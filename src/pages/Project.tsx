import { Link } from "react-router";
import { Section } from "../components/Section";
import { ProjectBody } from "../components/ProjectBody";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { projectGroups, projects } from "../content/resume";

export default function Project() {
  useDocumentMeta(
    "project",
    "Projects — AimForge (personal), plus the Distributed Performance Benchmarking Framework, Slack Knowledge Assistant using RAG and Key Usage Analytics REST API built at American Express.",
  );

  return (
    <Section as="h1" command="/project" id="page-title">
      <p className="font-mono text-[0.85rem] text-faint">
        {projects.length} projects · type <span className="text-muted">/project &lt;name&gt;</span> to open one on its own
      </p>

      <div className="mt-10 space-y-14">
        {projectGroups.map((g) => {
          const items = projects.filter((p) => p.group === g.id);
          if (!items.length) return null;
          return (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <h2 id={`group-${g.id}`} className="font-mono text-[0.95rem] font-semibold text-ink">
                <span aria-hidden="true" className="mr-2 text-amber">
                  #
                </span>
                {g.label}
              </h2>
              <p className="mt-0.5 font-mono text-[0.8rem] text-faint">{g.note}</p>

              <div className="mt-6 space-y-12">
                {items.map((p) => (
                  <article key={p.slug} aria-labelledby={`p-${p.slug}`}>
                    <header className="flex items-baseline justify-between gap-4">
                      <h3 id={`p-${p.slug}`} className="min-w-0 text-[1.15rem] font-semibold leading-snug text-ink">
                        <Link to={`/project/${p.slug}`} className="transition-colors hover:text-amber">
                          {p.name}
                        </Link>
                      </h3>
                      <span className="shrink-0 font-mono text-[0.72rem] uppercase tracking-wider text-faint">
                        {p.kind}
                      </span>
                    </header>
                    <p className="mt-1 mb-4 max-w-[62ch] text-muted">{p.tagline}</p>
                    <ProjectBody project={p} />
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
