import { Link, useParams } from "react-router";
import { Section } from "../components/Section";
import { ProjectBody } from "../components/ProjectBody";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { projectGroups, projects } from "../content/resume";

export default function ProjectDetail({ slug: slugProp }: { slug?: string }) {
  const params = useParams();
  const slug = slugProp ?? params.slug ?? "";
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  useDocumentMeta(project ? project.name : "project not found", project?.tagline);

  if (!project) {
    return (
      <Section as="h1" command={`/project ${slug}`} id="page-title">
        <p className="font-mono text-[0.85rem] text-[#c98a7c]">No project named “{slug}”.</p>
        <p className="mt-3 font-mono text-[0.85rem]">
          <Link to="/project" className="link-term">
            /project
          </Link>{" "}
          <span className="text-faint">— see all projects</span>
        </p>
      </Section>
    );
  }

  const group = projectGroups.find((g) => g.id === project.group);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <Section as="h1" command={`/project ${project.slug}`} id="page-title">
      <p className="font-mono text-[0.75rem] uppercase tracking-wider text-faint">
        {group?.label} · {project.kind}
      </p>
      <h2 className="mt-1 text-[clamp(1.35rem,3.6vw,1.75rem)] font-semibold leading-tight tracking-tight text-ink">
        {project.name}
      </h2>
      <p className="mt-2 mb-6 max-w-[62ch] text-muted">{project.tagline}</p>

      <ProjectBody project={project} />

      <nav aria-label="Project navigation" className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-[0.82rem]">
        <Link to="/project" className="link-term">
          ← /project
        </Link>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to={`/project/${prev.slug}`} className="link-term text-muted" aria-label={`Previous project: ${prev.name}`}>
            ‹ {prev.slug}
          </Link>
          <Link to={`/project/${next.slug}`} className="link-term text-muted" aria-label={`Next project: ${next.name}`}>
            {next.slug} ›
          </Link>
        </span>
      </nav>
    </Section>
  );
}
