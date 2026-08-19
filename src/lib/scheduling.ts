// Mirrors backend/utils/scheduling.js's isEmbargoed exactly. Used only for
// UI — hiding a Publish button that would just 400, and showing a
// "scheduled" badge — the backend enforces this for real on every
// PUBLISHED transition regardless of what the UI shows.
export function isEmbargoed(article: { publishAt?: string | null }, now: Date = new Date()): boolean {
  return Boolean(article.publishAt) && new Date(article.publishAt as string) > now;
}
