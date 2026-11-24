import { useEffect } from "react";

const SITE = "sourav.md";
const DEFAULT_DESCRIPTION =
  "Sourav Das — Software Engineer at American Express working on backend services, REST APIs, distributed performance benchmarking and enterprise data security.";

/** Sets <title> and meta description for the current route. */
export function useDocumentMeta(title: string | null, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Sourav Das, Backend Engineer`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
