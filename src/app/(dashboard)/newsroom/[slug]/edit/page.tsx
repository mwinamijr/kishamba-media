import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/server-api";
import ArticleForm from "@/components/ArticleForm";
import Badge from "@/components/Badge";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Hariri: ${params.slug}` };
}

// Server-fetches the article so the form loads with data already in place
// (no client-side loading flash), then hands off to the client form for
// editing. Editing requires article:edit_own or article:edit_any on the
// backend — this page doesn't gate on role itself yet (see
// frontend/README.md §4 note on middleware.ts), a 403 from the backend on
// submit is the current guardrail. The backend now also gates *reading* an
// unpublished article to the same permission (see articleController.js),
// so `forwardSession: true` here is required, not optional — without it
// this 404s for anything short of PUBLISHED/CORRECTED.
export default async function EditArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug, 0, true).catch(() => null);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-2">
        <h1 className="font-serif text-2xl font-bold text-ink">Hariri Habari</h1>
        <Badge tone="neutral">{article.status.replace("_", " ")}</Badge>
      </div>
      <p className="mt-1 text-sm text-secondary-500">{article.headline}</p>
      <div className="mt-6">
        <ArticleForm mode="edit" initial={article} />
      </div>
    </div>
  );
}
