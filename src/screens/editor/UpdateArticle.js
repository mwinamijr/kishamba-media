import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getArticleDetails,
  updateArticle,
} from "../../features/news/articleSlice";
import { fetchPosts } from "../../features/news/postSlice";

const categoryOptions = [
  { value: "siasa", label: "Siasa" },
  { value: "michezo", label: "Michezo" },
  { value: "biashara", label: "Biashara" },
  { value: "teknolojia", label: "Teknolojia" },
  { value: "afya", label: "Afya" },
  { value: "burudani", label: "Burudani" },
  { value: "mitindo", label: "Mitindo" },
];

const tagOptions = [
  { value: "michezo", label: "Michezo" },
  { value: "AI", label: "AI" },
  { value: "football", label: "Football" },
  { value: "soccer", label: "Soccer" },
  { value: "afya", label: "Afya" },
  { value: "nyumbani", label: "Nyumbani" },
  { value: "kimataifa", label: "Kimataifa" },
  { value: "teknolojia", label: "Teknolojia" },
  { value: "mitindo", label: "Mitindo" },
  { value: "utalii", label: "Utalii" },
  { value: "sanaa", label: "Sanaa" },
  { value: "filamu", label: "Filamu" },
  { value: "burudani", label: "Burudani" },
  { value: "muziki", label: "Muziki" },
  { value: "biashara", label: "Biashara" },
  { value: "siasa", label: "Siasa" },
  { value: "kilimo", label: "Kilimo" },
  { value: "F1", label: "F1" },
  { value: "racing", label: "Racing" },
  { value: "basketball", label: "Basketball" },
  { value: "cricket", label: "Cricket" },
  { value: "tennis", label: "Tennis" },
  { value: "stock market", label: "Stock Market" },
];

const UpdateArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { article, loading, error } = useSelector((state) => state.getArticles);
  const { posts } = useSelector((state) => state.getPosts);

  const [formData, setFormData] = useState({
    headline: "",
    summary: "",
    category: null,
    tags: [],
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
        category: article.category
          ? categoryOptions.find((c) => c.value === article.category)
          : null,
        tags: Array.isArray(article.tags)
          ? article.tags.map(
              (tag) =>
                tagOptions.find((t) => t.value === tag) || {
                  value: tag,
                  label: tag,
                }
            )
          : [],
        isBreaking: article.isBreaking || false,
        published: article.published || false,
        post: article.post || "",
      });
    }
  }, [article]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
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
      headline: formData.headline,
      summary: formData.summary,
      category: formData.category?.value || "",
      tags: formData.tags.map((tag) => tag.value),
      isBreaking: formData.isBreaking,
      published: formData.published,
      post: formData.post,
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
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Summary</label>
          <textarea
            name="summary"
            className="form-control"
            value={formData.summary}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <Select
            value={formData.category}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, category: selected }))
            }
            options={categoryOptions}
            placeholder="Select category"
          />
        </div>

        <div className="mb-3">
          <label>Tags</label>
          <Select
            isMulti
            value={formData.tags}
            onChange={(selected) =>
              setFormData((prev) => ({ ...prev, tags: selected }))
            }
            options={tagOptions}
            placeholder="Select tags"
          />
        </div>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            name="isBreaking"
            className="form-check-input"
            checked={formData.isBreaking}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label">Breaking News</label>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="published"
            className="form-check-input"
            checked={formData.published}
            onChange={handleCheckboxChange}
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
