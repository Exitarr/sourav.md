import { Section } from "../components/Section";
import { education, experience, profile } from "../content/resume";

/** The /info section: summary, quick facts and strengths. Shown on the home page and in the terminal. */
export default function Info() {
  const current = experience[0];
  const degree = education[0];

  const facts: [string, string][] = [
    ["role", `${current.title}, ${current.team}`],
    ["company", `${current.company} · since ${current.start}`],
    ["based in", profile.location],
    ["education", `B.Tech CSE, NIT Rourkela (${degree.end})`],
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

      <h3 className="mt-6 font-mono text-[0.85rem] text-faint">strengths</h3>
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
    </Section>
  );
}
