# AGENTS.md (ubed-web)

Read this first. Then read `docs/RULES.md` and `docs/ARCHITECTURE.md` before changing code. Read `docs/DESIGN.md` before touching UI or animation, and `docs/CONTENT_GUIDE.md` before writing or editing a blog post.

## What this repo is
Portfolio + blog for ubed.in. Next.js 16, TypeScript strict, Tailwind, GSAP/Lenis/Framer Motion. Blog = MDX files. No database.

## Commands
```bash
pnpm dev | pnpm typecheck | pnpm lint | pnpm test | pnpm build
```
Run typecheck, lint, and build before saying work is done.

## Hard rules
1. Server-first: text and metadata must be in the initial HTML. Client islands only enhance.
2. Animations: `useGSAP` with scope, cleanup on unmount, reduced-motion path. Details in `docs/DESIGN.md`.
3. Do **not** copy library components into this repo. Reusable components live in the `ubed-ui` repo and come in as `@ubed/ui`. Portfolio-only components stay here.
4. Never commit secrets, `.env*`, purchased/licensed files, or unlicensed memes/images.
5. Commit format: `type(scope): summary` (see `docs/RULES.md`).
6. Blog frontmatter must pass the Zod schema in `src/lib/schemas`.

## Do not
- Add dependencies without a reason noted in the PR.
- Add a database or admin panel (deferred; see `docs/DECISIONS.md`).
- Invent facts, numbers, benchmarks or anecdotes in blog content.
- Change `LICENSES.md` entries without checking the actual license.

## When unsure
Ask for clarification or open an issue; do not guess on licensing, security, or SEO-impacting changes.
