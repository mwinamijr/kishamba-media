// src/pages/articles/UpdateArticle.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleDetails,
  updateArticle,
  clearMessages,
} from "../../slices/articleSlice";
import { useNavigate, useParams } from "react-router-dom";

const UpdateArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, loading, error } = useSelector((state) => state.articles);

  const [formData, setFormData] = useState({
    headline: "",
    summary: "",
    category: "",
    tags: "",
    isBreaking: false,
    published: false,
    post: "",
  });

  useEffect(() => {
    dispatch(getArticleDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (article) {
      setFormData({
        headline: article.headline || "",
        summary: article.summary || "",
        category: article.category || "",
        tags: article.tags?.join(", ") || "",
        isBreaking: article.isBreaking || false,
        published: article.published || false,
        post: article.post || "",
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    dispatch(updateArticle({ id, articleData: updatedData })).then((res) => {
      if (!res.error) {
        navigate("/articles");
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Article</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Headline</label>
          <input
            type="text"
            name="headline"
            className="form-control"
            value={formData.headline}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Summary</label>
          <textarea
            name="summary"
            className="form-control"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="isBreaking"
            className="form-check-input"
            checked={formData.isBreaking}
            onChange={handleChange}
          />
          <label className="form-check-label">Breaking News</label>
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="published"
            className="form-check-input"
            checked={formData.published}
            onChange={handleChange}
          />
          <label className="form-check-label">Published</label>
        </div>

        <div className="mb-3">
          <label>Post ID</label>
          <input
            type="text"
            name="post"
            className="form-control"
            value={formData.post}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
