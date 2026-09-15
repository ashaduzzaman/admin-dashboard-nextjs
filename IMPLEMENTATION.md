# IMPLEMENTATION.md — Live progress log

> Companion to `PLAN.md`. Updated after every completed step, in order.
> Status legend: `[ ]` pending, `[~]` in progress, `[x]` done, `[!]` blocked/deviation (explained inline).

## Assessment & planning (preamble — not a numbered phase)
- [x] Read the backend repo's `CLAUDE.md`/`PLAN.md`/`IMPLEMENTATION.md`/`MODULES.md` to understand what actually exists to integrate against
- [x] Audited this repo's actual state: confirmed zero backend integration — no API client, no env vars, no auth pages, all data hardcoded or client-simulated
- [x] Identified the domain mismatch: this template's content (infra monitoring: throughput, system alerts) doesn't correspond to any backend module; only Users/Roles/Auth map cleanly
- [x] Decided the integration architecture (Next.js Route Handler proxy, server-only `API_BASE_URL`) — see `PLAN.md` §1. **Flagged for reconsideration** once `RIS-app-frontend` was reviewed (Phase 1 below) — it uses direct cross-origin `fetch` + CORS instead, a real working precedent. Revisit at the start of Phase 2, not decided yet either way.
- [x] Decided the common ground / entry point of implementation: auth (login → `/me` → authenticated shell) — see `../INDEX.md`
- [x] `PLAN.md` written
- [x] `IMPLEMENTATION.md` written (this file)
- [x] `CLAUDE.md` updated with backend-integration rules (was purely theme/component documentation before), then again with the git-workflow rules (feature branches, no-attribution commits, PR-to-dev-to-staging-to-main)
- [x] Reviewed `RIS-app-frontend` (sibling repo) end-to-end to plan Phase 1 — see `PLAN.md` §4 Phase 1 for the full ported/not-ported breakdown
- [x] **Corrected mid-project:** CI/CD moved from last phase to Phase 0 — it has to exist before the first gated PR in the new three-tier `feature/* → dev → staging → main` model, not after other phases have already merged without it. All phase numbers below shifted by one accordingly.

## Phase 0 — CI/CD (GitHub Actions gating every PR)
See `PLAN.md` §4 Phase 0. Its own `feature/ci-github-actions` branch, per the git-workflow rule — implement this before Phase 1.
- [ ] `.github/workflows/ci.yml`: `pull_request` → `[dev, staging, main]`
- [ ] `lint` job
- [ ] `build` job (Next.js build = free typecheck)
- [ ] `test` job — **only added once Phase 1's testing tooling actually exists** (don't stand up an empty green check)
- [ ] Tell the user to mark checks as required on `dev`, `staging`, and `main` in GitHub repo settings (repo-admin action, not committable)

## Phase 1 — Layout & UI foundation, ported from `RIS-app-frontend`
No backend connection in this phase — see `PLAN.md` §4 Phase 1 for the full list of what's ported as-is, what's ported as a pattern with content replaced, and what's explicitly not ported.

- [ ] Add `@tanstack/react-query` dependency; decide on `framer-motion` (only if genuinely used by ported pieces)
- [ ] Install and wire Vitest + React Testing Library (this repo has zero test tooling today)
- [ ] Port as-is: `DataTable.tsx`, `Pagination.tsx`, `Badge.tsx`, `DeleteConfirmModal.tsx`, `ToastStack.tsx` + `lib/toast.ts`/`toastStore.ts`, `AppShellSkeleton.tsx`
- [ ] Port as-is: `ThemeContext.tsx`, `SidebarContext.tsx`, `ThemeToggle.tsx`, `ThemeCustomizer.tsx`, `AccessibilityToggle.tsx`
- [ ] Reconcile `globals.css` + `tailwind.config.ts` against RIS-app-frontend's (take the superset — `accent-warning` + extra keyframes)
- [ ] Port `ClientLayout.tsx` composition + `AuthGuard` logic (public-route allowlist, return-URL preservation, permission-based route protection); `AuthProvider` stays a local-state stub
- [ ] Port `Sidebar.tsx` structure with this app's own nav (Dashboard, Users, Roles, Settings)
- [ ] Port `TopNav.tsx` shell (drop QR-scanner button; keep NotificationsPanel mounted but parked)
- [ ] Port `config/navigation.ts` pattern with this app's real permission names (`users:*`, `roles:*`)
- [ ] Port `login/page.tsx` + `layout.tsx` visual design, add the new `tenantSlug` field, stub submit handler
- [ ] Tests: Sidebar permission-filtering, AuthGuard redirect logic (stubbed `useAuth`), Login page validation incl. `tenantSlug`, DataTable states (sort/loading/empty)
- [ ] Confirm the app runs standalone (`npm run dev`), looks right, zero calls to `multi-tenant-express-api`

## Phase 2 — Plumbing
- [ ] `API_BASE_URL` env var + `.env.local.example`
- [ ] Typed fetch helper normalizing the backend's `{ data }` / `{ error }` envelope
- [ ] Spike: one real Route Handler proxying `GET /api/v1/auth/me` end-to-end, cookie relay verified manually

## Phase 3 — Login
- [ ] Login page (tenantSlug + email + password)
- [ ] Route handler → backend `/auth/login`, relays `Set-Cookie`
- [ ] Test: wrong tenant/email/password all produce the same generic error in the UI

## Phase 4 — Register
- [ ] Register page (tenantName, tenantSlug, email, password, name)
- [ ] Route handler → backend `/auth/register`

## Phase 5 — Authenticated shell
- [ ] Session check (middleware or layout-level) calling `/auth/me`, redirect to `/login` on failure
- [ ] `Sidebar` user section populated from real identity
- [ ] Permissions available to gate nav items / action buttons

## Phase 6 — Logout
- [ ] Clear session, redirect to `/login`

## Phase 7 — Users page (repurposed Data Explorer)
- [ ] Real list via existing `DataTable` component
- [ ] Create/edit/delete forms, gated on `users:create`/`users:update`/`users:delete`
- [ ] Password-change action (self or `users:update`)

## Phase 8 — Roles page (repurposed Settings)
- [ ] List roles + permission catalog
- [ ] Create/edit (permission checkboxes)
- [ ] Delete, surfacing the backend's real 403 (system role) / 409 (users assigned) as real UI states

## Phase 9 — Cleanup pass
- [ ] Mark not-yet-backed Settings sections (API Keys, Access Control, Danger Zone) as clearly unfinished, not functional-looking
- [ ] Mark parked widgets (`ThroughputChart`, `SystemAlerts`, `LiveMetrics`) the same way, or remove from primary nav until a backing module exists

## Deviations / decisions made during implementation

- **Renamed the original "Phase 0 — Assessment & planning" to a non-numbered
  preamble**, then **shifted every phase number by one** when CI/CD was
  inserted as the real Phase 0. Both changes exist so "Phase N" means the
  same thing in this file, `PLAN.md`, and conversation history going
  forward — worth the churn once, up front, rather than carrying a
  numbering mismatch for the rest of the project.
- **Created `dev` and `staging` branches (from `main`) in both this repo and
  the backend, and pushed them to origin** — the three-tier
  `feature/* → dev → staging → main` workflow needs both to exist, and
  neither repo had either.
