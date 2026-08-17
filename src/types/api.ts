// Mirrors backend/prisma/schema.prisma + backend/README.md §4 API contract.
// Keep in sync manually for now; consider generating from the Prisma schema
// (prisma-json-schema-generator or a shared package) once both apps are stable.

export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "EDITOR_IN_CHIEF"
  | "MANAGING_EDITOR"
  | "SECTION_EDITOR"
  | "COPY_EDITOR"
  | "REPORTER"
  | "CONTRIBUTOR"
  | "PHOTOJOURNALIST"
  | "SOCIAL_MEDIA_MANAGER"
  | "MODERATOR"
  | "SUBSCRIBER"
  | "USER";

export type ArticleStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "CORRECTED"
  | "RETRACTED";

export interface UserSummary {
  id: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface User extends UserSummary {
  email: string;
  role: Role;
  phone?: string | null;
  profilePicUrl?: string | null;
  // Only populated for SECTION_EDITOR — the categories they're allowed to
  // act on (mirrors backend/utils/permissions.js's isScopedToArticle()).
  editedCategories?: { id: string; slug: string }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  articleCount?: number; // present on GET /api/tags (admin list), not on the tags embedded in an Article
}

export interface ContentBlock {
  type: "paragraph" | "image" | "subheading" | "quote" | "embed";
  text?: string;
  imageUrl?: string;
  alignment?: "left" | "center" | "right";
}

export interface Source {
  id: string;
  label: string;
  url?: string | null;
}

export interface ArticleImage {
  id: string;
  title?: string | null;
  url: string;
  mimeType?: string;
  size?: number;
}

export interface Article {
  id: string;
  slug: string;
  headline: string;
  summary?: string | null;
  contentBlocks: ContentBlock[];
  dateline?: string | null;
  status: ArticleStatus;
  isBreaking: boolean;
  publishAt?: string | null;
  publishedAt?: string | null;
  views: number;
  category: Category;
  reportedBy: UserSummary;
  editedBy?: UserSummary | null;
  tags: Tag[];
  sources: Source[];
  images: ArticleImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ArticleRevision {
  id: string;
  editedBy: UserSummary;
  correctionNote?: string | null;
  snapshot: Pick<Article, "headline" | "summary" | "contentBlocks">;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  user: UserSummary;
  parentId?: string | null;
  content: string;
  createdAt: string;
  replies: Comment[];
}

export interface Paginated<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
