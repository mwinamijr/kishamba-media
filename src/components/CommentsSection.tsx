"use client";

import { useState } from "react";
import { useGetCommentsQuery, useCreateCommentMutation } from "@/lib/api";
import type { Comment as CommentType } from "@/types/api";

function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="border-l-2 border-secondary-50 pl-3">
      <p className="text-sm font-semibold text-ink">{comment.user.username}</p>
      <p className="text-sm text-secondary-500">{comment.content}</p>
      {comment.replies.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {comment.replies.map((r) => (
            <CommentItem key={r.id} comment={r} />
          ))}
        </div>
      )}
    </div>
  );
}

// Client component hydrated under the server-rendered article page —
// comments need interactivity (posting, live updates) that a Server
// Component can't provide.
export default function CommentsSection({ articleId }: { articleId: string }) {
  const { data: comments, isLoading } = useGetCommentsQuery(articleId);
  const [createComment, { isLoading: isSubmitting }] = useCreateCommentMutation();
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createComment({ articleId, content }).unwrap();
    setContent("");
  };

  return (
    <section className="mt-10 border-t border-secondary-50 pt-6">
      <h3 className="font-serif text-lg font-bold text-ink">Maoni</h3>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Andika maoni yako..."
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-end rounded bg-primary-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50"
        >
          Tuma
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-4">
        {isLoading && <p className="text-sm text-secondary-500">Inapakia maoni...</p>}
        {comments?.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
        {comments?.length === 0 && (
          <p className="text-sm text-secondary-500">Bado hakuna maoni. Kuwa wa kwanza!</p>
        )}
      </div>
    </section>
  );
}
