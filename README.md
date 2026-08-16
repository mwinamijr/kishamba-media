# Kishamba Media — Frontend

The Next.js (App Router) frontend for Kishamba Media. Server-rendered
public pages for speed and SEO, RTK Query for everything client-side and
interactive, and a design system built around one resolved brand palette.

See the root [`ROADMAP.md`](../ROADMAP.md) for the overall project plan and
priorities, and [`../backend/README.md`](../backend/README.md) for the API
this app talks to (including the full RBAC role/permission system that
drives what the newsroom dashboard can show and do).

---

## 1. Architecture

```
frontend/src/
  app/
    layout.tsx                    # root layout: fonts, Redux provider, header/footer
    page.tsx                      # home (ISR)
    kuhusu/page.tsx                # About
    wasiliana-nasi/page.tsx        # Contact
    [category]/page.tsx            # data-driven category pages (ISR)
    habari/[slug]/page.tsx          # article detail (ISR, full SEO metadata + JSON-LD)
    ingia/page.tsx, jiunge/page.tsx  # Login/Register
    (dashboard)/
      newsroom/page.tsx              # unified editorial workflow board
    not-found.tsx
  components/                        # ArticleCard, Badge, SectionHeader, Header, Footer, CommentsSection
  lib/
    api.ts                            # RTK Query API slice — the client-side data layer (§3)
    server-api.ts                      # server-side fetch helpers for Server Components (§3)
    store.ts, StoreProvider.tsx         # Redux store setup (RTK Query needs this even in the App Router)
  types/api.ts                          # shared TypeScript types matching the backend's Prisma schema
  middleware.ts                          # edge route protection for /admin, /newsroom, /profile
```

**Stack:** Next.js 15 (App Router), React 19, TypeScript throughout,
Tailwind (only styling system — no competing CSS framework), Redux
Toolkit + RTK Query, `next/font/google` for typography.

## 2. Design system

One resolved palette, defined in `tailwind.config.ts`:
- **`#F37028` (orange)** — primary, everywhere: buttons, links, active
  states, headline accents.
- **`#FFCC00` (yellow)** — a single narrow accent, used *only* for the
  Breaking News ticker/badge. High-visibility colors are effective
  precisely because they're rare; using yellow everywhere would defeat
  that.
- **`secondary`** (dark neutral, `#31404B`) for text/UI chrome that isn't
  primary-colored.
- Typography: `Inter` (sans, UI chrome) + `Source Serif 4` (serif,
  headlines/body) — a standard editorial pairing: a humanist sans for
  navigation and metadata, a readable serif for the actual reading
  experience.

**Design principles this app follows** (worth keeping in mind for anything
new you build here):
- **One styling system.** Tailwind only. Don't add a second CSS framework
  "just for this one thing" — it's exactly how design consistency erodes.
- **Data-driven, not hardcoded.** Categories, tags, and site navigation come
  from the API (`getCategories`), not a hardcoded array in a component.
  Adding a category in the CMS should never require a code change.
- **Shared primitives over one-off markup.** `ArticleCard`, `Badge`,
  `SectionHeader` exist so every article listing/section heading looks and
  behaves the same everywhere, instead of each page reimplementing its own
  slightly-different card.
- **Server-rendered by default.** Public pages (home, category, article)
  are Server Components with ISR — fast first paint, real SEO, no
  content flash. Client components (`"use client"`) are reserved for
  things that genuinely need interactivity: forms, the comments section,
  the newsroom dashboard's action buttons.
- **Auth lives in an httpOnly cookie**, never in `localStorage` or any
  client-readable storage. The backend sets it on login; `fetchBaseQuery`
  is configured with `credentials: "include"` so it flows automatically.

## 3. Data layer: RTK Query

`src/lib/api.ts` is the single API slice for the whole app:

- `createApi` + `fetchBaseQuery`, `baseUrl` from `NEXT_PUBLIC_API_URL`,
  `credentials: "include"`.
- Endpoints mirror the backend's REST contract 1:1 (see
  `../backend/README.md` §4): `getMe`, `login`, `logout`,
  `getCategories`, `getArticles`, `getArticleBySlug`, `createArticle`,
  `updateArticle`, `transitionArticleStatus`, `getArticleRevisions`,
  `getComments`, `createComment`.
- **Tag-based cache invalidation** is the payoff: `transitionArticleStatus`
  invalidates both the specific article and the article list, so the
  newsroom board refetches automatically after every submit/approve/
  publish/correct/retract action. No manual refetch logic anywhere in the
  app.
- `src/lib/server-api.ts` is a separate, plain-`fetch` helper Server
  Components use for the first ISR-cached paint of public pages — Server
  Components can't use client-side hooks, so this hits the same REST
  endpoints a different way, with Next's `revalidate` for cache control.
- `src/lib/StoreProvider.tsx` wraps the app in a client-boundary `Provider`,
  which RTK Query's cache needs even though most of the app is otherwise
  server-rendered.

## 4. Build status

### ✅ Done
- App shell: layout, global styles, Tailwind config with the resolved design tokens
- Public pages: home, category (data-driven), article (full SEO metadata + `NewsArticle` JSON-LD), About, Contact, 404
- Auth pages: login, register — cookie session set by the backend
- `middleware.ts` — edge route protection for `/admin`, `/newsroom`, `/profile` (checks cookie presence; each protected page still needs a server-side role/permission check via `getMe`, since the edge runtime can't easily verify a JWT the same way the Node backend does)
- RTK Query API slice + server-side fetch helper — now covers auth, user administration, categories, articles, and comments
- Shared TypeScript types matching the backend's Prisma schema exactly, including all 13 RBAC roles
- Client-side permission mirror (`lib/permissions.ts`) for UI gating — hides actions a role can't perform; the backend remains the real enforcement point
- Design system primitives: `ArticleCard`, `SectionHeader`, `Badge`
- `Header` (data-driven nav), `Footer`
- `CommentsSection` — recursive comment tree, RTK Query mutation for posting
- Unified newsroom board — lists articles, shows status-appropriate workflow action buttons, cache auto-invalidates on every transition, links to the article authoring form
- **Article authoring form** (`components/ArticleForm.tsx`) — one form for both create and edit, with a block editor (add/remove/reorder paragraph/subheading/quote/image/embed blocks), category/tag/dateline/breaking-news fields, and a required correction note when editing an already-published article
- **Admin dashboard**: user list with pagination, inline role assignment (gated by `user:assign_role`, admin-level roles further gated to admin-level grantors — mirrors the backend's self-escalation guard), account creation with one-time password display, account deletion; category management (create/edit/delete, inline editing); media library (grid view of all uploaded images, delete gated by `media:manage`)
- Shared dashboard layout (`app/(dashboard)/layout.tsx`) — nav tabs between Newsroom and Admin
- **Image upload** (`components/ImageUploader.tsx`) — file picker with live preview, uploads immediately on selection, wired into the article authoring form's image blocks; falls back to a plain URL field for external images. Images are stored as bytes directly in Postgres by the backend, not S3 — see `../backend/README.md` §2.1. No crop/resize step (the old app's `react-easy-crop` flow wasn't ported — noted as a gap, not silently dropped)

### 🔶 Half-done
- `middleware.ts` protects routes by cookie presence only, not verified role — see the note above
- Registration POSTs directly instead of going through the RTK Query slice (intentional for now — it's a one-off action unlike login/logout, which are reused across auth-gated UI state)
- Admin dashboard has no UI yet for assigning a `SECTION_EDITOR`'s category scope (backend requires this via Prisma Studio for now — see `../backend/README.md` §3.5)

### ⬜ Not done
- Image crop/resize before upload
- Search page/UI (backend already supports `?q=` filtering)
- Home page carousel/slider for featured stories
- Tag management UI (tags are currently only created implicitly via an article's `tagNames` — no dedicated CRUD page)
- A shared `Button` primitive (buttons are currently ad-hoc Tailwind per use)
- Accessibility pass (contrast, focus-visible states) against the resolved palette
- Component/e2e tests
- RSS feed, sitemap.xml, newsletter signup — see the root ROADMAP's modern news site feature checklist

## 5. Environment variables

```
# Server-side only (Server Components, route handlers)
API_URL=http://localhost:5000/api

# Client-side (RTK Query, browser fetches) — must be NEXT_PUBLIC_ to reach the browser bundle
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 6. Getting started

```bash
cp .env.example .env.local   # point at your running backend, see ../backend/README.md §5
pnpm install
pnpm run dev
```

**Note on `pnpm-workspace.yaml`:** this file exists solely to allowlist the
build scripts for `sharp` and `unrs-resolver` (native dependencies pulled
in by Next.js) via `onlyBuiltDependencies` — pnpm 10+ blocks build scripts
for unlisted dependencies by default as a supply-chain-security measure. It
does **not** make this a pnpm workspace/monorepo; the `packages: ["."]`
entry is required by pnpm's schema whenever the file exists at all, even
for a single package. If you see a `sharp`/`unrs-resolver` build-scripts
prompt anyway, run `pnpm approve-builds`.

Requires the backend running and seeded (`pnpm run prisma:seed` there) so
`/api/categories` returns data — the header nav and category pages depend
on it.

## 7. Verifying a build

```bash
pnpm install
pnpm exec tsc --noEmit    # type-check
pnpm run build        # production build
```

If `next/font/google` fails to fetch in a network-restricted environment
(some CI/sandbox setups block `fonts.googleapis.com`), switch
`src/app/layout.tsx` to locally hosted font files instead of
`next/font/google` — this isn't a code issue, just an environment network
policy difference.
