import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "../../features/news/articleSlice";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../../features/news/postSlice"; // ensure this exists

const AddArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.getArticles);
  const { posts } = useSelector((state) => state.getPosts); // ensure your slice provides this

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
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePostSelect = (e) => {
    const selectedPostId = e.target.value;
    const selectedPost = posts.find((p) => p._id === selectedPostId);

    const firstParagraph =
      selectedPost?.content?.find((c) => c.type === "paragraph")?.value || "";

    setFormData((prev) => ({
      ...prev,
      post: selectedPostId,
      headline: selectedPost?.headline || "",
      summary: firstParagraph,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    dispatch(createArticle(data)).then((res) => {
      if (!res.error) navigate("/articles");
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Article</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Post</label>
          <select
            className="form-select"
            value={formData.post}
            onChange={handlePostSelect}
          >
            <option value="">-- Select a Post --</option>
            {posts.map((post) => (
              <option key={post._id} value={post._id}>
                {post.headline}
              </option>
            ))}
          </select>
        </div>

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

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : "Save Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
