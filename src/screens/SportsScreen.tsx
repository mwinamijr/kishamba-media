import React, { useEffect } from "react";
import InternationalSports from "../components/sports/InternationalSports";
import PopularSports from "../components/sports/PopularSports";
import FollowUs from "../components/home/Followus";
import LocalSports from "../components/sports/LocalSports";
import OtherSports from "../components/sports/OtherSports";
import { fetchArticles } from "../features/news/articleSlice";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";

type ContentBlock = {
  type: string;
  imageUrl?: string;
  // add other fields if needed
};

const SportsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Helper to get first image URL from contentBlocks
  const getFirstImageFromContentBlocks = (contentBlocks?: ContentBlock[]) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;

    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock ? firstImageBlock.imageUrl || null : null;
  };

  // Process articles to assign an image field dynamically
  const processedArticles = articles.map((article) => ({
    ...article,
    image:
      article.image ||
      getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
      "/img/news-1.jpg",
  }));

  // Filter the sports articles category "michezo"
  const sportsArticles = processedArticles.filter(
    (article) => article.category === "michezo"
  );

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Sports</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media sports page" />
        <meta name="description" content="Kishamba media sports page" />
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <LocalSports articles={sportsArticles} loading={loading} />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <main className="lg:flex-1">
            <OtherSports articles={sportsArticles} loading={loading} />
            <div className="my-6" />
            <InternationalSports articles={sportsArticles} loading={loading} />
          </main>

          <aside className="lg:w-1/3 flex-shrink-0 space-y-6 mt-6 lg:mt-0">
            <FollowUs />
            <PopularSports articles={sportsArticles} loading={loading} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default SportsScreen;
