import type { ReactNode } from "react";

type Props = {
  /** The command after the `$`, e.g. "whoami". */
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/** Terminal-style input heading: `> /command`. Renders a real heading element. */
export function Prompt({ children, as: Tag = "h2", id, className = "" }: Props) {
  return (
    <Tag id={id} className={`font-mono text-[0.95rem] font-medium tracking-tight text-ink ${className}`}>
      <span aria-hidden="true" className="mr-2 select-none text-amber">
        &gt;
      </span>
      {children}
    </Tag>
  );
}
