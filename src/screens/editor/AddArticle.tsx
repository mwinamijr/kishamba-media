import React, { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Select from "react-select";
import type { MultiValue, SingleValue } from "react-select";
import { createArticle } from "../../features/news/articleSlice";
import { fetchPosts } from "../../features/news/postSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import type { RootState } from "../../app/store"; // adjust as needed
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Post {
  _id: string;
  title: string;
  createdAt: string;
  contentBlocks?: { type: string; text: string }[];
}

interface Option {
  value: string;
  label: string;
}

const categoryOptions: Option[] = [
  { value: "siasa", label: "Siasa" },
  { value: "michezo", label: "Michezo" },
  { value: "biashara", label: "Biashara" },
  { value: "teknolojia", label: "Teknolojia" },
  { value: "afya", label: "Afya" },
  { value: "burudani", label: "Burudani" },
  { value: "mitindo", label: "Mitindo" },
];

const tagOptions: Option[] = [
  { value: "michezo", label: "Michezo" },
  { value: "AI", label: "AI" },
  { value: "football", label: "Football" },
  { value: "soccer", label: "Soccer" },
  { value: "afya", label: "Afya" },
  { value: "nyumbani", label: "Nyumbani" },
  { value: "kimataifa", label: "Kimataifa" },
  { value: "teknolojia", label: "Teknolojia" },
  { value: "mitindo", label: "Mitindo" },
  { value: "muziki", label: "Muziki" },
  { value: "filamu", label: "Filamu" },
  { value: "sanaa", label: "Sanaa" },
  { value: "utalii", label: "Utalii" },
  { value: "burudani", label: "Burudani" },
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

interface FormData {
  headline: string;
  summary: string;
  category: string;
  tags: string[];
  isBreaking: boolean;
  published: boolean;
  post: string;
}

const AddArticle: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    articles = [],
  } = useAppSelector((state: RootState) => state.getArticles);
  const { posts = [] } = useAppSelector((state: RootState) => state.getPosts);

  const [formData, setFormData] = useState<FormData>({
    headline: "",
    summary: "",
    category: "",
    tags: [],
    isBreaking: false,
    published: true,
    post: "",
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePostSelect = (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) return;
    const postId = selectedOption.value;
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

  const handleCategoryChange = (selectedOption: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleTagsChange = (selectedOptions: MultiValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions.map((opt) => opt.value),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Map formData to ArticleCreateUpdateData
    const articleData = {
      title: formData.headline,
      content: formData.summary,
      category: formData.category,
      tags: formData.tags,
      isBreaking: formData.isBreaking,
      published: formData.published,
      post: formData.post,
      // Add any other required fields here
    };

    dispatch(createArticle(articleData)).then((res) => {
      if (!res.error) {
        navigate("/articles");
      }
    });
  };

  // Filter posts that are not yet used as articles (case insensitive)
  const filteredPosts = posts.filter(
    (post) =>
      !articles.some(
        (article) =>
          article.headline?.trim().toLowerCase() ===
          post.title?.trim().toLowerCase()
      )
  );

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex flex-wrap text-sm text-gray-600 space-x-2">
          <li>
            <Link to="/" className="hover:underline text-orange-600">
              Home
            </Link>
            <span>/</span>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const displayName = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <li key={routeTo} className="flex items-center">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-gray-800"
                  >
                    {displayName}
                  </span>
                ) : (
                  <>
                    <Link
                      to={routeTo}
                      className="hover:underline text-orange-600"
                    >
                      {displayName}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <h2 className="text-3xl font-semibold mb-6">Add New Article</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {posts.length > 0 && filteredPosts.length === 0 && (
        <p className="text-yellow-600 mb-4">
          All posts have already been used to create articles.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Select Post
          </label>
          <Select
            options={filteredPosts
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((post) => ({
                value: post._id,
                label: post.title,
              }))}
            onChange={handlePostSelect}
            placeholder="Search and select post..."
            isClearable
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Headline (auto-filled)
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Summary (first paragraph auto-filled)
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <Select
            options={categoryOptions}
            value={
              categoryOptions.find((opt) => opt.value === formData.category) ||
              null
            }
            onChange={handleCategoryChange}
            placeholder="Select category"
            isClearable
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Tags</label>
          <Select
            options={tagOptions}
            isMulti
            value={tagOptions.filter((opt) =>
              formData.tags.includes(opt.value)
            )}
            onChange={handleTagsChange}
            placeholder="Select tags"
          />
        </div>

        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isBreaking"
              checked={formData.isBreaking}
              onChange={handleChange}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-gray-700">Breaking News</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-gray-700">Published</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition"
        >
          {loading ? "Saving..." : "Save Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
