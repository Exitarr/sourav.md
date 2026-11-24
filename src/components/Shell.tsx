import { Suspense, useEffect, useRef } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router";
import { Terminal } from "./Terminal";
import { terminalPath } from "../routes";

export function Shell() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new page on client-side navigation (not on first load),
  // unless the user is typing in the terminal.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (document.activeElement?.id === "terminal-input") return;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  const isHome = pathname === "/";
  const cwd = terminalPath(pathname === "/" ? "" : pathname);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[56rem] flex-col px-4 sm:px-6">
      <a
        href="#terminal-input"
        className="sr-only z-20 rounded-sm bg-base-200 px-3 py-2 font-mono text-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        Skip to terminal
      </a>

      <header className="flex h-12 items-center justify-between gap-4 border-b border-line font-mono text-[0.78rem]">
        {isHome ? (
          <span className="text-faint">sourav.md</span>
        ) : (
          <Link to="/" className="rounded-sm text-muted transition-colors hover:text-ink">
            sourav.md
          </Link>
        )}
        <p className="flex min-w-0 items-center gap-2 text-faint">
          <span className="status status-success shrink-0" aria-hidden="true" />
          <span className="sr-only">Current path: </span>
          <span className="truncate">{cwd}</span>
        </p>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 py-10 outline-none sm:py-14">
        <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>

      <Terminal />
      <ScrollRestoration />
    </div>
  );
}
