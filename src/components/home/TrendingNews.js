import React from "react";
import { Link } from "react-router-dom";

const TrendingNews = ({ articles = [], loading }) => {
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
  const trendingNews = processedArticles
    .filter((article) => article.views !== undefined) // filter out invalid articles
    .sort((a, b) => {
      if (b.views === a.views) {
        return new Date(b.createdAt) - new Date(a.createdAt); // newer first if views equal
      }
      return b.views - a.views; // higher views first
    })
    .slice(0, 5); // take top 5

  return (
    <div className="mb-4">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Trending News</h4>
      </div>

      {loading && <p className="text-danger">Loading ...</p>}

      <div className="bg-white border border-top-0 p-3">
        {trendingNews.map((news, index) => (
          <div
            className="d-flex align-items-center bg-white mb-3"
            style={{ height: "110px" }}
            key={index}
          >
            <img
              className="img-fluid"
              src={news.image}
              alt="news"
              style={{ width: "110px", height: "110px", objectFit: "cover" }}
            />
            <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
              <div className="mb-2">
                <Link
                  className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                  to="#"
                >
                  {news.category || "General"}
                </Link>
                <Link className="text-body" to="#">
                  <small>{new Date(news.createdAt).toLocaleDateString()}</small>
                </Link>
              </div>
              <Link
                className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                to={`/habari/${news._id}`}
              >
                {`${news.headline?.slice(0, 40)}...` || "Untitled Article"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
