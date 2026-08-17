import type { Role } from "@/types/api";

// Mirrors backend/utils/permissions.js exactly. This is for UI gating only
// — hiding buttons/actions a user can't use — never for real authorization.
// The backend enforces every one of these independently and is the only
// source of truth for what's actually allowed; if this file and the
// backend ever disagree, the backend wins and the user just sees a 403.

export const PERMISSIONS = {
  ARTICLE_CREATE: "article:create",
  ARTICLE_EDIT_OWN: "article:edit_own",
  ARTICLE_EDIT_ANY: "article:edit_any",
  ARTICLE_DELETE: "article:delete",
  ARTICLE_SUBMIT_REVIEW: "article:submit_review",
  ARTICLE_REQUEST_CHANGES: "article:request_changes",
  ARTICLE_APPROVE: "article:approve",
  ARTICLE_PUBLISH: "article:publish",
  ARTICLE_CORRECT: "article:correct",
  ARTICLE_RETRACT: "article:retract",
  CATEGORY_MANAGE: "category:manage",
  TAG_MANAGE: "tag:manage",
  MEDIA_UPLOAD: "media:upload",
  MEDIA_MANAGE: "media:manage",
  COMMENT_CREATE: "comment:create",
  COMMENT_MODERATE: "comment:moderate",
  USER_MANAGE: "user:manage",
  USER_ASSIGN_ROLE: "user:assign_role",
  ANALYTICS_VIEW: "analytics:view",
  SOCIAL_PUBLISH: "social:publish",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ARTICLE_FULL_WORKFLOW: Permission[] = [
  PERMISSIONS.ARTICLE_CREATE,
  PERMISSIONS.ARTICLE_EDIT_ANY,
  PERMISSIONS.ARTICLE_DELETE,
  PERMISSIONS.ARTICLE_SUBMIT_REVIEW,
  PERMISSIONS.ARTICLE_REQUEST_CHANGES,
  PERMISSIONS.ARTICLE_APPROVE,
  PERMISSIONS.ARTICLE_PUBLISH,
  PERMISSIONS.ARTICLE_CORRECT,
  PERMISSIONS.ARTICLE_RETRACT,
];

const ROLE_PERMISSIONS: Record<Role, Permission[] | "*"> = {
  SUPER_ADMIN: "*",
  ADMIN: [
    ...ARTICLE_FULL_WORKFLOW,
    PERMISSIONS.CATEGORY_MANAGE,
    PERMISSIONS.TAG_MANAGE,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_MANAGE,
    PERMISSIONS.COMMENT_CREATE,
    PERMISSIONS.COMMENT_MODERATE,
    PERMISSIONS.USER_MANAGE,
    PERMISSIONS.USER_ASSIGN_ROLE,
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.SOCIAL_PUBLISH,
  ],
  EDITOR_IN_CHIEF: [
    ...ARTICLE_FULL_WORKFLOW,
    PERMISSIONS.CATEGORY_MANAGE,
    PERMISSIONS.TAG_MANAGE,
    PERMISSIONS.MEDIA_MANAGE,
    PERMISSIONS.COMMENT_MODERATE,
    PERMISSIONS.USER_ASSIGN_ROLE,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  MANAGING_EDITOR: [
    ...ARTICLE_FULL_WORKFLOW,
    PERMISSIONS.CATEGORY_MANAGE,
    PERMISSIONS.TAG_MANAGE,
    PERMISSIONS.MEDIA_MANAGE,
    PERMISSIONS.COMMENT_MODERATE,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  SECTION_EDITOR: [
    PERMISSIONS.ARTICLE_EDIT_ANY,
    PERMISSIONS.ARTICLE_REQUEST_CHANGES,
    PERMISSIONS.ARTICLE_APPROVE,
    PERMISSIONS.ARTICLE_PUBLISH,
    PERMISSIONS.ARTICLE_CORRECT,
    PERMISSIONS.ARTICLE_RETRACT,
    PERMISSIONS.TAG_MANAGE,
    PERMISSIONS.COMMENT_MODERATE,
  ],
  COPY_EDITOR: [PERMISSIONS.ARTICLE_EDIT_ANY],
  REPORTER: [
    PERMISSIONS.ARTICLE_CREATE,
    PERMISSIONS.ARTICLE_EDIT_OWN,
    PERMISSIONS.ARTICLE_SUBMIT_REVIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.COMMENT_CREATE,
  ],
  CONTRIBUTOR: [
    PERMISSIONS.ARTICLE_CREATE,
    PERMISSIONS.ARTICLE_EDIT_OWN,
    PERMISSIONS.ARTICLE_SUBMIT_REVIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.COMMENT_CREATE,
  ],
  PHOTOJOURNALIST: [
    PERMISSIONS.ARTICLE_CREATE,
    PERMISSIONS.ARTICLE_EDIT_OWN,
    PERMISSIONS.ARTICLE_SUBMIT_REVIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_MANAGE,
    PERMISSIONS.COMMENT_CREATE,
  ],
  SOCIAL_MEDIA_MANAGER: [PERMISSIONS.SOCIAL_PUBLISH, PERMISSIONS.ANALYTICS_VIEW, PERMISSIONS.COMMENT_CREATE],
  MODERATOR: [PERMISSIONS.COMMENT_MODERATE, PERMISSIONS.COMMENT_CREATE],
  SUBSCRIBER: [PERMISSIONS.COMMENT_CREATE],
  USER: [PERMISSIONS.COMMENT_CREATE],
};

export function hasPermission(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  const grants = ROLE_PERMISSIONS[role];
  if (!grants) return false;
  if (grants === "*") return true;
  return grants.includes(permission);
}

export function hasAnyPermission(role: Role | undefined, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

// Mirrors backend/utils/permissions.js's isScopedToArticle(). Only
// SECTION_EDITOR is actually scoped; every other role that holds an
// ARTICLE_* permission is unscoped and this returns true for them.
export function isScopedToArticle(
  user: { role: Role; editedCategories?: { id: string }[] } | undefined,
  article: { category: { id: string } }
): boolean {
  if (!user) return false;
  if (user.role !== "SECTION_EDITOR") return true;
  return (user.editedCategories || []).some((c) => c.id === article.category.id);
}
