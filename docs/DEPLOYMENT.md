# DEPLOYMENT: ubed-web

## 1. Environments
| Env | Where | Purpose |
| :-- | :-- | :-- |
| Local | `pnpm dev` | Development (`.env.local`) |
| Preview | Vercel preview URL per PR | Review, Lighthouse CI, feedback |
| Production | `ubed.in` | Deploys from `main` |

Preview deployments act as staging.

## 2. Hosting
One Vercel project, `ubed-web`, root directory = repo root. Domains: `ubed.in`, `www.ubed.in`.
> Vercel Hobby is for personal, non-commercial use. If you start earning directly from the site, move to Pro or another host.

## 3. Domain and DNS (GoDaddy + Vercel)
1. Check availability and buy `ubed.in` (already acquired).
2. Create the Vercel project from the GitHub repo.
3. Add `ubed.in` and `www.ubed.in` in the project's Domains.
4. In domain registrar DNS add **exactly the records Vercel shows** (A for `@`, CNAME for `www`). Use dashboard values, not memory.
5. Wait for verification; HTTPS is automatic.
6. Pick one canonical host; redirect the other.
7. The `ui` subdomain is configured in the **`ubed-ui`** Vercel project (see that repo's DEPLOYMENT.md); only the DNS record is added at registrar.
8. Search Console (domain property via DNS TXT) and Bing Webmaster; submit `https://ubed.in/sitemap.xml`.
9. Optional: `hello@ubed.in` via forwarding or a mailbox.

## 4. Environment variables
Documented in `.env.example` (no values). Set per environment in Vercel.
| Variable | Scope | Used by |
| :-- | :-- | :-- |
| `NEXT_PUBLIC_SITE_URL` | public | metadata, sitemap (`https://ubed.in`) |
| `NEXT_PUBLIC_UI_SITE_URL` | public | links to `ui.ubed.in` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | contact form |
| `TURNSTILE_SECRET_KEY` | server | `/api/contact` |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | server | rate limit |
| `WEB3FORMS_ACCESS_KEY` or `RESEND_API_KEY` | server | contact delivery |

Only `NEXT_PUBLIC_*` reaches the client. Never commit `.env*`. Rotate quarterly.

## 5. CI/CD
**On PR:** install (pnpm cache) → typecheck → lint → unit tests → build → Playwright + axe on the preview URL → Lighthouse CI budgets (perf 95, a11y 100, SEO 100, CLS 0.05).  
**On merge to `main`:** Vercel production deploy.  
**Dependency bumps:** Dependabot/Renovate PRs, including `@ubed/ui`; the same CI gates apply.

Skeleton:
```yaml
name: ci
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

## 6. Branch protection (main)
Require PR, required checks, up-to-date branch, linear history (squash), block force-push and deletion.

## 7. Release procedure
Trunk-based: merge to `main` = deploy. Before merging: preview reviewed on mobile and desktop, Lighthouse green, OG image checked (posts), no `link:`/`file:` deps.

## 8. Rollback
| Case | Action |
| :-- | :-- |
| Bad deploy | Vercel dashboard: instant rollback / promote previous deployment; fix forward in a PR |
| Bad `@ubed/ui` bump | Revert the dependency bump commit; pin the previous version |
| DNS mistake | Restore the records shown in the Vercel dashboard |

## 9. Monitoring
Vercel Analytics + Speed Insights; Search Console (coverage, queries, CWV; monthly); uptime monitor on `/` and `/blog`; GitHub notifications for CI failures; Lighthouse CI trend.

## 10. Backups
Git is the backup for code and content. Occasionally mirror the repo. Keep original sticker/design source files in cloud storage. No database, so no DB backups.

## 11. Pre-launch checklist
- [ ] `ubed.in` HTTPS; canonical redirect correct
- [ ] Search Console verified; sitemap submitted; no accidental `noindex`
- [ ] Lighthouse 95+ (mobile) on home, a post, blog index
- [ ] axe clean; keyboard-only run-through; reduced motion verified
- [ ] Contact form tested end to end (including rate limit and Turnstile)
- [ ] OG images render when shared; RSS validates
- [ ] `LICENSES.md` complete (fonts, avatar, stickers)
- [ ] Analytics and uptime monitor on
- [ ] Domain auto-renew on

## 12. Maintenance cadence
| Frequency | Tasks |
| :-- | :-- |
| Weekly | CI failures, Dependabot PRs, post |
| Monthly | Update Next/React/GSAP/Tailwind and `@ubed/ui`; Lighthouse + axe; Search Console review |
| Quarterly | License review; prune deps; rotate secrets |
| Yearly | Domain renewal; hosting terms |
