import { commands } from "../commands";

/** Plain-text table of commands and what they do. Not clickable — type them in the terminal. */
export function CommandList({ className = "", hide = [] }: { className?: string; hide?: string[] }) {
  return (
    <dl className={`grid grid-cols-[minmax(7.5rem,auto)_1fr] gap-x-6 gap-y-1.5 font-mono text-[0.85rem] ${className}`}>
      {commands
        .filter((c) => !hide.includes(c.name))
        .map((c) => (
          <div key={c.name} className="contents">
            <dt className="text-ink">{c.name}</dt>
            <dd className="text-muted">{c.description}</dd>
          </div>
        ))}
    </dl>
  );
}
