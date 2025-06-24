import React from "react";
import { Link } from "react-router-dom";

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
  views?: number,
  createdAt: string,
  category?: string,
  image?: string,
  post?: Post,
};

type Props = {
  articles?: Article[],
  loading?: boolean,
};

const TrendingNews: React.FC<Props> = ({ articles = [], loading = false }) => {
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

  const trendingNews = processedArticles
    .filter((article) => article.views !== undefined)
    .sort((a, b) => {
      if (b.views === a.views) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return (b.views ?? 0) - (a.views ?? 0);
    })
    .slice(0, 5);

  return (
    <div className="mb-6">
      <div className="border-b pb-2 mb-3">
        <h4 className="text-lg uppercase font-bold text-gray-800">
          Trending News
        </h4>
      </div>

      {loading && <p className="text-red-600 mb-3">Loading...</p>}

      <div className="bg-white border p-3 space-y-4">
        {trendingNews.map((news, index) => (
          <div
            key={index}
            className="flex bg-white h-[110px] overflow-hidden border rounded"
          >
            <img
              src={news.image}
              alt="news"
              className="w-[110px] h-[110px] object-cover flex-shrink-0"
            />
            <div className="flex flex-col justify-center px-3 w-full">
              <div className="flex items-center space-x-2 text-sm mb-1">
                <Link
                  to="#"
                  className="bg-blue-600 text-white uppercase font-semibold px-2 py-0.5 text-xs rounded"
                >
                  {news.category || "General"}
                </Link>
                <Link to="#" className="text-gray-500 text-xs">
                  {new Date(news.createdAt).toLocaleDateString()}
                </Link>
              </div>
              <Link
                to={`/habari/${news._id}`}
                className="text-sm text-gray-700 font-semibold uppercase hover:text-blue-600 transition line-clamp-2"
              >
                {news.headline?.slice(0, 40) || "Untitled Article"}...
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
