import React, { useEffect, useState } from "react";
import Select from "react-select";
import type { SingleValue, MultiValue } from "react-select";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getArticleDetails,
  updateArticle,
} from "../../features/news/articleSlice";
import { fetchPosts } from "../../features/news/postSlice";
import type { RootState } from "../../app/store"; // Adjust import as needed
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type OptionType = {
  value: string;
  label: string;
};

type Post = {
  _id: string;
  title: string;
  contentBlocks?: { type: string; value: string }[];
};

type Article = {
  headline?: string;
  summary?: string;
  category?: string;
  tags?: string[];
  isBreaking?: boolean;
  published?: boolean;
  post?: string;
};

const categoryOptions: OptionType[] = [
  { value: "siasa", label: "Siasa" },
  { value: "michezo", label: "Michezo" },
  { value: "biashara", label: "Biashara" },
  { value: "teknolojia", label: "Teknolojia" },
  { value: "afya", label: "Afya" },
  { value: "burudani", label: "Burudani" },
  { value: "mitindo", label: "Mitindo" },
];

const tagOptions: OptionType[] = [
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

const UpdateArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { article, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );
  const { posts } = useAppSelector((state: RootState) => state.getPosts);

  const [formData, setFormData] = useState<{
    headline: string;
    summary: string;
    category: OptionType | null;
    tags: OptionType[];
    isBreaking: boolean;
    published: boolean;
    post: string;
  }>({
    headline: "",
    summary: "",
    category: null,
    tags: [],
    isBreaking: false,
    published: false,
    post: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getArticleDetails(id));
      dispatch(fetchPosts());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (article) {
      setFormData({
        headline: article.headline || "",
        summary: article.summary || "",
        category: article.category
          ? categoryOptions.find((c) => c.value === article.category) ?? null
          : null,
        tags: Array.isArray(article.tags)
          ? article.tags.map(
              (tag) =>
                tagOptions.find((t) => t.value === tag) ?? {
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePostSelect = (selectedOption: SingleValue<OptionType>) => {
    if (!selectedOption) return;
    const selectedPost = posts.find(
      (p: Post) => p._id === selectedOption.value
    );
    const firstParagraph =
      selectedPost?.contentBlocks?.find((c) => c.type === "paragraph")?.value ||
      "";

    setFormData((prev) => ({
      ...prev,
      post: selectedPost?._id ?? "",
      headline: selectedPost?.title ?? "",
      summary: firstParagraph,
    }));
  };

  const handleCategoryChange = (selectedOption: SingleValue<OptionType>) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOption,
    }));
  };

  const handleTagsChange = (selectedOptions: MultiValue<OptionType>) => {
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions as OptionType[],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    if (id) {
      dispatch(updateArticle({ id, articleData: updatedData })).then((res) => {
        if (!res.error) {
          navigate("/articles");
        }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span> / </span>
          </li>
          <li>
            <Link to="/articles" className="hover:underline">
              Articles
            </Link>
            <span> / </span>
          </li>
          <li className="font-semibold text-gray-800">Update</li>
        </ol>
      </nav>

      <h2 className="text-2xl font-semibold mb-4">Update Article</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Select Post</label>
          <Select
            value={
              formData.post
                ? {
                    value: formData.post,
                    label:
                      posts.find((p: Post) => p._id === formData.post)?.title ||
                      "",
                  }
                : null
            }
            options={posts.map((post: Post) => ({
              value: post._id,
              label: post.title,
            }))}
            onChange={handlePostSelect}
            placeholder="Search and select post..."
            isSearchable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Headline</label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            readOnly
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed resize-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <Select
            value={formData.category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            placeholder="Select category"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <Select
            isMulti
            value={formData.tags}
            onChange={handleTagsChange}
            options={tagOptions}
            placeholder="Select tags"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isBreaking"
            name="isBreaking"
            checked={formData.isBreaking}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isBreaking" className="select-none">
            Breaking News
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="published" className="select-none">
            Published
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
