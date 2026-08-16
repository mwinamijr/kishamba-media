import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Article,
  ArticleRevision,
  ArticleStatus,
  Category,
  Comment,
  ContentBlock,
  Paginated,
  Role,
  User,
} from "@/types/api";

// Single RTK Query api slice for the whole app. Generated hooks +
// tag-based cache invalidation mean the newsroom dashboard updates itself
// automatically after every editorial action, with no manual refetch logic.
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
    credentials: "include", // sends the httpOnly session cookie set by the backend
  }),
  tagTypes: ["Article", "Category", "Comment", "Me", "User"],
  endpoints: (builder) => ({
    // --- Auth ---------------------------------------------------------
    getMe: builder.query<{ user: User }, void>({
      query: () => "/auth/me",
      providesTags: ["Me"],
    }),
    login: builder.mutation<{ user: User }, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Me"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Me"],
    }),

    // --- User administration (ADMIN/SUPER_ADMIN, see backend/README.md §4) ---
    getUsers: builder.query<Paginated<User>, { page?: number } | void>({
      query: (params) => ({ url: "/auth/users", params: params ?? undefined }),
      providesTags: (result) =>
        result
          ? [...result.data.map((u) => ({ type: "User" as const, id: u.id })), { type: "User" as const, id: "LIST" }]
          : [{ type: "User" as const, id: "LIST" }],
    }),
    createUserByAdmin: builder.mutation<
      { user: User; tempPassword: string },
      { username: string; email: string; role?: Role; phone?: string; firstName?: string; lastName?: string }
    >({
      query: (body) => ({ url: "/auth/create", method: "POST", body }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    assignUserRole: builder.mutation<User, { id: string; role: Role }>({
      query: ({ id, role }) => ({ url: `/auth/users/${id}/role`, method: "PUT", body: { role } }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "User", id }, { type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/auth/users/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // --- Categories -----------------------------------------------------
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? [...result.map((c) => ({ type: "Category" as const, id: c.id })), { type: "Category" as const, id: "LIST" }]
          : [{ type: "Category" as const, id: "LIST" }],
    }),
    createCategory: builder.mutation<Category, { name: string; description?: string }>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation<Category, { id: string; name: string; description?: string }>({
      query: ({ id, ...body }) => ({ url: `/categories/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Category", id }, { type: "Category", id: "LIST" }],
    }),
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),

    // --- Articles ---------------------------------------------------------
    getArticles: builder.query<
      Paginated<Article>,
      { status?: ArticleStatus; category?: string; tag?: string; q?: string; page?: number }
    >({
      query: (params) => ({ url: "/articles", params }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((a) => ({ type: "Article" as const, id: a.id })),
              { type: "Article" as const, id: "LIST" },
            ]
          : [{ type: "Article" as const, id: "LIST" }],
    }),
    getArticleBySlug: builder.query<Article, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: (_result, _err, slug) => [{ type: "Article", id: slug }],
    }),
    createArticle: builder.mutation<
      Article,
      { headline: string; summary?: string; contentBlocks: ContentBlock[]; categoryId: string; tagNames?: string[] }
    >({
      query: (body) => ({ url: "/articles", method: "POST", body }),
      invalidatesTags: [{ type: "Article", id: "LIST" }],
    }),
    updateArticle: builder.mutation<Article, { id: string; correctionNote?: string; [key: string]: unknown }>({
      query: ({ id, ...body }) => ({ url: `/articles/${id}`, method: "PUT", body }),
      // Invalidating the whole list + this article covers both the pre-publish
      // edit case and the published-with-correction case in one place.
      invalidatesTags: (_r, _e, { id }) => [{ type: "Article", id }, { type: "Article", id: "LIST" }],
    }),
    // The single most important mutation for the newsroom dashboard: submit
    // for review / approve / publish / correct / retract all go through
    // here, and the tag invalidation means every board/list using
    // getArticles refetches automatically.
    transitionArticleStatus: builder.mutation<Article, { id: string; status: ArticleStatus }>({
      query: ({ id, status }) => ({ url: `/articles/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Article", id }, { type: "Article", id: "LIST" }],
    }),
    getArticleRevisions: builder.query<ArticleRevision[], string>({
      query: (articleId) => `/articles/${articleId}/revisions`,
    }),

    // --- Comments ---------------------------------------------------------
    getComments: builder.query<Comment[], string>({
      query: (articleId) => `/comments/article/${articleId}`,
      providesTags: (_r, _e, articleId) => [{ type: "Comment", id: articleId }],
    }),
    createComment: builder.mutation<Comment, { articleId: string; content: string; parentId?: string }>({
      query: ({ articleId, ...body }) => ({
        url: `/comments/article/${articleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, { articleId }) => [{ type: "Comment", id: articleId }],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useCreateUserByAdminMutation,
  useAssignUserRoleMutation,
  useDeleteUserMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useTransitionArticleStatusMutation,
  useGetArticleRevisionsQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
} = api;
