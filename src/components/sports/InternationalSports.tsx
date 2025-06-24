import React from "react";
import { Link } from "react-router-dom";

type Article = {
  _id: string,
  title?: string,
  headline?: string,
  summary?: string,
  image?: string,
  readTime?: string | number,
  views?: number,
  comments?: any[],
  createdAt: string,
  tags?: string[],
};

interface InternationalSportsProps {
  articles?: Article[];
  loading?: boolean;
}

const InternationalSports: React.FC<InternationalSportsProps> = ({
  articles = [],
  loading,
}) => {
  const localSports = articles.filter(
    (article) =>
      Array.isArray(article.tags) && article.tags.includes("kimataifa")
  );

  const sortedLocal = [...localSports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latest = sortedLocal[0];
  const remainingArticles = sortedLocal
    .filter((a) => a._id !== latest?._id)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Column */}
      <div className="lg:col-span-7 xl:col-span-8 mt-0">
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
                // Note: Tailwind spacing for p-2 adjusted with space-x-4 for gaps
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
                className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {latest.headline}
              </Link>
            </div>

            <p className="mt-3 mb-4 text-gray-700">
              {latest.summary || "No summary available."}
            </p>
          </>
        )}
      </div>

      {/* Right Column */}
      <div className="lg:col-span-5 xl:col-span-4 bg-gray-100 p-4 pt-0 rounded-md shadow-inner">
        <div className="space-y-4">
          {remainingArticles.length > 0 ? (
            remainingArticles.map((article, index) => (
              <div key={article._id || index} className="mt-2">
                <div className="flex flex-col space-y-1">
                  <Link
                    to={`/habari/${article._id}`}
                    className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {article.headline}
                  </Link>
                  <div className="flex space-x-4 text-gray-600 text-sm">
                    <small className="flex items-center space-x-1">
                      <i className="fa fa-clock" />
                      <span>{article.readTime || "06"} minute read</span>
                    </small>
                    <small className="flex items-center space-x-1">
                      <i className="fa fa-eye" />
                      <span>{article.views ?? 0} Views</span>
                    </small>
                  </div>
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
  );
};

export default InternationalSports;
