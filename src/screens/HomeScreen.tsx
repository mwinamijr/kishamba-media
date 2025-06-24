import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchArticles } from "../features/news/articleSlice";

import NewsCarousel from "../components/home/NewsSlider";
import BreakingNewsTicker from "../components/home/BreakingNews";
import TopFeature from "../components/home/TopFeature";
import InternationalNews from "../components/home/InternationalNews";
import LatestNews from "../components/home/LatestNews";
import FollowUs from "../components/home/Followus";
import TrendingNews from "../components/home/TrendingNews";
import WhatsNew from "../components/home/WhatsNew";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";

const tags = [
  "Siasa",
  "Biashara",
  "Burudani",
  "Kilimo",
  "Afya",
  "Education",
  "Sayansi",
  "Biashara",
  "Chakula",
  "Safari",
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media home page" />
        <meta name="description" content="Kishamba media home page" />
      </Helmet>

      {error && <p className="text-red-600 text-center my-4">{error}</p>}

      <NewsCarousel />
      <BreakingNewsTicker articles={articles} />
      <TopFeature />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <InternationalNews articles={articles} loading={loading} />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:flex-1">
            <WhatsNew articles={articles} loading={loading} />
            <LatestNews articles={articles} loading={loading} />
          </div>

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

            <TrendingNews articles={articles} loading={loading} />

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

export default Home;
