import { Section } from "../components/Section";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { education } from "../content/resume";

export default function Education() {
  useDocumentMeta(
    "education",
    "Education — B.Tech in Computer Science and Engineering, National Institute of Technology, Rourkela (2021–2025).",
  );

  return (
    <Section as="h1" command="/education" id="page-title">
      <p className="font-mono text-[0.85rem] text-faint">{education.length} entry</p>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {education.map((e) => (
          <li key={e.institution} className="py-5">
            <article aria-labelledby="edu-title">
              <header className="flex flex-col gap-x-6 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 id="edu-title" className="font-mono text-[0.98rem] font-semibold text-ink">
                  {e.institution}
                </h2>
                <p className="shrink-0 font-mono text-[0.8rem] text-muted">
                  <time>{e.start}</time> — <time>{e.end}</time>
                </p>
              </header>
              <p className="mt-1 text-ink/90">{e.degree}</p>

              <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-6 gap-y-1.5 font-mono text-[0.85rem]">
                <dt className="text-faint">degree</dt>
                <dd className="text-ink">{e.level}</dd>
                <dt className="text-faint">major</dt>
                <dd className="text-ink">{e.major}</dd>
                <dt className="text-faint">cgpa</dt>
                <dd className="text-ink">
                  {e.cgpa} <span className="text-faint">/ {e.cgpaScale}</span>
                </dd>
              </dl>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
