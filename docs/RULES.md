# RULES: ubed-web

Rules for humans and AI agents.

## 1. Golden rules
1. Server-first: content and metadata in initial HTML.
2. No animation without purpose or without a reduced-motion path.
3. Do not duplicate library components here; use `@ubed/ui`.
4. Never commit secrets, purchased/licensed files, or large raw media.
5. Keep scope small; ship, then refine.

## 2. Naming
| Item | Convention |
| :-- | :-- |
| Files/folders | `kebab-case` (client islands end in `.client.tsx`) |
| Components | `PascalCase`, one per file, named exports (default only for Next pages/layouts) |
| Functions/variables | `camelCase`; booleans `is/has/should`; hooks `use*` |
| Types | `PascalCase`; props `<Component>Props` |
| Constants/env | `SCREAMING_SNAKE_CASE`; client-safe `NEXT_PUBLIC_*` |
| Routes | lowercase, hyphenated |
| Branches | `feat/<name>`, `fix/<name>`, `hotfix/<name>`, `content/<slug>` |

## 3. TypeScript and React
- `strict: true`; no `any` (use `unknown` and narrow).
- Zod at boundaries (contact form, frontmatter, env).
- Server Components by default; `"use client"` only for state, effects, browser APIs.
- No `window`/`document` during render.
- Never swallow errors; route handlers return typed JSON with correct status codes.

## 4. Animation rules
- `useGSAP(() => {...}, { scope })`; no global selectors.
- Register plugins once, client only.
- Animate `transform`/`opacity`; avoid layout-triggering properties.
- Kill/pause on unmount and when offscreen.
- Respect `prefers-reduced-motion`.
- Dynamic-import heavy sections. Cursor effects only for fine pointers.

## 5. Using the library
- Import from `@ubed/ui` only. Do not copy its source here.
- Need a change? Make it in `ubed-ui`, release, then bump the version here.
- Never merge a `link:` or `file:` dependency to `main`.
- Moving a portfolio component into the library: follow `ubed-ui/MAINTENANCE.md`, then delete the local copy and import the package version.

## 6. Git
Commit format: `type(scope): summary`. Types: `feat fix refactor docs test chore perf security ci build`. Scopes: `site`, `blog`, `content`, `seo`, `api`, `deps`, `config`.
| Good | Bad |
| :-- | :-- |
| `feat(blog): add tag archive pages` | `update stuff` |
| `fix(site): prevent CLS on hero font swap` | `fixed bug` |
| `content: add post on pinned scroll sections` | `new post final v2` |
| `perf(site): lazy-load GSAP in skills section` | `changes` |
| `security(api): rate limit contact endpoint` | `wip` |

- Trunk-based; short-lived branches (under 3 days); rebase on `main`; squash merge; delete branch.
- `main` protected: PR + required checks + up-to-date; no force-push or deletion.
- **Never commit:** `.env*`, keys, tokens, `node_modules`, `.next`, large raw media, purchased/licensed files, personal data.

## 7. Content
Follow `docs/CONTENT_GUIDE.md`. Frontmatter must pass the Zod schema. No invented facts or benchmarks.

## 8. Accessibility
One `h1`; landmarks; native elements before ARIA; visible focus; keyboard operable; contrast 4.5:1/3:1; forms with labels and `aria-describedby`; success actions via `aria-live`.

## 9. Security
Secrets only in Vercel/GitHub secrets; contact endpoint uses Zod + honeypot + Turnstile + rate limit; no raw HTML echo; 2FA on GitHub; minimal dependencies.

## 10. Licensing
Keep `LICENSES.md` current. Original or licensed assets only. No film/anime/game/meme-photo material. Confirm font and avatar terms.

## 11. Definition of Done
Types, lint, tests green; a11y checked; Lighthouse budgets met on preview; docs updated; reduced motion verified; new assets recorded in `LICENSES.md`.
