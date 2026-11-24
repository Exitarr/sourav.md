import { links, projects } from "./content/resume";

export type Command = {
  name: string;
  description: string;
  /** Route to navigate to, if this command is a page. */
  path?: string;
  /** URL opened in a new tab. */
  href?: string;
  action?: "help" | "clear";
};

/** Every command the terminal understands. The home page lists them from here too. */
export const commands: Command[] = [
  { name: "/info", description: "who I am, what I work on", path: "/" },
  { name: "/work", description: "professional experience", path: "/work" },
  { name: "/skill", description: "technical skills", path: "/skill" },
  { name: "/project", description: "projects · /project <name> for details", path: "/project" },
  { name: "/education", description: "degree and institution", path: "/education" },
  { name: "/contact", description: "email, GitHub, LinkedIn", path: "/contact" },
  { name: "/resume", description: "open my resume (PDF)", href: links.resume },
  { name: "/help", description: "list available commands", action: "help" },
  { name: "/clear", description: "clear terminal output", action: "clear" },
];

/** `/project <slug>` opens a project's detail page. */
const projectCommands: Command[] = projects.map((p) => ({
  name: `/project ${p.slug}`,
  description: p.name,
  path: `/project/${p.slug}`,
}));

function normalize(input: string) {
  const raw = input.toLowerCase().replace(/^\s*cd\s+/, "").replace(/\s+/g, " ").trimStart();
  return raw.startsWith("/") ? raw : `/${raw}`;
}

/** Accepts "/work", "work", "cd work", "/project <slug>", case-insensitive. */
export function resolveCommand(input: string): Command | undefined {
  const name = normalize(input).trimEnd().replace(/\/+$/, "");
  if (name === "/" || name === "") return undefined;
  return commands.find((c) => c.name === name) ?? projectCommands.find((c) => c.name === name);
}

export function suggest(input: string): Command[] {
  if (!input.trim().startsWith("/")) return [];
  const q = normalize(input);
  // After "/project " suggest project names; otherwise top-level commands.
  if (q.startsWith("/project ")) return projectCommands.filter((c) => c.name.startsWith(q.trimEnd()));
  return commands.filter((c) => c.name.startsWith(q.trimEnd()));
}
