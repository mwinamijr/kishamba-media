import React from "react";
import { Link } from "react-router-dom";

interface Article {
  _id: string;
  headline: string;
  category?: string;
  createdAt: string;
  views?: number;
}

interface FooterTrendingProps {
  articles?: Article[];
  loading?: boolean;
}

const FooterTrending: React.FC<FooterTrendingProps> = ({ articles = [], loading }) => {
  const trendingNews = articles
    .filter((article) => article.views !== undefined)
    .sort((a, b) => {
      if (b.views === a.views) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return (b.views ?? 0) - (a.views ?? 0);
    })
    .slice(0, 3);

  return (
    <div className="mb-3 md:w-1/2 lg:w-1/4 px-3">
      <h5 className="mb-4 uppercase font-bold text-white">Habari Maarufu</h5>
      {trendingNews.map((item, idx) => (
        <div key={idx} className="mb-3">
          <div className="mb-2 flex items-center space-x-2">
            <Link
              to="#"
              className="bg-blue-600 text-white uppercase font-semibold px-2 py-0.5 rounded"
            >
              {item.category || "Makala"}
            </Link>
            <Link to="#" className="text-gray-300 text-sm">
              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
            </Link>
          </div>
          <Link
            to={`/habari/${item._id}`}
            className="text-gray-200 uppercase font-medium text-sm hover:text-orange-500 transition"
          >
            {item.headline.length > 40
              ? `${item.headline.slice(0, 40)}...`
              : item.headline}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FooterTrending;
