import { Section } from "../components/Section";
import { TagList } from "../components/Tag";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { skills } from "../content/resume";

export default function Skill() {
  useDocumentMeta(
    "skill",
    "Technical skills — Java, Python, Spring Boot, FastAPI, Flask, Kafka, Redis, Couchbase, PostgreSQL, Docker, Kubernetes, OpenTelemetry and more.",
  );

  const total = skills.reduce((n, g) => n + g.items.length, 0);

  return (
    <Section as="h1" command="/skill" id="page-title">
      <p className="font-mono text-[0.85rem] text-faint">
        {total} entries · {skills.length} groups
      </p>

      <dl className="mt-6 divide-y divide-line border-y border-line">
        {skills.map((g) => (
          <div key={g.key} className="grid gap-x-8 gap-y-2.5 py-4 sm:grid-cols-[12rem_1fr]">
            <dt className="pt-0.5 font-mono text-[0.85rem] text-muted">{g.group}</dt>
            <dd>
              <TagList items={g.items} label={g.group} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
