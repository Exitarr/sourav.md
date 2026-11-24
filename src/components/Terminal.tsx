import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { resolveCommand, suggest } from "../commands";
import { CommandList } from "./CommandList";
import { PageOutput } from "./PageOutput";

type Entry = { id: number; input: string; output: ReactNode; error?: boolean };

/** Oldest entries are dropped past this, like a terminal's scrollback limit. */
const SCROLLBACK = 30;

/**
 * Terminal pinned to the bottom of every page.
 * Commands print their output into a scrollback log above the prompt instead of navigating,
 * the way a real shell does; /clear (or Ctrl+L) wipes it. "/" opens completions.
 */
export function Terminal() {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const listId = useId();

  const [value, setValue] = useState("");
  const [log, setLog] = useState<Entry[]>([]);
  const [selected, setSelected] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);

  const matches = suggest(value);
  // Hide the list once the input is exactly one complete command.
  const showSuggestions =
    matches.length > 0 && !(matches.length === 1 && matches[0].name === value.trim().toLowerCase());

  // Press "/" anywhere to start typing a command.
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable='true']")) return;
      e.preventDefault();
      setValue("/");
      setSelected(0);
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Bring each new entry's first line into view; the page scrolls like terminal output.
  const lastId = log[log.length - 1]?.id;
  useEffect(() => {
    if (lastId === undefined) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lastEntryRef.current?.scrollIntoView({
      block: "start",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [lastId]);

  function print(input: string, output: ReactNode, error = false) {
    setLog((l) => [...l, { id: nextId.current++, input, output, error }].slice(-SCROLLBACK));
  }

  function run(input: string) {
    const text = input.trim();
    if (!text) return;
    setHistory((h) => (h[h.length - 1] === text ? h : [...h, text]));
    setHistIndex(-1);
    setValue("");
    setSelected(0);

    const cmd = resolveCommand(text);
    if (!cmd) {
      print(text, `Unknown command: ${text} — type /help to see what's available.`, true);
    } else if (cmd.action === "clear") {
      setLog([]);
    } else if (cmd.action === "help") {
      print(text, <CommandList />);
    } else if (cmd.href) {
      window.open(cmd.href, "_blank", "noopener");
      print(text, "Opened resume in a new tab.");
    } else if (cmd.path) {
      print(text, <PageOutput path={cmd.path} />);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (showSuggestions) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        setSelected((i) => (i + step + matches.length) % matches.length);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setValue(matches[selected].name);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        // A trailing space means "show me the sub-options", so take the highlighted one.
        run(resolveCommand(value) && !/\s$/.test(value) ? value : matches[selected].name);
        return;
      }
    }
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
    } else if (e.key === "Escape") {
      setValue("");
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLog([]);
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown" && histIndex !== -1) {
      e.preventDefault();
      const i = histIndex + 1;
      if (i >= history.length) {
        setHistIndex(-1);
        setValue("");
      } else {
        setHistIndex(i);
        setValue(history[i]);
      }
    }
  }

  const activeId = showSuggestions ? `${listId}-${selected}` : undefined;

  return (
    <>
      {/* Scrollback sits in the page flow so long output scrolls with the page, not inside a box. */}
      <section aria-label="Terminal output" role="log" aria-live="polite" className="font-mono text-[0.82rem]">
        {log.map((entry, i) => (
          <div
            key={entry.id}
            ref={i === log.length - 1 ? lastEntryRef : undefined}
            className="scroll-mt-4 border-t border-line py-6"
          >
            <p className="text-ink">
              <span aria-hidden="true" className="mr-2 select-none text-amber">
                &gt;
              </span>
              {entry.input}
            </p>
            <div className={`mt-2 flex gap-3 pl-1 ${entry.error ? "text-[#c98a7c]" : "text-muted"}`}>
              <span aria-hidden="true" className="select-none text-faint">
                ⎿
              </span>
              <div className="min-w-0 flex-1">{entry.output}</div>
            </div>
          </div>
        ))}
      </section>

      <section aria-label="Terminal" className="sticky bottom-0 z-10 -mx-4 bg-base-100 px-4 pb-3 pt-2 sm:-mx-6 sm:px-6">
        {showSuggestions && (
          <ul id={listId} role="listbox" aria-label="Commands" className="mb-2 font-mono text-[0.82rem]">
            {matches.map((c, i) => (
              <li
                key={c.name}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === selected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  run(c.name);
                }}
                className={`grid cursor-pointer grid-cols-[minmax(7.5rem,auto)_1fr] gap-x-6 px-3 py-0.5 ${
                  i === selected ? "text-amber" : "text-muted"
                }`}
              >
                <span>{c.name}</span>
                <span className={i === selected ? "text-amber/80" : "text-faint"}>{c.description}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 rounded-md border border-line bg-base-100 px-3 transition-colors focus-within:border-[#4a4a4a]">
          <span aria-hidden="true" className="select-none font-mono text-[0.9rem] text-muted">
            &gt;
          </span>
          <label htmlFor="terminal-input" className="sr-only">
            Type a command, for example /work
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            type="text"
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls={showSuggestions ? listId : undefined}
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder='Try "/work" or /help'
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSelected(0);
              setHistIndex(-1);
            }}
            onKeyDown={onKeyDown}
            className="min-h-11 w-full min-w-0 bg-transparent font-mono text-[0.9rem] text-ink caret-amber outline-none placeholder:text-faint focus-visible:outline-none"
          />
        </div>

        <p className="mt-1.5 hidden px-1 font-mono text-[0.72rem] text-faint sm:block">
          / for commands · tab to complete · ↑↓ history · /clear to wipe output
        </p>
      </section>
    </>
  );
}
