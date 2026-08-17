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
    tafuta/page.tsx                 # search
    ingia/page.tsx, jiunge/page.tsx  # Login/Register — role-aware post-auth redirect (§4)
    (dashboard)/
      layout.tsx                     # per-role-filtered nav tabs (Newsroom / Admin / Wasifu)
      newsroom/page.tsx              # unified editorial workflow board, permission+scope-filtered actions
      admin/                          # user/category/tag/media management
      profile/page.tsx                # self-service profile + password change — every role's dashboard
    not-found.tsx
  components/                        # ArticleCard, Badge, SectionHeader, Header, UserMenu, MobileNav, Footer, CommentsSection
  lib/
    api.ts                            # RTK Query API slice — the client-side data layer (§3)
    server-api.ts                      # server-side fetch helpers for Server Components (§3)
    permissions.ts                     # client-side RBAC mirror: hasPermission/hasAnyPermission/isScopedToArticle
    route-access.ts                     # which permissions each protected route section requires — used by both middleware.ts and (dashboard)/layout.tsx
    dashboard.ts                        # getDashboardPathForRole, safeNextPath (open-redirect guard)
    store.ts, StoreProvider.tsx         # Redux store setup (RTK Query needs this even in the App Router)
  types/api.ts                          # shared TypeScript types matching the backend's Prisma schema
  middleware.ts                          # edge route protection for /admin, /newsroom, /profile — verifies the JWT's role claim (§4)
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
- **`middleware.ts`** — edge route protection for `/admin`, `/newsroom`, `/profile`. Verifies the session cookie's JWT signature itself (via `jose`, since the edge runtime can't use the Node `jsonwebtoken` package) and checks the `role` claim against `lib/route-access.ts`'s per-section permission map — a real role check, not just cookie presence. The backend's `protect` middleware still re-reads the user's *current* role from Postgres on every API request and remains the actual source of truth; this is a fast first line of defense that can lag the backend by up to the token's 1-day lifetime if a role is downgraded mid-session (see the comment at the top of `middleware.ts`)
- RTK Query API slice + server-side fetch helper — now covers auth (including self-service profile/password updates), user administration, categories, articles, and comments
- Shared TypeScript types matching the backend's Prisma schema exactly, including all 13 RBAC roles
- Client-side permission mirror (`lib/permissions.ts`, includes `hasAnyPermission` and an `isScopedToArticle` mirror of the backend's SECTION_EDITOR scoping) for UI gating — hides actions a role can't perform; the backend remains the real enforcement point
- Design system primitives: `ArticleCard`, `SectionHeader`, `Badge`, `Button`, `AdSlot`
- `Header` (data-driven nav, logo, mobile hamburger nav via `MobileNav.tsx`, auth-aware `UserMenu.tsx`), `Footer` (contact details, social links, quick links, ad slot)
- **`UserMenu.tsx`** — replaces the header's Ingia/Jiunge links with an avatar + name + dropdown (Dashibodi / Wasifu wangu / Toka) once a session exists, via `useGetMeQuery`. `MobileNav.tsx` mirrors the same auth-aware links for small screens. Deliberately a small client component rather than reading the session in `Header.tsx` itself (a Server Component) — `Header` fetches categories with `revalidate: 3600` as an ISR-cached fragment shared across every visitor, and reading cookies there would force the whole layout (and every page under it) into per-request dynamic rendering, breaking ISR on the home/category/article pages
- **Login/register → role-aware landing** (`lib/dashboard.ts`'s `getDashboardPathForRole`) — after signing in, admin-tier roles land on `/admin`, working newsroom roles land on `/newsroom`, and plain readers land on `/profile`, instead of always bouncing to the homepage. If `middleware.ts` bounced someone off a protected route first, `?next=` (validated by `safeNextPath` against open-redirect) takes priority and sends them back where they were headed
- **`/profile` page** (`app/(dashboard)/profile/page.tsx`) — the "dashboard" every role has, including plain `USER`/`SUBSCRIBER` readers who have nothing else under `(dashboard)`. Self-service profile edit and password change, both server-enforced as self-only (or `user:manage` for the profile edit) — see `../backend/README.md` §4 for a bugfix note on this
- `(dashboard)/layout.tsx` — nav tabs (Newsroom / Admin / Wasifu) filtered per-role via the same `lib/route-access.ts` map the middleware uses, so a reader on `/profile` doesn't see dead links that just bounce them back
- `CommentsSection` — recursive comment tree, RTK Query mutation for posting
- Unified newsroom board — lists articles, shows status-appropriate workflow action buttons **filtered by the viewer's actual permission and, for `SECTION_EDITOR`, their assigned category scope** (mirrors `backend/controllers/articleController.js`'s `TRANSITION_PERMISSION`/`isScopedToArticle` exactly — previously every signed-in newsroom user saw every action button regardless of role and just got a 403 on click). Published/corrected articles get a "Toa Marekebisho" action that routes to the edit form instead of a bare status button, since a correction is always a content edit with a mandatory note, never a status flip alone — see the backend README's note on the matching `TRANSITIONS` fix. Cache auto-invalidates on every transition
- **Article authoring form** (`components/ArticleForm.tsx`) — one form for both create and edit, with a block editor (add/remove/reorder paragraph/subheading/quote/image/embed blocks), category/tag/dateline/breaking-news fields, and a required correction note when editing an already-published article
- **Admin dashboard**: user list with pagination, inline role assignment (gated by `user:assign_role`, admin-level roles further gated to admin-level grantors — mirrors the backend's self-escalation guard), account creation with one-time password display, account deletion; category management (create/edit/delete, inline editing); **tag management** (create/rename/delete, shows per-tag article counts); media library (grid view of all uploaded images, delete gated by `media:manage`)
- Shared dashboard layout (`app/(dashboard)/layout.tsx`) — nav tabs between Newsroom and Admin
- **Image upload** (`components/ImageUploader.tsx`) — file picker with live preview, uploads immediately on selection, wired into the article authoring form's image blocks; falls back to a plain URL field for external images. Images are stored as bytes directly in Postgres by the backend, not S3 — see `../backend/README.md` §2.1. No crop/resize step (the old app's `react-easy-crop` flow wasn't ported — noted as a gap, not silently dropped)
- **Search** (`app/tafuta/page.tsx` + `components/SearchBox.tsx`) — server-rendered results using the backend's `?q=` filter, paginated, linked from the header search icon. A basic substring match today, not a real search engine — see the root ROADMAP's suggestions section for when that's worth upgrading (Meilisearch/Algolia)
- **Home page carousel** (`components/FeaturedCarousel.tsx`) — auto-advancing (6s), pauses on hover, prev/next + dot navigation, breaking stories shown first. Receives pre-fetched articles as props from the home page's Server Component rather than fetching client-side, so there's no extra request or loading flash
- **`Button` primitive** (`components/Button.tsx`) — 5 variants (primary/secondary/outline/ghost/danger), 3 sizes, loading state, and an `href` mode that renders as a styled `next/link` for CTAs that navigate rather than mutate. Applied across every form, the newsroom board, all admin pages, and comments — no more ad-hoc per-screen button styling
- **`AdSlot` primitive** (`components/AdSlot.tsx`) — clearly-labeled placeholder ad units (leaderboard/rectangle/banner/square sizes), placed on the home page, in-article, and in the footer. No real ad network wired in — see root ROADMAP's resolved decisions
- **Accessibility**: global `focus-visible` ring on every interactive element (one CSS rule, not per-component styling), a skip-to-content link, every image audited for `alt` text, resting-state text contrast fixed (plain-text links on white backgrounds moved from `primary-500` to the darker `primary-600`)
- **Mobile navigation** (`components/MobileNav.tsx`) — hamburger menu for small screens; the header previously hid the entire category nav below the `md` breakpoint with no alternative at all
- **Logo/favicon** — wired into `Header`, `Footer`, and `layout.tsx` metadata icons. **Honest caveat**: the actual image files are the original project's default Create React App placeholder (the React atom icon), never replaced with real Kishamba Media branding — swap the files in `public/` when real artwork exists, no code changes needed

### 🔶 Half-done
- Registration POSTs directly instead of going through the RTK Query slice (intentional for now — it's a one-off action unlike login/logout, which are reused across auth-gated UI state)
- Admin dashboard has no UI yet for assigning a `SECTION_EDITOR`'s category scope (backend requires this via Prisma Studio for now — see `../backend/README.md` §3.5)
- Accessibility pass covers contrast/focus/alt-text/skip-link but not a full semantic-heading-order audit, screen-reader walkthrough, or colorblind check on the Breaking News yellow
- Responsive pass covers the header/nav and verifies no overflow on small screens, but hasn't had a deliberate tablet-breakpoint or touch-target-sizing review
- `/profile` covers name/username/email/phone/password; no profile picture upload UI yet (the backend field `profilePicUrl` already exists — `ImageUploader.tsx` isn't wired into this form)

### ⬜ Not done
- Image crop/resize before upload
- Component/e2e tests
- Dark mode
- RSS feed, sitemap.xml, newsletter signup — see the root ROADMAP's modern news site feature checklist
- Revision history UI (backend's `ArticleRevision` records exist and are shown as a "this story has been corrected" banner, but there's no page listing the full history of corrections for a story yet — see root ROADMAP Priority 4)

## 5. Environment variables

```
# Server-side only (Server Components, route handlers)
API_URL=http://localhost:5000/api

# Client-side (RTK Query, browser fetches) — must be NEXT_PUBLIC_ to reach the browser bundle
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Must be the EXACT same value as JWT_SECRET in backend/.env — the edge
# middleware verifies the session cookie's signature itself (see §4's note
# on middleware.ts). Server-side-only (no NEXT_PUBLIC_ prefix); read at the
# edge, never shipped to the browser bundle.
JWT_SECRET=
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
