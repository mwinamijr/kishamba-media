import React, { useEffect } from "react";
import SportsContent from "../components/sports/SportsContent";
import PopularSports from "../components/sports/PopularSports";
import FollowUs from "../components/home/Followus";
import TopSports from "../components/sports/TopSports";
import MostViewedSports from "../components/sports/MostViewedSports";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../features/news/articleSlice";

function SportsScreen() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Helper to get first image URL from contentBlocks
  const getFirstImageFromContentBlocks = (contentBlocks) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;

    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock ? firstImageBlock.imageUrl : null;
  };

  // Process articles to assign an image field dynamically
  const processedArticles = articles.map((article) => {
    return {
      ...article,
      image:
        article.image ||
        getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
        "/img/news-110x110-1.jpg",
    };
  });

  // Filter and sort the top 5 trending articles
  const sportsArticles = processedArticles.filter(
    (article) => article.category === "sports"
  );

  return (
    <div className="container-fluid">
      <div className="custom-container">
        <br />

        {error && <p className="text-danger">{error}</p>}

        <TopSports articles={articles} loading={loading} />
        <div className="row">
          <div className="col-12 col-sm-10 col-md-9 col-lg-8">
            <br />
            <MostViewedSports articles={articles} loading={loading} />
            <br />
            <SportsContent articles={articles} loading={loading} />
          </div>
          <div className="col-lg-4">
            <br />
            <FollowUs />
            <PopularSports articles={sportsArticles} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SportsScreen;
