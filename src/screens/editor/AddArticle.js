import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createArticle } from "../../features/news/articleSlice";
import { fetchPosts } from "../../features/news/postSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AddArticle = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.getArticles);
  const { posts } = useSelector((state) => state.getPosts);

  const [formData, setFormData] = useState({
    headline: "",
    summary: "",
    category: "",
    tags: "",
    isBreaking: false,
    published: true,
    post: "",
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePostSelect = (e) => {
    const postId = e.target.value;
    const selectedPost = posts.find((p) => p._id === postId);

    const firstParagraph = selectedPost?.contentBlocks?.find(
      (block) => block.type === "paragraph"
    );

    setFormData((prev) => ({
      ...prev,
      post: postId,
      headline: selectedPost?.title || "",
      summary: firstParagraph?.text || "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    dispatch(createArticle(data)).then((res) => {
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
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <li
                key={name}
                className="breadcrumb-item active"
                aria-current="page"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </li>
            ) : (
              <li key={name} className="breadcrumb-item">
                <Link to={routeTo}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <h2>Add New Article</h2>

      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Post</label>
          <Select
            options={posts.map((post) => ({
              value: post._id,
              label: post.title,
            }))}
            onChange={(selectedOption) =>
              handlePostSelect({ target: { value: selectedOption.value } })
            }
            placeholder="Search and select post..."
          />
        </div>

        <div className="mb-3">
          <label>Headline (auto-filled)</label>
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
          <label>Summary (first paragraph auto-filled)</label>
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

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : "Save Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
