import { Link, useLocation } from "react-router";
import { Section } from "../components/Section";
import { useDocumentMeta } from "../components/useDocumentMeta";

export default function NotFound() {
  const { pathname } = useLocation();
  useDocumentMeta("not found");

  return (
    <Section as="h1" command={pathname} id="page-title">
      <p className="font-mono text-[0.85rem] text-[#c98a7c]">Unknown command: {pathname}</p>
      <p className="mt-3 text-muted">
        That page doesn&apos;t exist. Type <span className="font-mono text-ink">/help</span> in the terminal below, or go
        back to{" "}
        <Link to="/" className="link-term font-mono">
          /info
        </Link>
        .
      </p>
    </Section>
  );
}
