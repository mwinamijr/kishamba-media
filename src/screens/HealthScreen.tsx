import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { fetchArticles } from "../features/news/articleSlice";

import InternationalSports from "../components/sports/InternationalSports";
import PopularSports from "../components/sports/PopularSports";
import FollowUs from "../components/home/Followus";
import LocalSports from "../components/sports/LocalSports";
import OtherSports from "../components/sports/OtherSports";
import type { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const HealthScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Helper to get first image URL from contentBlocks
  const getFirstImageFromContentBlocks = (contentBlocks: any[]) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;
    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock?.imageUrl || null;
  };

  // Process articles to assign an image field dynamically
  const processedArticles = articles.map((article: any) => ({
    ...article,
    image:
      article.image ||
      getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
      "/img/news-1.jpg",
  }));

  // Filter articles by category "afya"
  const healthArticles = processedArticles.filter(
    (article: any) => article.category === "afya"
  );

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Health</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media home page" />
        <meta name="description" content="Kishamba media home page" />
      </Helmet>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {error && <p className="text-red-600">{error}</p>}

          <LocalSports articles={healthArticles} loading={loading} />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3 space-y-6">
              <OtherSports articles={healthArticles} loading={loading} />
              <InternationalSports
                articles={healthArticles}
                loading={loading}
              />
            </div>

            <div className="w-full lg:w-1/3 space-y-6">
              <FollowUs />
              <PopularSports articles={healthArticles} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthScreen;
