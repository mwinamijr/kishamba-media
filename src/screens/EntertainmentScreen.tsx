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

const EntertainmentScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Get first image URL from content blocks
  const getFirstImageFromContentBlocks = (contentBlocks: any[]) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;
    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock?.imageUrl || null;
  };

  const processedArticles = articles.map((article: any) => ({
    ...article,
    image:
      article.image ||
      getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
      "/img/news-1.jpg",
  }));

  const entertainmentArticles = processedArticles.filter(
    (article: any) => article.category === "burudani"
  );

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Entertainment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media entertainment page" />
        <meta
          name="description"
          content="Latest entertainment news from Kishamba Media"
        />
      </Helmet>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-6">
          {error && <p className="text-red-600">{error}</p>}

          <LocalSports articles={entertainmentArticles} loading={loading} />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3 space-y-6">
              <OtherSports articles={entertainmentArticles} loading={loading} />
              <InternationalSports
                articles={entertainmentArticles}
                loading={loading}
              />
            </div>

            <div className="w-full lg:w-1/3 space-y-6">
              <FollowUs />
              <PopularSports
                articles={entertainmentArticles}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EntertainmentScreen;
