import { Section } from "../components/Section";
import { TagList } from "../components/Tag";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { experience } from "../content/resume";

export default function Work() {
  useDocumentMeta(
    "work",
    "Work experience — Software Engineer, Data Security Engineering at American Express: backend services, REST APIs and a distributed performance benchmarking framework.",
  );

  return (
    <Section as="h1" command="/work" id="page-title">
      <p className="font-mono text-[0.85rem] text-faint">
        {experience.length} roles · {experience[0].company}
      </p>

      <ol className="mt-6">
        {experience.map((role, i) => (
          <li key={role.id} className="relative pb-10 pl-7 last:pb-0">
            {/* timeline rail */}
            {i < experience.length - 1 && (
              <span aria-hidden="true" className="absolute left-[5px] top-4 bottom-0 w-px bg-line" />
            )}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[0.45rem] size-[11px] rounded-full border ${
                role.current ? "border-moss bg-moss" : "border-faint bg-base-100"
              }`}
            />

            <article aria-labelledby={`${role.id}-title`}>
              <header className="flex flex-col gap-x-6 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 id={`${role.id}-title`} className="font-mono text-[0.98rem] font-semibold text-ink">
                  {role.title}
                </h2>
                <p className="shrink-0 font-mono text-[0.8rem] text-muted">
                  <time>{role.start}</time> — {role.current ? <span className="text-moss">Present</span> : <time>{role.end}</time>}
                </p>
              </header>
              <p className="mt-0.5 font-mono text-[0.82rem] text-muted">
                {role.company} <span className="text-faint">·</span> {role.team}{" "}
                <span className="text-faint">·</span> {role.location}
              </p>

              <ul className="mt-4 max-w-[70ch] space-y-2 text-[0.95rem]">
                {role.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="select-none font-mono text-amber">
                      ·
                    </span>
                    <span className="text-ink/90">{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <TagList items={role.stack} label={`Technologies used as ${role.title}`} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
