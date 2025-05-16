import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetails } from "../../features/news/articleSlice";
import { useParams, Link } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.getArticles);

  useEffect(() => {
    dispatch(getArticleDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="container mt-4">Loading article...</div>;
  if (error)
    return <div className="container mt-4 text-danger">Error: {error}</div>;
  if (!article) return <div className="container mt-4">No article found.</div>;

  return (
    <div className="container mt-4">
      <h2>{article.headline}</h2>

      <p>
        <strong>Summary:</strong> {article.summary}
      </p>
      <p>
        <strong>Category:</strong> {article.category}
      </p>
      <p>
        <strong>Tags:</strong> {article.tags?.join(", ")}
      </p>
      <p>
        <strong>Breaking News:</strong> {article.isBreaking ? "Yes" : "No"}
      </p>
      <p>
        <strong>Published:</strong> {article.published ? "Yes" : "No"}
      </p>
      <p>
        <strong>Post ID:</strong> {article.post}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(article.createdAt).toLocaleString()}
      </p>

      <div className="mt-3">
        <Link to="/articles" className="btn btn-secondary me-2">
          Back to List
        </Link>
        <Link to={`/articles/${article._id}/edit`} className="btn btn-primary">
          Edit Article
        </Link>
      </div>
    </div>
  );
};

export default ArticleDetails;
