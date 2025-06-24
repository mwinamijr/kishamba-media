import React from "react";
import { Link } from "react-router-dom";

type Article = {
  _id: string,
  headline?: string,
  image: string,
  category: string,
  views: number,
  createdAt: string,
};

interface PopularSportsProps {
  articles?: Article[];
  loading?: boolean;
}

const PopularSports: React.FC<PopularSportsProps> = ({
  articles = [],
  loading,
}) => {
  const popularSports = articles
    .filter((article) => article.views !== undefined)
    .sort((a, b) => {
      if (b.views === a.views) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return b.views - a.views;
    })
    .slice(0, 5);

  return (
    <>
      <h4 className="my-4 text-xl font-semibold">Popular News</h4>
      <div className="space-y-6">
        {popularSports.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="rounded-full overflow-hidden m-1"
                style={{ width: 100, height: 100 }}
              >
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute top-1 right-2 flex items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white text-sm font-semibold"
                style={{ width: 30, height: 30 }}
              >
                {item.views}
              </span>
            </div>

            <div className="flex flex-col">
              <p className="uppercase mb-2 text-sm font-medium text-gray-600">
                {item.category}
              </p>
              <Link
                to={`/habari/${item._id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {item.headline
                  ? `${item.headline.slice(0, 30)}...`
                  : "Untitled Article"}
              </Link>
              <small className="text-gray-500 mt-1 flex items-center space-x-1">
                <i className="fas fa-calendar-alt" />
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </small>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularSports;
