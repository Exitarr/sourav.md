/** A flat, mono tech token. */
export function Tag({ children }: { children: string }) {
  return (
    <span className="badge badge-sm h-auto min-h-6 rounded-sm border-line bg-transparent px-2 py-0.5 font-mono text-[0.75rem] text-muted">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}
