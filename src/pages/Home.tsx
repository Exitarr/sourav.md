import { PixelLogo } from "../components/PixelLogo";
import { Section } from "../components/Section";
import { CommandList } from "../components/CommandList";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { education, experience, profile } from "../content/resume";

export default function Home() {
  useDocumentMeta(null);
  const current = experience[0];
  const degree = education[0];

  const facts: [string, string][] = [
    ["role", `${current.title}, ${current.team}`],
    ["company", `${current.company} · since ${current.start}`],
    ["based in", profile.location],
    ["education", `B.Tech CSE, NIT Rourkela (${degree.end})`],
  ];

  return (
    <div className="space-y-14 sm:space-y-16">
      <header className="flex items-center gap-5 sm:gap-8">
        <PixelLogo className="h-[clamp(5.5rem,22vw,10rem)] w-auto shrink-0" />
        <div className="min-w-0">
          <h1 className="font-mono text-[clamp(2.4rem,10vw,5.25rem)] font-bold leading-[0.95] tracking-tight text-ink">
            sourav<span className="text-amber">.md</span>
          </h1>
          <p className="mt-3 font-mono text-[clamp(0.85rem,2.6vw,1rem)] text-ink">
            {profile.name} <span className="text-faint">·</span> Backend Engineer
          </p>
          <p className="mt-0.5 font-mono text-[clamp(0.75rem,2.2vw,0.85rem)] text-muted">
            {profile.team} @ {profile.company}
          </p>
        </div>
      </header>

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

      <Section command="/help" id="help">
        <p className="mb-4 text-muted">
          Type a command in the terminal below to open that page. Press <kbd className="kbd kbd-sm">/</kbd> anywhere to
          start.
        </p>
        <CommandList hide={["/help"]} />
      </Section>
    </div>
  );
}
