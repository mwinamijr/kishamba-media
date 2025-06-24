import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const tabs = [
  { id: "tab-1", title: "Michezo" },
  { id: "tab-2", title: "Burudani" },
  { id: "tab-3", title: "Siasa" },
  { id: "tab-4", title: "Teknolojia" },
  { id: "tab-5", title: "Afya" },
];

type ContentBlock = {
  type: string,
  imageUrl?: string,
};

type Post = {
  contentBlocks?: ContentBlock[],
};

type Article = {
  _id: string,
  headline?: string,
  summary?: string,
  views?: number,
  createdAt: string,
  created_at?: string,
  category?: string,
  image?: string,
  post?: Post,
};

type Props = {
  articles?: Article[],
  loading?: boolean,
};

export default function WhatsNew({ articles = [], loading = false }: Props) {
  const [activeTab, setActiveTab] = useState("tab-1");

  const tabCategory = useMemo(() => {
    const tabMap: { [key: string]: string } = {
      "tab-1": "michezo",
      "tab-2": "burudani",
      "tab-3": "siasa",
      "tab-4": "teknolojia",
      "tab-5": "afya",
    };
    return tabMap[activeTab];
  }, [activeTab]);

  const getFirstImageFromContentBlocks = (contentBlocks?: ContentBlock[]) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;
    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock?.imageUrl || null;
  };

  const processedArticles = articles.map((article) => ({
    ...article,
    image:
      article.image ||
      getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
      "/img/news-110x110-1.jpg",
  }));

  const filteredArticles = useMemo(() => {
    const sorted = [...processedArticles]
      .filter((article) => article.category === tabCategory)
      .sort(
        (a, b) =>
          new Date(b.created_at ?? b.createdAt).getTime() -
          new Date(a.created_at ?? a.createdAt).getTime()
      );
    return {
      main: sorted[0],
      items: sorted.slice(1, 6),
    };
  }, [processedArticles, tabCategory]);

  return (
    <div className="mb-10">
      {/* Header + Tabs */}
      <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-300 mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">What’s New</h1>
        <ul className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      {!loading && filteredArticles.main ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Article */}
          <div className="lg:col-span-8">
            <div className="relative rounded overflow-hidden">
              <img
                src={filteredArticles.main.image}
                alt={filteredArticles.main.headline}
                className="w-full h-96 object-cover rounded"
              />
              <div className="absolute top-5 right-5 bg-blue-600 text-white text-sm px-3 py-1 rounded">
                {filteredArticles.main.category}
              </div>
            </div>
            <div className="my-4">
              <Link
                to="#"
                className="text-2xl font-semibold hover:text-blue-600"
              >
                {filteredArticles.main.headline}
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              <span>
                <i className="fa fa-clock mr-1" /> 06 minute read
              </span>
              <span>
                <i className="fa fa-eye mr-1" /> {filteredArticles.main.views}
              </span>
              <span>
                <i className="fa fa-comment-dots mr-1" /> 05 Comment
              </span>
              <span>
                <i className="fa fa-arrow-up mr-1" /> 1.5k Share
              </span>
            </div>
            <p className="text-gray-700">{filteredArticles.main.summary}</p>
          </div>

          {/* Side Articles */}
          <div className="lg:col-span-4 space-y-4">
            {filteredArticles.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-2/5">
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
                <div className="flex flex-col justify-between w-3/5">
                  <p className="text-xs text-blue-600 uppercase">
                    {item.category}
                  </p>
                  <Link
                    to={`/habari/${item._id}`}
                    className="text-sm font-semibold text-gray-800 hover:text-blue-600"
                  >
                    {item.headline?.slice(0, 30) ?? "Untitled Article"}...
                  </Link>
                  <small className="text-gray-500 text-xs">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No articles...</p>
      )}
    </div>
  );
}
