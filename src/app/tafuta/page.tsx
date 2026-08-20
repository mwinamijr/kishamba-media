import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/server-api";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import SearchBox from "@/components/SearchBox";

interface Props {
  searchParams: { q?: string; page?: string };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const q = searchParams.q?.trim();
  return { title: q ? `Matokeo ya "${q}"` : "Tafuta" };
}

// Server-rendered search results page. The actual filtering happens on the
// backend (GET /api/articles?q=...&status=PUBLISHED, a basic `contains`
// match — see backend/README.md's note on search under "Suggestions for
// the road ahead" in the root ROADMAP for when this should graduate to a
// real search engine).
export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() ?? "";
  const page = Number(searchParams.page) || 1;

  const results = q ? await getPublishedArticles({ q, page, pageSize: 20 }) : null;

  return (
    <div>
      {/* Same sr-only h1 pattern as [category]/page.tsx — see the comment
          there. Found during the accessibility heading-order audit. */}
      <h1 className="sr-only">Tafuta Habari</h1>
      <SectionHeader title="Tafuta Habari" />

      <div className="max-w-md">
        <SearchBox initialQuery={q} />
      </div>

      {!q && <p className="mt-6 text-sm text-secondary-500">Andika neno la kutafuta habari.</p>}

      {q && results && (
        <div className="mt-6">
          <p className="text-sm text-secondary-500">
            {results.total === 0
              ? `Hakuna matokeo kwa "${q}".`
              : `Matokeo ${results.total} kwa "${q}"`}
          </p>

          {results.data.length > 0 && (
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.data.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {results.totalPages > 1 && (
            <div className="mt-6 flex items-center gap-2">
              {page > 1 && (
                <a
                  href={`/tafuta?q=${encodeURIComponent(q)}&page=${page - 1}`}
                  className="rounded border border-secondary-50 px-3 py-1 text-sm text-secondary-500 hover:border-primary-500 hover:text-primary-500"
                >
                  Iliyotangulia
                </a>
              )}
              <span className="text-sm text-secondary-500">
                Ukurasa {results.page} kati ya {results.totalPages}
              </span>
              {page < results.totalPages && (
                <a
                  href={`/tafuta?q=${encodeURIComponent(q)}&page=${page + 1}`}
                  className="rounded border border-secondary-50 px-3 py-1 text-sm text-secondary-500 hover:border-primary-500 hover:text-primary-500"
                >
                  Inayofuata
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
