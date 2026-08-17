"use client";

import Link from "next/link";
import { useGetArticlesQuery, useTransitionArticleStatusMutation, useGetMeQuery } from "@/lib/api";
import type { Article, ArticleStatus } from "@/types/api";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

// One unified editorial board, status-aware actions per article, spanning
// the whole newsroom workflow instead of siloed per-role dashboards.
// Because transitionArticleStatus invalidates the "Article" list tag,
// clicking any action below refetches this list automatically — no manual
// refresh logic needed.

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
        <Button
          key={action.next}
          variant="outline"
          size="sm"
          loading={isLoading}
          onClick={() => transition({ id: article.id, status: action.next })}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

export default function NewsroomPage() {
  const { data, isLoading } = useGetArticlesQuery({ page: 1 });
  const { data: me } = useGetMeQuery();
  const canCreate = hasPermission(me?.user.role, PERMISSIONS.ARTICLE_CREATE);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Newsroom</h1>
          <p className="mt-1 text-sm text-secondary-500">
            Unified editorial board — submit, review, approve, publish, and correct from one place.
          </p>
        </div>
        {canCreate && <Button href="/newsroom/new">+ Habari Mpya</Button>}
      </div>

      <div className="mt-6 flex flex-col divide-y divide-secondary-50">
        {isLoading && <p className="py-4 text-sm text-secondary-500">Loading...</p>}
        {data?.data.length === 0 && (
          <p className="py-4 text-sm text-secondary-500">Hakuna habari bado. Anza kwa kuandika mpya.</p>
        )}
        {data?.data.map((article) => (
          <div key={article.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href={`/newsroom/${article.slug}/edit`}
                className="font-medium text-ink hover:text-primary-600 hover:underline"
              >
                {article.headline}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge tone="neutral">{article.status.replace("_", " ")}</Badge>
                <span className="text-xs text-secondary-500">{article.category.name}</span>
                <span className="text-xs text-secondary-500">
                  {article.reportedBy.firstName || article.reportedBy.username}
                </span>
              </div>
            </div>
            <StatusActions article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
