"use client";

import Link from "next/link";
import { useGetArticlesQuery, useTransitionArticleStatusMutation, useGetMeQuery } from "@/lib/api";
import type { Article, ArticleStatus, User } from "@/types/api";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { PERMISSIONS, hasPermission, isScopedToArticle, type Permission } from "@/lib/permissions";
import { isEmbargoed } from "@/lib/scheduling";

// One unified editorial board, status-aware actions per article, spanning
// the whole newsroom workflow instead of siloed per-role dashboards.
// Because transitionArticleStatus invalidates the "Article" list tag,
// clicking any action below refetches this list automatically — no manual
// refresh logic needed.
//
// RBAC-aware in two ways, mirroring backend/controllers/articleController.js
// exactly (see TRANSITIONS/TRANSITION_PERMISSION there):
//  1. Each action only renders if the viewer actually holds the permission
//     it requires — not just any signed-in newsroom user sees every button
//     regardless of role, previously.
//  2. A SECTION_EDITOR only sees actions on articles inside their assigned
//     categories (isScopedToArticle) — outside their section, the article
//     still appears on the board (read visibility), just with no actions.
const NEXT_ACTIONS: Partial<
  Record<ArticleStatus, { label: string; next: ArticleStatus; permission: Permission }[]>
> = {
  DRAFT: [{ label: "Peleka kwa ukaguzi", next: "IN_REVIEW", permission: PERMISSIONS.ARTICLE_SUBMIT_REVIEW }],
  IN_REVIEW: [
    { label: "Idhinisha", next: "APPROVED", permission: PERMISSIONS.ARTICLE_APPROVE },
    { label: "Rudisha", next: "DRAFT", permission: PERMISSIONS.ARTICLE_REQUEST_CHANGES },
  ],
  APPROVED: [{ label: "Chapisha", next: "PUBLISHED", permission: PERMISSIONS.ARTICLE_PUBLISH }],
  PUBLISHED: [{ label: "Ondoa (Retract)", next: "RETRACTED", permission: PERMISSIONS.ARTICLE_RETRACT }],
  CORRECTED: [{ label: "Ondoa (Retract)", next: "RETRACTED", permission: PERMISSIONS.ARTICLE_RETRACT }],
};

// PUBLISHED/CORRECTED articles can't be "corrected" with a bare status
// flip — a correction is a content edit with a mandatory note (see
// backend's updateArticle), so this always routes to the edit form rather
// than calling the transition mutation directly.
const CORRECTABLE_STATUSES: ArticleStatus[] = ["PUBLISHED", "CORRECTED"];

function StatusActions({ article, me }: { article: Article; me: User | undefined }) {
  const [transition, { isLoading }] = useTransitionArticleStatusMutation();
  const scoped = isScopedToArticle(me, article);

  // Authors submitting their own draft for review is the one transition an
  // author does to their own work — mirrors the backend's isOwnSubmit
  // carve-out — so it doesn't require ARTICLE_SUBMIT_REVIEW's usual holder
  // to also be the one submitting.
  const isOwnDraftSubmit = (permission: Permission, next: ArticleStatus) =>
    next === "IN_REVIEW" &&
    article.reportedBy.id === me?.id &&
    hasPermission(me?.role, PERMISSIONS.ARTICLE_SUBMIT_REVIEW) &&
    permission === PERMISSIONS.ARTICLE_SUBMIT_REVIEW;

  const actions = (NEXT_ACTIONS[article.status] || [])
    .filter(
      (action) =>
        isOwnDraftSubmit(action.permission, action.next) || (scoped && hasPermission(me?.role, action.permission))
    )
    // The backend rejects a manual PUBLISH while still embargoed (see
    // articleController.js's transitionStatus) — don't offer a button that
    // would just 400. The scheduled badge below tells the story instead.
    .filter((action) => !(action.next === "PUBLISHED" && isEmbargoed(article)));

  const embargoed = article.status === "APPROVED" && isEmbargoed(article);

  const canCorrect =
    CORRECTABLE_STATUSES.includes(article.status) &&
    scoped &&
    hasPermission(me?.role, PERMISSIONS.ARTICLE_EDIT_ANY);

  if (actions.length === 0 && !canCorrect && !embargoed) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {embargoed && (
        <Badge tone="neutral">
          Imepangwa: {new Date(article.publishAt as string).toLocaleString("sw-TZ")}
        </Badge>
      )}
      {canCorrect && (
        <Button href={`/newsroom/${article.slug}/edit`} variant="outline" size="sm">
          Toa Marekebisho
        </Button>
      )}
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
            <StatusActions article={article} me={me?.user} />
          </div>
        ))}
      </div>
    </div>
  );
}
