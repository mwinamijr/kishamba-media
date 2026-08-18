# Frontend testing

Three tiers:

```
src/**/*.test.ts(x)   # Vitest + React Testing Library — unit + component, no server needed
e2e/*.spec.ts          # Playwright — real browser against the real backend + Postgres
```

## Unit + component tests (Vitest)

```bash
pnpm test          # run once
pnpm test:watch    # watch mode while developing
```

No backend, no database — `lib/permissions.ts`, `lib/dashboard.ts`, and
`lib/route-access.ts` are pure functions; `UserMenu.tsx` and `Button.tsx`
are rendered with React Testing Library against a real Redux store
(`makeStore()`) with `global.fetch` mocked.

**Verified**: all 41 tests pass in the environment that wrote this
feature — `pnpm test` ran clean, both individually per file and as the
full suite together. Two non-obvious things made this actually work, in
case a future test file hits the same wall:

1. **`global.fetch` must be mocked in `vitest.setup.ts`, not inside a
   test.** `lib/api.ts`'s `fetchBaseQuery` calls `fetch(...)` through a
   closure that resolves the `fetch` identifier at call time, so mocking
   late is fine on that front — the actual trap is that RTK Query's
   `fetchBaseQuery` calls `response.clone()` and `responseClone.text()`
   on whatever the mock resolves to. A hand-rolled `{ ok, status, json:
   () => ... }` object throws (`.clone is not a function`) partway
   through, and the query silently ends up in a `PARSING_ERROR` state —
   which *looks* like "the mock didn't take" from the test's point of
   view, because `data` stays `undefined` either way. The fix is mocking
   with a real `new Response(...)` (jsdom 30 provides one), and using
   `mockImplementation(() => new Response(...))` rather than
   `mockResolvedValue(sameInstance)` — a `Response` body can only be read
   once, so a query that gets refetched (e.g. `getMe` refetching after
   `logout` invalidates the `"Me"` tag) throws on the second read if it's
   the same object reused.
2. **React Testing Library's DOM doesn't auto-clean between tests here.**
   RTL's own `afterEach(cleanup)` only self-registers when it detects a
   *global* `afterEach` (i.e. `vitest.config.ts`'s `test.globals: true`).
   This project's test files import `afterEach` explicitly from
   `"vitest"` instead, so `vitest.setup.ts` calls `cleanup()` in its own
   `afterEach` — without that, every test in a file renders into the same
   jsdom document and earlier tests' elements are still there, causing
   `getByRole`/`findByText` to match stale or duplicate nodes in later
   tests.

## e2e (Playwright)

```bash
pnpm test:e2e
```

**Not executed** in the sandbox that wrote this feature —
`npx playwright install chromium` fails there with `Host not in
allowlist: cdn.playwright.dev`, a network restriction specific to that
sandbox, not a real environment. These specs are written and structurally
reviewed against the actual app (selectors checked against
`ArticleForm.tsx`, `UserMenu.tsx`, `middleware.ts`'s redirect behavior,
etc.) but **have not been run**, so treat `editorial-workflow.spec.ts`
especially as a first draft — the `page.locator("div", { hasText:
headline })` row-matching in particular is the kind of selector that
usually needs a real run to tighten up (Playwright's `hasText` matches
any ancestor containing that text, so `.last()` is a guess at "the
innermost one," not a guarantee).

### Running for real

1. **A dedicated e2e Postgres DB, freshly migrated.** `global-setup.ts`
   bootstraps a `SUPER_ADMIN` via `POST /api/auth/superuser`, which 409s
   if *any* superuser already exists — so this needs an empty DB every
   run, not your dev DB:
   ```bash
   DATABASE_URL="postgresql://kishamba:kishamba_dev_password@localhost:5432/kishamba_e2e" \
     npx prisma migrate reset --force --schema ../backend/prisma/schema.prisma
   ```
2. **Env vars** `playwright.config.ts`'s `webServer` entries need, on the
   backend: the same `DATABASE_URL` as above, plus `JWT_SECRET`,
   `COOKIE_SECRET`, and `SUPERUSER_SAFE_WORD` (`global-setup.ts` reads
   `process.env.SUPERUSER_SAFE_WORD`, so set it in the shell running
   `pnpm test:e2e` too). On the frontend: `JWT_SECRET` matching the
   backend's, for the edge middleware.
3. **Browsers**: `npx playwright install chromium` (works fine outside
   the sandbox that wrote this).
4. `pnpm test:e2e` — this builds and starts both servers itself (see
   `playwright.config.ts`'s `webServer` array), runs `global-setup.ts` to
   seed fixture users, then runs the specs.

### What's covered vs. not

**Covered** (`auth-and-middleware.spec.ts`): public homepage renders,
signed-out header state, `middleware.ts` redirecting an unauthenticated
visitor to `/ingia?next=...` for both `/newsroom` and `/admin`, a
wrong-role authenticated visitor getting bounced to their own dashboard
instead of a 403 page, the `?next=` round-trip actually landing back on
the originally-requested route after login, each role's post-login
landing spot, and the `UserMenu` login/logout cycle.

**Covered** (`editorial-workflow.spec.ts`): the full
`DRAFT → IN_REVIEW → APPROVED → PUBLISHED` path across a REPORTER and an
EDITOR_IN_CHIEF, the newsroom board's per-role action filtering (a
REPORTER doesn't see Idhinisha/Chapisha; a COPY_EDITOR sees the article
but no action buttons), and that a published story is publicly visible.

**Not covered**: the correction flow itself (only that the "Toa
Marekebisho" link *appears* — not clicking through the edit form and
submitting a correctionNote), SECTION_EDITOR category scoping (covered at
the unit level in `src/lib/route-access.test.ts` and on the backend in
`../backend/tests/integration/articles-workflow.test.js`, but not
end-to-end through the UI), the `/admin` user-management screens, image
upload, and comments.
