import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "../components/Section";
import { CopyButton } from "../components/CopyButton";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { links } from "../content/resume";

function Row({ label, children, action }: { label: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto]">
      <dt className="col-span-2 font-mono text-[0.82rem] text-faint sm:col-span-1">{label}</dt>
      <dd className="min-w-0 break-all font-mono text-[0.92rem]">{children}</dd>
      {action ? <dd className="justify-self-end">{action}</dd> : <dd aria-hidden="true" />}
    </div>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link-term inline-flex items-center gap-1">
      {children}
      <ArrowUpRight aria-hidden="true" size={14} className="shrink-0 text-faint" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function Contact() {
  useDocumentMeta("contact", "Contact Sourav Das — email, GitHub, LinkedIn and resume.");

  return (
    <Section as="h1" command="/contact" id="page-title">
      <p className="max-w-[60ch] text-muted">
        Reach me through any of the channels below.
      </p>

      <dl className="mt-6 divide-y divide-line border-y border-line">
        <Row label="email" action={<CopyButton value={links.email} label="Copy email address" />}>
          <a href={`mailto:${links.email}`} className="link-term">
            {links.email}
          </a>
        </Row>
        <Row label="github">
          <External href={links.github}>github.com/{links.githubHandle}</External>
        </Row>
        <Row label="linkedin">
          <External href={links.linkedin}>linkedin.com/in/{links.linkedinHandle}</External>
        </Row>
        <Row label="resume">
          <a href={links.resume} target="_blank" rel="noopener" className="link-term inline-flex items-center gap-1">
            SouravDas_Resume.pdf
            <ArrowUpRight aria-hidden="true" size={14} className="shrink-0 text-faint" />
            <span className="sr-only">(PDF, opens in a new tab)</span>
          </a>
        </Row>
      </dl>
    </Section>
  );
}
