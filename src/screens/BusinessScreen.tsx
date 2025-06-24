import React, { useEffect } from "react";
import InternationalSports from "../components/sports/InternationalSports";
import PopularSports from "../components/sports/PopularSports";
import FollowUs from "../components/home/Followus";
import LocalSports from "../components/sports/LocalSports";
import OtherSports from "../components/sports/OtherSports";
import { fetchArticles } from "../features/news/articleSlice";
import { Helmet } from "react-helmet";
import type { RootState } from "../app/store"; // adjust based on your setup
import { useAppSelector, useAppDispatch } from "../app/hooks";

interface ContentBlock {
  type: string;
  imageUrl?: string;
}

interface Article {
  _id: string;
  title: string;
  image?: string;
  category: string;
  post?: {
    contentBlocks?: ContentBlock[];
  };
}

const BusinessScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const getFirstImageFromContentBlocks = (
    contentBlocks?: ContentBlock[]
  ): string | null => {
    if (!contentBlocks || contentBlocks.length === 0) return null;

    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock?.imageUrl || null;
  };

  const processedArticles: Article[] = articles.map((article: Article) => ({
    ...article,
    image:
      article.image ||
      getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
      "/img/news-1.jpg",
  }));

  const healthArticles = processedArticles.filter(
    (article) => article.category === "biashara"
  );

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Business</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media business page" />
        <meta name="description" content="Kishamba media business articles" />
      </Helmet>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <LocalSports articles={healthArticles} loading={loading} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-1 space-y-6">
            <OtherSports articles={healthArticles} loading={loading} />
            <InternationalSports articles={healthArticles} loading={loading} />
          </div>
          <div className="w-full lg:w-[28%] space-y-6">
            <FollowUs />
            <PopularSports articles={healthArticles} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessScreen;
