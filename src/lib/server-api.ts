import "server-only";
import type { Article, Category, Paginated } from "@/types/api";

const API_URL = process.env.API_URL || "http://localhost:5000/api";

async function apiFetch<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`API error ${res.status} fetching ${path}`);
  }
  return res.json();
}

// Used by Server Components for the first server-rendered paint of public
// pages (ISR-cached). Client-side interactivity (dashboards, mutations,
// comments) goes through the RTK Query api slice in lib/api.ts instead —
// both hit the same REST endpoints.

export function getPublishedArticles(params: { category?: string; page?: number } = {}) {
  const qs = new URLSearchParams({ status: "PUBLISHED", ...(params as Record<string, string>) });
  return apiFetch<Paginated<Article>>(`/articles?${qs.toString()}`);
}

export function getArticleBySlug(slug: string, revalidate = 30) {
  return apiFetch<Article>(`/articles/${slug}`, revalidate);
}

export function getCategories() {
  return apiFetch<Category[]>(`/categories`, 3600); // taxonomy changes rarely
}
