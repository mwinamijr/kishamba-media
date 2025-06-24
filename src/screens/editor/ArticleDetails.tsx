import React, { useEffect } from "react";
import { getArticleDetails } from "../../features/news/articleSlice";
import { useParams, Link } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust as per your store location
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Article {
  _id: string;
  headline: string;
  summary: string;
  category: string;
  tags?: string[];
  isBreaking: boolean;
  published: boolean;
  post: string;
  createdAt: string;
}

const ArticleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { article, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    if (id) dispatch(getArticleDetails(id));
  }, [dispatch, id]);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto mt-6 px-4 text-center text-gray-700">
        Loading article...
      </div>
    );
  if (error)
    return (
      <div className="max-w-4xl mx-auto mt-6 px-4 text-center text-red-600">
        Error: {error}
      </div>
    );
  if (!article)
    return (
      <div className="max-w-4xl mx-auto mt-6 px-4 text-center text-gray-700">
        No article found.
      </div>
    );

  const art = article as Article;

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-semibold mb-4">{art.headline}</h2>

      <p className="mb-2">
        <strong>Summary:</strong> {art.summary}
      </p>
      <p className="mb-2">
        <strong>Category:</strong> {art.category}
      </p>
      <p className="mb-2">
        <strong>Tags:</strong> {art.tags?.join(", ") || "None"}
      </p>
      <p className="mb-2">
        <strong>Breaking News:</strong> {art.isBreaking ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Published:</strong> {art.published ? "Yes" : "No"}
      </p>
      <p className="mb-2">
        <strong>Post ID:</strong> {art.post}
      </p>
      <p className="mb-4">
        <strong>Created At:</strong> {new Date(art.createdAt).toLocaleString()}
      </p>

      <div className="flex space-x-4">
        <Link
          to="/articles"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Back to List
        </Link>
        <Link
          to={`/articles/${art._id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit Article
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetails;
