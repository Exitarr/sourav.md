import { Section } from "../components/Section";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { education, experience, handsOn, links, profile } from "../content/resume";

/** The /info section: summary, quick facts and strengths. Shown on the home page and in the terminal. */
export default function Info() {
  const current = experience[0];
  const intern = experience[experience.length - 1];
  const degree = education[0];

  const facts: [string, string][] = [
    ["role", `${current.title}, ${current.team}`],
    ["company", `${current.company} · since ${current.start}`],
    ["path", `intern ${intern.start} → full-time ${current.start}`],
    ["based in", profile.location],
    ["education", `B.Tech CSE, NIT Rourkela · ${degree.end} · CGPA ${degree.cgpa}/${degree.cgpaScale}`],
  ];

  return (
    <Section command="/info" id="info">
      <div className="max-w-[68ch] space-y-4">
        <p className="text-ink">{profile.summary}</p>
        <p className="text-muted">{profile.summaryExtra}</p>
      </div>

      <dl className="mt-6 grid grid-cols-[minmax(6.5rem,auto)_1fr] gap-x-6 gap-y-1.5 font-mono text-[0.85rem]">
        {facts.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-faint">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-8 font-mono text-[0.85rem] text-faint">at work · highlights</h3>
      <ul className="mt-1.5 space-y-1.5 text-[0.95rem]">
        {profile.highlights.map((h) => (
          <li key={h.slug} className="flex gap-3">
            <span aria-hidden="true" className="select-none font-mono text-amber">
              ›
            </span>
            <span className="text-ink/90">
              {h.text}{" "}
              <Link to={`/project/${h.slug}`} className="link-term whitespace-nowrap font-mono text-[0.8rem] text-muted">
                details
                <span className="sr-only"> about this project</span>
              </Link>
            </span>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 font-mono text-[0.85rem] text-faint">strengths</h3>
      <ul className="mt-1.5 space-y-1 text-[0.95rem]">
        {profile.strengths.map((s) => (
          <li key={s} className="flex gap-3">
            <span aria-hidden="true" className="select-none font-mono text-amber">
              ·
            </span>
            <span className="text-muted">{s}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-8 font-mono text-[0.85rem] text-faint">hands-on · personal projects</h3>
      <p className="mt-1 max-w-[68ch] text-[0.95rem] text-muted">
        Outside work I learn by building. These are my own projects from{" "}
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="link-term font-mono text-[0.85rem]">
          github.com/{links.githubHandle}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>{" "}
        — personal, hands-on experience, separate from my professional work at {profile.company}.
      </p>
      <ul className="mt-4 space-y-3">
        {handsOn.map((p) => (
          <li key={p.name} className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[12.5rem_1fr]">
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-term inline-flex items-center gap-1 self-start justify-self-start font-mono text-[0.85rem]"
            >
              {p.name}
              <ArrowUpRight aria-hidden="true" size={13} className="shrink-0 text-faint" />
              <span className="sr-only"> on GitHub (opens in a new tab)</span>
            </a>
            <div>
              <p className="text-[0.95rem] text-muted">{p.what}</p>
              <p className="font-mono text-[0.75rem] text-faint">{p.stack.join(" · ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
