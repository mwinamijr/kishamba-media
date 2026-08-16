"use client";

import { useGetArticlesQuery, useTransitionArticleStatusMutation } from "@/lib/api";
import type { Article, ArticleStatus } from "@/types/api";
import Badge from "@/components/Badge";

// One unified editorial board, status-aware actions per article, spanning
// the whole newsroom workflow instead of siloed per-role dashboards. Because transitionArticleStatus invalidates the
// "Article" list tag, clicking any action below refetches this list
// automatically — no manual refresh logic needed.

const NEXT_ACTIONS: Partial<Record<ArticleStatus, { label: string; next: ArticleStatus }[]>> = {
  DRAFT: [{ label: "Submit for review", next: "IN_REVIEW" }],
  IN_REVIEW: [
    { label: "Approve", next: "APPROVED" },
    { label: "Send back", next: "DRAFT" },
  ],
  APPROVED: [{ label: "Publish", next: "PUBLISHED" }],
  PUBLISHED: [{ label: "Retract", next: "RETRACTED" }],
  CORRECTED: [{ label: "Retract", next: "RETRACTED" }],
};

function StatusActions({ article }: { article: Article }) {
  const [transition, { isLoading }] = useTransitionArticleStatusMutation();
  const actions = NEXT_ACTIONS[article.status] || [];

  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <button
          key={action.next}
          disabled={isLoading}
          onClick={() => transition({ id: article.id, status: action.next })}
          className="rounded border border-primary-500 px-2.5 py-1 text-xs font-medium text-primary-500 hover:bg-primary-50 disabled:opacity-50"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

export default function NewsroomPage() {
  const { data, isLoading } = useGetArticlesQuery({ page: 1 });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Newsroom</h1>
      <p className="mt-1 text-sm text-secondary-500">
        Unified editorial board — submit, review, approve, publish, and correct from one place.
      </p>

      <div className="mt-6 flex flex-col divide-y divide-secondary-50">
        {isLoading && <p className="py-4 text-sm text-secondary-500">Loading...</p>}
        {data?.data.map((article) => (
          <div key={article.id} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="font-medium text-ink">{article.headline}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge tone="neutral">{article.status.replace("_", " ")}</Badge>
                <span className="text-xs text-secondary-500">{article.category.name}</span>
              </div>
            </div>
            <StatusActions article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
