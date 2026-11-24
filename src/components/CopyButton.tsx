import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies `value` to the clipboard and confirms inline (announced to screen readers). */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for browsers without async clipboard access.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-ghost btn-sm h-8 min-h-8 gap-1.5 rounded-sm border border-line px-2.5 font-mono text-[0.75rem] font-normal text-muted hover:border-line hover:bg-base-200 hover:text-ink"
      aria-label={label}
    >
      {copied ? (
        <Check aria-hidden="true" size={14} className="text-moss" />
      ) : (
        <Copy aria-hidden="true" size={14} />
      )}
      <span aria-live="polite">{copied ? "copied" : "copy"}</span>
    </button>
  );
}
