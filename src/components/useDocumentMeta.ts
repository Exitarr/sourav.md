import { useEffect } from "react";
import { useInline } from "./inline";

const SITE = "sourav.md";
const DEFAULT_DESCRIPTION =
  "Sourav Das — Software Engineer at American Express working on backend services, REST APIs, distributed performance benchmarking and enterprise data security.";

/** Sets <title> and meta description for the current route. */
export function useDocumentMeta(title: string | null, description = DEFAULT_DESCRIPTION) {
  // Pages shown inside the terminal must not retitle the page the visitor is actually on.
  const inline = useInline();
  useEffect(() => {
    if (inline) return;
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Sourav Das, Backend Engineer`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [inline, title, description]);
}
