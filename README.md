# sourav.md

Personal portfolio of Sourav Das, Backend Engineer. A static single-page site styled like a developer terminal. You navigate it by typing slash commands (`/work`, `/project`, …) into a prompt pinned to the bottom of every page.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · daisyUI v5 (one custom matte theme) · React Router v7 · lucide-react (3 icons). Fonts are self-hosted (Inter + JetBrains Mono, Latin subset, WOFF2).

## Run locally

Requires Node.js 20+.

```sh
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Where things live

| Path | What |
|---|---|
| `src/content/resume.ts` | **All site content**, from the resume. Edit this to update the site. |
| `src/commands.ts` | Terminal commands (`/info`, `/work`, …) and their routes |
| `src/components/Terminal.tsx` | The command prompt: completions, history, navigation |
| `src/components/Shell.tsx` | Page frame: header path, main, terminal |
| `src/components/PixelLogo.tsx` | Animated logo, generated from `design/sourav-pixel-logo.svg` |
| `src/pages/*` | One lazily loaded file per route |
| `src/styles.css` | Tailwind + daisyUI theme tokens, fonts, logo animation |
| `public/` | Resume PDF, fonts, favicon, `_headers`, `robots.txt` |

## Routes

`/` (also `/info`) · `/work` · `/skill` · `/project` · `/project/:slug` · `/education` · `/contact`. Any other path shows the "Unknown command" page.

## Terminal

Type `/` anywhere to focus it. Tab completes, ↑/↓ moves through history or suggestions, Esc clears, and Ctrl+L clears the output. `/project ` followed by a space lists projects. `/resume` opens the PDF.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Output directory: `dist`

Client-side routes work without extra config: Pages serves `index.html` for unknown paths when there is no `404.html`. `public/_headers` sets long-lived caching for hashed assets and fonts.
