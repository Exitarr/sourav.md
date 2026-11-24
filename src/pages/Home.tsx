import { PixelLogo } from "../components/PixelLogo";
import { Section } from "../components/Section";
import { CommandList } from "../components/CommandList";
import { useDocumentMeta } from "../components/useDocumentMeta";
import { profile } from "../content/resume";
import Info from "./Info";

export default function Home() {
  useDocumentMeta(null);

  return (
    <div className="space-y-14 sm:space-y-16">
      <header className="flex items-center gap-5 sm:gap-8">
        <PixelLogo className="h-[clamp(5.5rem,22vw,10rem)] w-auto shrink-0" />
        <div className="min-w-0">
          <h1 className="font-mono text-[clamp(2.4rem,10vw,5.25rem)] font-bold leading-[0.95] tracking-tight text-ink">
            sourav<span className="text-amber">.md</span>
          </h1>
          <p className="mt-3 font-mono text-[clamp(0.85rem,2.6vw,1rem)] text-ink">
            {profile.name} <span className="text-faint">·</span> Backend Engineer
          </p>
          <p className="mt-0.5 font-mono text-[clamp(0.75rem,2.2vw,0.85rem)] text-muted">
            {profile.team} @ {profile.company}
          </p>
        </div>
      </header>

      <Info />

      <Section command="/help" id="help">
        <p className="mb-4 text-muted">
          Click a command to open its page, or type it in the terminal below to print it right there. Press{" "}
          <kbd className="kbd kbd-sm">/</kbd> anywhere to start, and <span className="font-mono text-ink">/clear</span>{" "}
          to wipe the terminal.
        </p>
        <CommandList linked hide={["/info", "/help", "/clear"]} />
      </Section>
    </div>
  );
}
