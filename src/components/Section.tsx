import type { ReactNode } from "react";
import { Prompt } from "./Prompt";

type Props = {
  command: ReactNode;
  id: string;
  children: ReactNode;
  as?: "h1" | "h2";
};

/** A `> /command` heading followed by its output, set off with a ⎿ output gutter. */
export function Section({ command, id, children, as = "h2" }: Props) {
  return (
    <section aria-labelledby={id}>
      <Prompt as={as} id={id}>
        {command}
      </Prompt>
      <div className="mt-3 flex gap-3 pl-1">
        <span aria-hidden="true" className="select-none font-mono text-[0.9rem] leading-[1.65] text-faint">
          ⎿
        </span>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}
