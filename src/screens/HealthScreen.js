import React, { useEffect } from "react";
import InternationalSports from "../components/sports/InternationalSports";
import PopularSports from "../components/sports/PopularSports";
import FollowUs from "../components/home/Followus";
import LocalSports from "../components/sports/LocalSports";
import OtherSports from "../components/sports/OtherSports";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../features/news/articleSlice";
import { Helmet } from "react-helmet";

function HealthScreen() {
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
        "/img/news-1.jpg",
    };
  });

  // Filter and sort the top 5 trending articles
  const healthArticles = processedArticles.filter(
    (article) => article.category === "health"
  );

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Health</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media home page" />
        <meta name="description" content="Kishamba media home page" />
      </Helmet>

      <div className="container-fluid">
        <div className="custom-container">
          <br />

          {error && <p className="text-danger">{error}</p>}

          <LocalSports articles={healthArticles} loading={loading} />
          <div className="row">
            <div className="col-12 col-sm-10 col-md-9 col-lg-8">
              <br />
              <OtherSports articles={healthArticles} loading={loading} />
              <br />
              <InternationalSports
                articles={healthArticles}
                loading={loading}
              />
            </div>
            <div className="col-lg-4">
              <br />
              <FollowUs />
              <PopularSports articles={healthArticles} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthScreen;
