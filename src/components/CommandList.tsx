import { Link } from "react-router";
import { commands, type Command } from "../commands";

function Name({ command, linked }: { command: Command; linked: boolean }) {
  if (linked && command.path) {
    return (
      <Link to={command.path} className="link-term">
        {command.name}
      </Link>
    );
  }
  if (linked && command.href) {
    return (
      <a href={command.href} target="_blank" rel="noopener noreferrer" className="link-term">
        {command.name}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return <>{command.name}</>;
}

/**
 * Table of commands and what they do.
 * With `linked`, page commands become links to their pages (used on the home page);
 * without it, it is plain text (the terminal's /help output).
 */
export function CommandList({
  className = "",
  hide = [],
  linked = false,
}: {
  className?: string;
  hide?: string[];
  linked?: boolean;
}) {
  return (
    <dl className={`grid grid-cols-[minmax(7.5rem,auto)_1fr] gap-x-6 gap-y-1.5 font-mono text-[0.85rem] ${className}`}>
      {commands
        .filter((c) => !hide.includes(c.name))
        .map((c) => (
          <div key={c.name} className="contents">
            <dt className="text-ink">
              <Name command={c} linked={linked} />
            </dt>
            <dd className="text-muted">{c.description}</dd>
          </div>
        ))}
    </dl>
  );
}
