# DECISIONS (ubed-web)

Short log of choices and why. Add a row when a decision is made or changed.

| Date | Decision | Why | Revisit when |
| :-- | :-- | :-- | :-- |
| 2026-11 | Two repos: `ubed-web` and `ubed-ui` (no cross-everything monorepo) | Portfolio stays independent and can be private; library + docs stay together so components preview instantly | Component churn makes the split painful |
| 2026-11 | Blog as MDX in git, no database | Free, versioned, static, best SEO, no ops | Need comments, views or newsletter |
| 2026-11 | No admin panel in v1 | Solo author works in IDE | Editing friction or non-dev contributors |
| 2026-11 | Portfolio consumes `@ubed/ui` from npm | Proves the package works for outsiders; one source of truth | Release overhead slows portfolio work |
| 2026-11 | Blog at `ubed.in/blog` (folder, not subdomain) | Shares domain authority | n/a |
| 2026-11 | Tokens come from `@ubed/ui/styles.css` | Single theme source across both sites | Portfolio theme diverges heavily |
| Open | UI site at `ui.ubed.in` vs `ubed.in/ui` | Subdomain is simpler; folder shares authority but couples repos (rewrites + `basePath`) | UI site Phase 4 in ubed-ui |
| Open | Contact mail provider (Web3Forms vs Resend) | Free tiers differ | Phase 1 |
