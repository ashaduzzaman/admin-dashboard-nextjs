# PLAN.md — Wiring this dashboard to `multi-tenant-express-api`

> Companion to `CLAUDE.md` (theme/component reference — still accurate) and
> `IMPLEMENTATION.md` (build log for this integration work). Also read
> `../INDEX.md` first — it's the entry point for how this repo relates to
> the backend. Keep this file current as decisions change; it's read before
> new integration work starts, not a one-time planning artifact.

## 0. Starting point — what actually exists today

This repo was scaffolded as a **generic, standalone dashboard template**
("Command Center" — an infrastructure/DevOps monitoring theme: system
throughput charts, "AWS region indicators," simulated live metrics). It
predates any awareness of the backend's actual domain. Concretely, as of
this plan:

- No API client, no `fetch` calls to anything, no env vars, no `.env.local`.
- No auth pages at all — no login, no register, no session concept. The app
  just renders.
- Every data-bearing component is either hardcoded (`app/data/notifications.ts`,
  the Data Explorer's "6 sample users") or client-side simulated
  (`useRealTimeData` fabricates numbers on an interval).
- The domain shown (system alerts, throughput, infrastructure metrics) has
  **no corresponding backend module** — per the backend's `MODULES.md`,
  there is no analytics/metrics/observability-facing API. Some of these
  components (`ThroughputChart`, `SystemAlerts`, `LiveMetrics`) don't map to
  anything real yet and are called out explicitly below.

This is not a small integration task — it's closer to repurposing a themed
shell around a different domain. The plan below is scoped so that what
_does_ map cleanly (auth, users, roles) gets wired first and for real,
while what doesn't (system-monitoring widgets) is explicitly parked rather
than silently left as fake data pretending to be real.

## 1. Decisions

| Decision               | Choice                                                                                                                                                                                                 | Why                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend access pattern | **Next.js Route Handlers as a server-side proxy** (`app/api/**/route.ts` → `fetch` to `API_BASE_URL`)                                                                                                  | The backend's auth is httpOnly cookies. Calling it directly from the browser means cross-origin cookies (`SameSite=None; Secure`, HTTPS even in dev) — solvable but fragile. Proxying means the browser only ever talks to the Next.js origin; Next.js's server relays the backend's `Set-Cookie` header back to the browser as its own. No CORS configuration needed on either side for this path. |
| Backend URL config     | `API_BASE_URL` (server-only env var, **not** `NEXT_PUBLIC_*`)                                                                                                                                          | The client bundle never needs to know where the Express API lives — only the Next.js server does, inside route handlers / Server Components / Server Actions.                                                                                                                                                                                                                                       |
| Data fetching style    | Server Components + Server Actions where possible, thin route-handler proxies where a client component needs imperative calls (e.g. a login form submit)                                               | Matches Next.js 15 App Router idioms; avoids a client-side data-fetching library (SWR/React Query) that this template doesn't have and doesn't need yet for CRUD-shaped pages.                                                                                                                                                                                                                      |
| Visual identity        | **Keep the glass-panel dark theme and component primitives** (`MetricCard`, `DataTable`, `Sidebar`, `TopNav`, theme system). Repurpose their _content_, don't rebuild the design system.               | The theme work is genuinely polished and reusable; the mismatch is domain (infra-monitoring vs. SaaS tenant admin), not visual quality.                                                                                                                                                                                                                                                             |
| Out-of-scope widgets   | `ThroughputChart`, `SystemAlerts`, `LiveMetrics` — **parked, not deleted, not wired to fake-real data.**                                                                                               | No backend module backs these (no metrics/audit-log API exists — see backend `MODULES.md` §5). Wiring them to anything now would mean inventing fake "real" data, which is worse than clearly-fake placeholder data. Revisit once the backend has an audit-log or metrics module.                                                                                                                   |
| Testing                | Vitest + React Testing Library for components/logic, Playwright (or a Next.js-native equivalent) for the auth flow E2E — **write the test before the implementation**, same discipline as the backend. | Carrying forward the backend's TDD requirement; a login flow with cookie handling is exactly the kind of thing that's easy to believe works and actually doesn't.                                                                                                                                                                                                                                   |

## 2. Integration contract

- **Success shape:** `{ data: <payload> }` — see backend `CLAUDE.md`.
- **Error shape:** `{ error: { code, message, details?, requestId? } }` with
  the HTTP status already set correctly by the backend. The frontend's API
  client should surface `code`/`message` uniformly, not re-derive meaning
  from the status code alone.
- **Auth cookies:** `mt_access` (15m) and `mt_refresh` (30d, path-scoped to
  `/api/v1/auth/refresh` on the backend's own origin). Once proxied, the
  Next.js server sees these on its `fetch` response and must re-emit them
  as `Set-Cookie` on its own route handler's response for the browser to
  store them against the Next.js origin.
- **Login requires `tenantSlug`** alongside email/password (email is only
  unique per-tenant on the backend — see backend `PLAN.md`'s auth design
  note). The login form needs a tenant-slug field; there is no "look up my
  tenant by email" endpoint.
- **Permissions:** `GET /api/v1/auth/me` returns `{ user, permissions }`.
  Nav items / action buttons should be conditionally rendered off
  `permissions`, not off role name — the backend's RBAC is permission-based,
  not role-based, by design.

## 3. Page-to-endpoint mapping

| Page                                                                   | Backend endpoint(s)                                                   | Notes                                                                                                                                                                                                              |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Login** (new)                                                        | `POST /api/v1/auth/login`                                             | Fields: tenantSlug, email, password.                                                                                                                                                                               |
| **Register / create workspace** (new)                                  | `POST /api/v1/auth/register`                                          | Fields: tenantName, tenantSlug, email, password, name.                                                                                                                                                             |
| **Dashboard shell** (`app/page.tsx`, repurposed)                       | `GET /api/v1/auth/me`                                                 | Drives the identity shown in `Sidebar`'s user section and gates the whole authenticated layout.                                                                                                                    |
| **Data Explorer → Users** (`app/data-explorer/`, repurposed)           | `GET/POST/PUT/DELETE /api/v1/users`, `PUT /api/v1/users/:id/password` | The existing `DataTable` component is a good fit as-is — swap the hardcoded 6-row array for a real fetch. Gate create/edit/delete controls on `users:create`/`users:update`/`users:delete`.                        |
| **Settings → Roles & permissions** (`app/settings/`, repurposed)       | `GET/POST/PUT/DELETE /api/v1/roles`, `GET /api/v1/roles/permissions`  | Replaces the current API-Keys/Access-Control/Danger-Zone content (none of which has a backend counterpart — see below) with real role management.                                                                  |
| **Settings → API Keys, Access Control, Danger Zone** (existing)        | _(none — no backend module yet)_                                      | Per `MODULES.md`: no API-key module, no per-tenant access-control/rate-limit config, no tenant-deletion endpoint. Leave clearly marked as "coming soon" / disabled rather than functional-looking against nothing. |
| `ThroughputChart`, `SystemAlerts`, `LiveMetrics`, `NotificationsPanel` | _(none)_                                                              | Parked per §1. `NotificationsPanel` specifically could eventually back onto a real notifications module (explicitly deferred on the backend too — same module, same timeline).                                     |
| `/docs` page                                                           | n/a                                                                   | Internal theme documentation; unaffected by this work.                                                                                                                                                             |

## 4. Phased build order

TDD throughout: test first, per §1's testing decision. Each phase is a
`feature/{name}` branch, PR'd into `dev` for review — see `CLAUDE.md`'s
git-workflow section. **Phase 0 (CI/CD) goes first, before any other work**
— corrected mid-project: the three-tier `feature/* → dev → staging → main`
model needs CI passing at every hop from the very first PR, not bolted on
after Phase 1 (or later) has already accumulated ungated merges.

### Phase 0 — CI/CD (GitHub Actions gating every PR)

Its own `feature/ci-github-actions` branch, PR'd for review like everything
else, but it goes first. Expanded past the original sketch after the user
reviewed a first draft and asked for the fuller foundation+dev+staging tier
before merging — see the backend's `PLAN.md` §16 for the fuller version of
the same design; this one is smaller only because there's no database and
no test tooling yet, not because the process differs.

### `ci.yml` — every PR, all three target branches

**Trigger:** `pull_request` targeting `dev`, `staging`, **or** `main` — one
workflow, three target branches, same checks at every promotion.
`concurrency` + `cancel-in-progress` so a new push supersedes a stale run.

**Jobs (all independent, run in parallel):**

1. `lint-and-format` — `eslint .` + `prettier --check .`. Neither existed
   as a working command before this: `eslint` itself was never installed
   despite `eslint.config.mjs` existing, and Prettier wasn't configured at
   all. Both fixed as part of this work (see `IMPLEMENTATION.md`).
2. `typecheck` — `tsc --noEmit` (new script; didn't exist before).
3. `build` — `npm run build`. Next.js's production build also runs a full
   TypeScript typecheck, so this is somewhat redundant with (2) — kept
   anyway since it catches build-config issues typecheck alone wouldn't
   (e.g. the `swcMinify` no-op this work also found and removed).
4. `secret-scan` — `gitleaks/gitleaks-action@v3`, same as the backend.
   Personal-account repo, no license key needed.
5. `dependency-audit` — `npm audit --audit-level=high`. Non-blocking on
   `dev`, blocking on `staging`/`main`. **Found and fixed a critical
   Next.js RCE plus several high-severity transitive vulnerabilities** at
   implementation time — see `IMPLEMENTATION.md` for the full list and why
   the fix was a major-version bump (Next 15→16) rather than a suppression.
6. `test` — **still not added, on purpose.** A green check that runs zero
   tests is worse than no check — don't stand this up until Phase 1 lands
   real testing tooling.

**Action versions** (verified against the GitHub API at implementation
time, not assumed): `actions/checkout@v7`, `actions/setup-node@v7`,
`gitleaks/gitleaks-action@v3`.

### `docker.yml` — post-merge only, not every PR

Same design as the backend's (see its `PLAN.md` §16): build → Trivy scan
(fails on CRITICAL/HIGH) → push to GHCR only if the scan passed, triggered
on `push` to `staging`/`main` only. Needs `next.config.ts`'s new
`output: "standalone"` (this repo had no Docker support at all before —
added a multi-stage `Dockerfile` alongside it as part of this work).

### Explicitly not built here — needs infrastructure decisions first

Same two things as the backend, for the same reason: `deploy-*.yml`
workflows (no hosting provider/accounts decided yet) and Playwright E2E
(nothing meaningful to test until there's a real login flow — Phase 3).

- **Branch protection:** once the workflow files exist, the user needs to
  mark the CI jobs "required" on `dev`, `staging`, and `main` in GitHub's
  repo settings — a repo-admin action, not something committable in a
  workflow file.

### Phase 1 — Layout & UI foundation, ported from `RIS-app-frontend` (no backend connection)

**Goal:** replace this repo's generic template shell with the proven layout
and app architecture already built and running in production at
`RIS-app-frontend` (sibling repo, `Forklift-operation/RIS-app-frontend`) —
adapted to this app's own (much smaller) navigation, not redesigned from
scratch. Fully standalone: runs and looks correct with a stubbed auth
state, zero calls to `multi-tenant-express-api`. Real backend wiring starts
at Phase 1.

Both repos already share the same design tokens (confirmed: identical
`--primary`/`--surface`/etc. CSS variables, same font stack) — this repo's
template was clearly bootstrapped from the same design system, just without
the real components behind it. That makes this closer to "restore the real
components" than "port a foreign design."

**Ported as-is (generic, no RIS-domain content in them):**

- `DataTable.tsx` — column config, sort callback, mobile-card responsive
  layout, skeleton loading, empty state. Needs zero changes to later serve
  Users/Roles pages.
- `Pagination.tsx`, `Badge.tsx`, `DeleteConfirmModal.tsx`, `ToastStack.tsx`
  (+ `lib/toast.ts`/`toastStore.ts`), `AppShellSkeleton.tsx`.
- `ThemeContext.tsx`, `SidebarContext.tsx`, `ThemeToggle.tsx`,
  `ThemeCustomizer.tsx`, `AccessibilityToggle.tsx`.
- `globals.css` + `tailwind.config.ts` — reconcile the small drift (RIS's
  config has `accent-warning` plus a couple of extra keyframes this repo's
  doesn't); take the superset.

**Ported as a pattern, content replaced:**

- `ClientLayout.tsx` — the composition order (`ThemeProvider` →
  `SidebarProvider` → `QueryClientProvider` → `AuthProvider` → `ToastStack`
  → `AuthGuard`) and the `AuthGuard` logic itself (public-route allowlist,
  redirect-to-`/login`, return-URL preservation via `sessionStorage`,
  permission-based route protection via a `ROUTE_PERMISSIONS` prefix list)
  are worth keeping verbatim. **`AuthProvider`'s internals stay a stub**
  (local state, no fetch) until Phase 5 — Phase 1 needs the shape to exist
  so the layout compiles and renders, not the real thing.
- `Sidebar.tsx` — keep the structural pattern (accordion nav sections keyed
  by an array, permission-filtered items, active-route highlighting via
  `usePathname`, profile popup with logout). Replace `NAV_ITEMS`/section
  content with this app's real nav: Dashboard, Users, Roles, Settings —
  nothing else exists per backend `MODULES.md`.
- `TopNav.tsx` — keep the shell (sticky header, sidebar-toggle button,
  right-side icon cluster: `ThemeToggle`/`ThemeCustomizer`/
  `AccessibilityToggle`). Drop the QR-scanner button and its `apiGet` call
  (vehicle-specific). Keep `NotificationsPanel` mounted but parked (per §1's
  existing "out of scope" list) until a notifications module exists.
- `config/navigation.ts` — keep the pattern (typed `NavItem[]` +
  `ROUTE_PERMISSIONS` prefix-match array), replace content with this app's
  actual permission names from the backend's real catalog (`users:read`,
  `roles:create`, etc. — see backend `src/config/permissions.ts`, not
  RIS's `vehicle_lists:read`/`checklist_templates:read`/etc.).
- `login/page.tsx` + `login/layout.tsx` — keep the visual design (glass-panel
  card, logo, email/password fields, show/hide toggle, error banner).
  **Add a `tenantSlug` field** — the one thing with no RIS precedent, since
  this backend's login needs it and RIS-app-api's (single-tenant) doesn't.
  Submit handler stays a stub calling the not-yet-real `AuthContext.login()`
  until Phase 3.

**Explicitly NOT ported (so it's a decision, not forgotten scope):**

- Every RIS-domain page: `/admin/*` (except users/roles), `/batches`,
  `/products`, `/orders`, `/lab`, `/maintenance-*`, `/eye-wash-*`,
  `/vehicle-lists`, `/restricted-component-inspection`, `/checklist-*`,
  `/reports/*`.
- `QuickActionsMenu.tsx`, `RadialMenu.tsx`, `QrScannerModal.tsx`,
  `MobileBottomNav.tsx`, `components/dashboard/*`
  (CountUp/Meter/ModuleCard/ModuleDetailModal/Sparkline),
  `AttachmentsPanel`/`AttachmentViewerOverlay`/`PdfViewerOverlay`/
  `ViewerShell`/`FileTypeIcon`/`ProductPicker` — all tied to RIS features
  with no backend counterpart here.
- `lib/api-client.ts` is **not** ported in Phase 1 (no backend connection
  yet), but flagging now for Phase 2: **RIS-app-frontend's proven pattern is
  direct cross-origin `fetch` with `credentials: "include"` against
  `NEXT_PUBLIC_API_URL`** (backend CORS + credentials, no proxy) — not the
  Route Handler proxy this plan currently recommends in §1. That's a real
  precedent worth weighing against the proxy approach before Phase 2 starts,
  not after. Revisit then; not deciding it in Phase 1.

**New dependency:** `@tanstack/react-query` — RIS-app-frontend's data-table/
pagination pattern assumes it, and this repo currently has no data-fetching
library at all. Check whether `framer-motion` is used broadly enough in the
ported pieces to justify adding it, or only in spots this plan is skipping.

**Testing (Phase 1 has no backend, so these are component/render-level
only):** Sidebar renders nav items filtered by a stubbed permission set;
`AuthGuard` redirect logic against a stubbed `useAuth`; Login page renders
and validates required fields (including the new `tenantSlug`); DataTable
renders its columns/sort-toggle/loading-skeleton/empty states. This is also
where Vitest + React Testing Library (§1) actually get installed and wired,
not just decided on paper.

### Phase 2 — Plumbing (backend wiring starts here)

`API_BASE_URL` env var + `.env.local.example`, a typed fetch helper
(`lib/backend.ts`?) that talks to the backend and normalizes the
`{ data }` / `{ error }` envelope, a first Route Handler proxying one real
endpoint end-to-end as a spike (`/api/v1/auth/me` is the simplest — no
body, cookie-only). _(Revisit the proxy-vs-direct-CORS decision from §4
Phase 1's flag before writing this.)_

### Phase 3 — Login

Form, submit → route handler → backend `/auth/login` → relay `Set-Cookie` →
redirect to dashboard. E2E test: wrong tenant slug / wrong password / wrong
email all produce the same generic error (matches backend behavior — the UI
shouldn't accidentally leak which one was wrong via different messages).

### Phase 4 — Register

Same shape as Login, against `/auth/register`.

### Phase 5 — Authenticated shell

Middleware or a layout-level check calling `/auth/me`; redirect to `/login`
when it fails; populate `Sidebar`'s user section and store `permissions` in
a context for gating. This is where Phase 1's stubbed `AuthProvider`
becomes real.

### Phase 6 — Logout

Clear session, redirect to `/login`.

### Phase 7 — Users page

Real list via `DataTable`, create/edit/delete forms gated on permissions.

### Phase 8 — Roles page

List, create, edit (permission checkboxes from `GET /roles/permissions`),
delete (respecting system-role protection — surface the backend's 403/409
responses as real UI states, not generic errors).

### Phase 9 — Cleanup pass

Mark the not-yet-backed Settings sections and the parked widgets clearly,
so the dashboard never implies a capability that doesn't exist yet.

## 5. Explicitly out of scope this pass

Anything in the backend's `MODULES.md` marked ⬜/🚧 that this dashboard's
existing UI gestures toward but has no real endpoint for: API keys,
per-tenant access control/rate limits, tenant deletion (danger zone),
notifications, audit log, billing, analytics. Wiring the UI shell for these
is worse than leaving them visibly unfinished — revisit each as its backend
module ships (see backend `MODULES.md`'s suggested next-pass order).
