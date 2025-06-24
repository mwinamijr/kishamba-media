import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BreakingNewsTicker from "../components/home/BreakingNews";
import FollowUs from "../components/home/Followus";
import TrendingNews from "../components/home/TrendingNews";
import NewsArticle from "../components/single-news/NewsArticle";
import { fetchArticles } from "../features/news/articleSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";

const tags = [
  "Politics",
  "Business",
  "Corporate",
  "Business",
  "Health",
  "Education",
  "Science",
  "Business",
  "Foods",
  "Travel",
];

const NewsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      <div className="mt-4" />
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <BreakingNewsTicker articles={articles} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:flex-1">
            <NewsArticle />
          </main>

          <aside className="lg:w-1/3 flex-shrink-0 space-y-6">
            <FollowUs />

            <div>
              <div className="border-b border-gray-300 mb-2">
                <h4 className="uppercase font-bold text-lg m-0">
                  Advertisement
                </h4>
              </div>
              <div className="bg-white border border-t-0 p-3 text-center">
                <Link to="#">
                  <img
                    className="w-full h-auto object-cover"
                    src="img/news-800x500-2.jpg"
                    alt="Advertisement"
                  />
                </Link>
              </div>
            </div>

            <TrendingNews />

            <div>
              <div className="border-b border-gray-300 mb-2">
                <h4 className="uppercase font-bold text-lg m-0">Tags</h4>
              </div>
              <div className="bg-white border border-t-0 p-3">
                <div className="flex flex-wrap -m-1">
                  {tags.map((tag, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="m-1 px-3 py-1 border border-gray-400 rounded text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="border-b border-gray-300 mb-2">
                <h4 className="uppercase font-bold text-lg m-0">
                  Advertisement
                </h4>
              </div>
              <div className="bg-white border border-t-0 p-3 text-center">
                <Link to="#">
                  <img
                    className="w-full h-auto object-cover"
                    src="img/news-800x500-2.jpg"
                    alt="Advertisement"
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default NewsScreen;
