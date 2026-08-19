import "server-only";
import { cookies } from "next/headers";
import type { Article, Category, Paginated } from "@/types/api";

const API_URL = process.env.API_URL || "http://localhost:5000/api";

async function apiFetch<T>(path: string, revalidate = 60, forwardSession = false): Promise<T> {
  const headers: HeadersInit = {};
  if (forwardSession) {
    // Server Components can't rely on the browser's cookie jar — fetch()
    // here is a plain server-to-server request, so the session cookie has
    // to be read off the incoming request and attached explicitly, or the
    // backend sees an anonymous request no matter who's actually signed
    // in. Only needed for requests that might return non-public content;
    // ISR-cached public reads (revalidate > 0, below) skip this since
    // attaching a per-visitor cookie to a shared cache entry would leak
    // one person's session data into another visitor's cached response.
    const sessionCookie = (await cookies()).get("session");
    if (sessionCookie) headers.Cookie = `session=${sessionCookie.value}`;
  }
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate }, headers });
  if (!res.ok) {
    throw new Error(`API error ${res.status} fetching ${path}`);
  }
  return res.json();
}

// Used by Server Components for the first server-rendered paint of public
// pages (ISR-cached). Client-side interactivity (dashboards, mutations,
// comments) goes through the RTK Query api slice in lib/api.ts instead —
// both hit the same REST endpoints.

export function getPublishedArticles(
  params: { category?: string; q?: string; tag?: string; page?: number; pageSize?: number } = {}
) {
  const qs = new URLSearchParams({ status: "PUBLISHED" });
  if (params.category) qs.set("category", params.category);
  if (params.q) qs.set("q", params.q);
  if (params.tag) qs.set("tag", params.tag);
  if (params.page) qs.set("page", String(params.page));
  if (params.pageSize) qs.set("pageSize", String(params.pageSize));
  return apiFetch<Paginated<Article>>(`/articles?${qs.toString()}`);
}

// `forwardSession` must stay opt-in (default false), never inferred from
// `revalidate` — attaching one visitor's session cookie to a *cacheable*
// (`revalidate > 0`) fetch would leak that cookie into a cache entry
// Next.js can serve to other visitors. The public article page (revalidate
// defaults to 30s, no cookie) and the newsroom edit-page preview
// (revalidate: 0, cookie forwarded explicitly below) are different enough
// call sites that this has to be a real parameter, not a derived default.
export function getArticleBySlug(slug: string, revalidate = 30, forwardSession = false) {
  return apiFetch<Article>(`/articles/${slug}`, revalidate, forwardSession);
}

export function getCategories() {
  return apiFetch<Category[]>(`/categories`, 3600); // taxonomy changes rarely
}
