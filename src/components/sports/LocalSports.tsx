import React from "react";
import { Link } from "react-router-dom";

type Article = {
  _id: string,
  title?: string,
  headline: string,
  summary?: string,
  image?: string,
  readTime?: string | number,
  views?: number,
  comments?: any[],
  createdAt: string,
  tags?: string[],
};

interface LocalSportsProps {
  articles?: Article[];
  loading?: boolean;
}

const LocalSports: React.FC<LocalSportsProps> = ({
  articles = [],
  loading,
}) => {
  const localSports = articles.filter(
    (article) =>
      Array.isArray(article.tags) && article.tags.includes("nyumbani")
  );

  const sortedLocal = [...localSports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const mostViewed = [...localSports].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  )[0];

  // Remove mostViewed from sortedLocal if it's also the latest
  const filteredList = sortedLocal.filter((a) => a._id !== mostViewed?._id);
  const latest = sortedLocal[0];
  const remainingArticles = filteredList
    .filter((a) => a._id !== latest?._id)
    .slice(0, 7);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Column */}
      <div className="lg:col-span-7 xl:col-span-8 mt-0">
        {/* Main Article (Latest) */}
        {latest && (
          <>
            <div className="relative overflow-hidden">
              <img
                src={latest.image || "/img/news-1.jpg"}
                alt={latest.title || latest.headline}
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
                style={{ maxHeight: 400 }}
              />
              <div
                className="absolute bottom-2 left-0 flex flex-wrap justify-center px-4 space-x-4 text-white"
                // Tailwind spacing with space-x-4 for gaps
              >
                <Link
                  to="#"
                  className="hover:underline px-2 flex items-center space-x-1"
                >
                  <i className="fa fa-clock" />
                  <span>{latest.readTime || "06"} minute read</span>
                </Link>
                <Link
                  to="#"
                  className="hover:underline px-2 flex items-center space-x-1"
                >
                  <i className="fa fa-eye" />
                  <span>{latest.views ?? 0} Views</span>
                </Link>
                <Link
                  to="#"
                  className="hover:underline px-2 flex items-center space-x-1"
                >
                  <i className="fa fa-comment-dots" />
                  <span>{latest.comments?.length ?? 0} Comment</span>
                </Link>
              </div>
            </div>

            <div className="border-b py-3">
              <Link
                to={`/news/${latest._id}`}
                className="text-3xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {latest.headline}
              </Link>
            </div>

            <p className="mt-3 mb-4 text-gray-700">
              {latest.summary || "No summary available."}
            </p>
          </>
        )}

        {/* Top Story (Most Viewed) */}
        {mostViewed && mostViewed._id !== latest?._id && (
          <div className="bg-gray-100 p-4 rounded-md shadow-inner">
            <h3 className="mb-4 text-2xl font-semibold">Top Story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <img
                src={mostViewed.image || "/img/default.jpg"}
                alt={mostViewed.title || mostViewed.headline}
                className="w-full object-cover rounded transition-transform duration-300 hover:scale-105"
                style={{ maxHeight: 200 }}
              />
              <div className="flex flex-col space-y-2">
                <Link
                  to={`/news/${mostViewed._id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {mostViewed.headline}
                </Link>
                <p className="text-gray-600 flex items-center space-x-2">
                  <i className="fa fa-clock" />
                  <span>{mostViewed.readTime || "06"} minute read</span>
                </p>
                <p className="text-gray-600 flex items-center space-x-2">
                  <i className="fa fa-eye" />
                  <span>{mostViewed.views ?? 0} Views</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 xl:col-span-4">
        <div className="bg-gray-100 p-4 pt-0 rounded-md shadow-inner">
          <div className="space-y-4">
            {remainingArticles.length > 0 ? (
              remainingArticles.map((article, index) => (
                <div
                  key={article._id || index}
                  className="flex border rounded overflow-hidden h-[110px]"
                >
                  <div className="w-5/12 flex-shrink-0 overflow-hidden">
                    <img
                      src={article.image || "/img/default.jpg"}
                      alt={article.headline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-7/12 flex flex-col justify-center p-2">
                    <Link
                      to={`/habari/${article._id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {article.headline.length > 50
                        ? `${article.headline.slice(0, 50)}...`
                        : article.headline}
                    </Link>
                    <small className="text-gray-600 flex items-center space-x-1">
                      <i className="fa fa-clock" />
                      <span>{article.readTime || "06"} minute read</span>
                    </small>
                    <small className="text-gray-600 flex items-center space-x-1">
                      <i className="fa fa-eye" />
                      <span>{article.views ?? 0} Views</span>
                    </small>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">
                No more local sports articles.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSports;
