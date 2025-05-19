import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getArticleDetails,
  updateArticle,
} from "../../features/news/articleSlice";
import { fetchPosts } from "../../features/news/postSlice";

const UpdateArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, loading, error } = useSelector((state) => state.getArticles);
  const { posts } = useSelector((state) => state.getPosts);

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
    dispatch(fetchPosts());
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePostSelect = (selectedOption) => {
    const selectedPost = posts.find((p) => p._id === selectedOption.value);
    const firstParagraph =
      selectedPost?.contentBlocks?.find((c) => c.type === "paragraph")?.value ||
      "";

    setFormData((prev) => ({
      ...prev,
      post: selectedPost._id,
      headline: selectedPost?.title || "",
      summary: firstParagraph,
    }));
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
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/articles">Articles</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Update
          </li>
        </ol>
      </nav>

      <h2>Update Article</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Post</label>
          <Select
            value={
              formData.post
                ? {
                    value: formData.post,
                    label:
                      posts.find((p) => p._id === formData.post)?.title || "",
                  }
                : null
            }
            options={posts.map((post) => ({
              value: post._id,
              label: post.title,
            }))}
            onChange={handlePostSelect}
            placeholder="Search and select post..."
            isSearchable
          />
        </div>

        <div className="mb-3">
          <label>Headline</label>
          <input
            type="text"
            name="headline"
            className="form-control"
            value={formData.headline}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Summary</label>
          <textarea
            name="summary"
            className="form-control"
            value={formData.summary}
            onChange={handleChange}
            readOnly
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

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="published"
            className="form-check-input"
            checked={formData.published}
            onChange={handleChange}
          />
          <label className="form-check-label">Published</label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
