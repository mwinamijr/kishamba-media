import React from "react";
import { Link } from "react-router-dom";

const LocalSports = ({ articles = [], loading }) => {
  const localSports = articles.filter(
    (article) => Array.isArray(article.tags) && article.tags.includes("local")
  );

  const sortedLocal = [...localSports].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const mostViewed = [...localSports].sort(
    (a, b) => (b.views || 0) - (a.views || 0)
  )[0];

  // Remove mostViewed from sortedLocal if it's also the latest
  const filteredList = sortedLocal.filter((a) => a._id !== mostViewed?._id);
  const latest = sortedLocal[0];
  const remainingArticles = filteredList
    .filter((a) => a._id !== latest?._id)
    .slice(0, 7); // get third to ninth

  return (
    <div className="row g-4">
      {/* Left Column */}
      <div className="col-lg-7 col-xl-8 mt-0">
        {/* Main Article (Latest) */}
        {latest && (
          <>
            <div className="position-relative overflow-hidden">
              <img
                src={latest.image || "img/news-1.jpg"}
                className="img-fluid img-zoomin w-100"
                alt={latest.title}
              />
              <div
                className="d-flex justify-content-center px-4 position-absolute flex-wrap"
                style={{ bottom: "10px", left: 0 }}
              >
                <Link to="#" className="text-white me-3 link-hover p-2">
                  <i className="fa fa-clock"></i> {latest.readTime || "06"}{" "}
                  minute read
                </Link>
                <Link to="#" className="text-white me-3 link-hover p-2">
                  <i className="fa fa-eye"></i> {latest.views} Views
                </Link>
                <Link to="#" className="text-white me-3 link-hover p-2">
                  <i className="fa fa-comment-dots"></i>{" "}
                  {latest.comments?.length || 0} Comment
                </Link>
              </div>
            </div>

            <div className="border-bottom py-3">
              <Link
                to={`/news/${latest._id}`}
                className="display-5 text-dark mb-0 link-hover"
              >
                {latest.headline}
              </Link>
            </div>
            <p className="mt-3 mb-4">
              {latest.summary || "No summary available."}
            </p>
          </>
        )}

        {/* Top Story (Most Viewed) */}
        {mostViewed && mostViewed._id !== latest?._id && (
          <div className="bg-light p-4">
            <div className="news-2">
              <h3 className="mb-4">Top Story</h3>
            </div>
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                <img
                  src={mostViewed.image || "img/default.jpg"}
                  className="img-fluid img-zoomin w-100"
                  alt={mostViewed.title}
                />
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-column">
                  <Link to={`/news/${mostViewed._id}`} className="h3">
                    {mostViewed.headline}
                  </Link>
                  <p className="mb-0 fs-5">
                    <i className="fa fa-clock"></i>{" "}
                    {mostViewed.readTime || "06"} minute read
                  </p>
                  <p className="mb-0 fs-5">
                    <i className="fa fa-eye"></i> {mostViewed.views} Views
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="col-lg-5 col-xl-4">
        <div className="bg-light p-4 pt-0">
          <div className="row g-4">
            {remainingArticles.map((article, index) => (
              <div className="col-12 mt-2" key={article.id || index}>
                <div
                  className="row align-items-stretch g-0 border rounded overflow-hidden h-100"
                  style={{ minHeight: "100px", maxHeight: "130px" }} // you can adjust this height as needed
                >
                  <div className="col-5 d-flex">
                    <div className="overflow-hidden w-100 h-100">
                      <img
                        src={article.image || "img/default.jpg"}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: "cover" }}
                        alt={article.headline}
                      />
                    </div>
                  </div>
                  <div className="col-7 d-flex flex-column justify-content-center p-2">
                    <div className="features-content">
                      <Link
                        to={`/news/${article._id}`}
                        className="h6 d-block mb-1"
                      >
                        {article.headline.length > 50
                          ? `${article.headline.slice(0, 50)}...`
                          : article.headline}
                      </Link>
                      <small className="d-block">
                        <i className="fa fa-clock me-1"></i>
                        {article.readTime || "06"} minute read
                      </small>
                      <small>
                        <i className="fa fa-eye me-1"></i>
                        {article.views} Views
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {remainingArticles.length === 0 && (
              <div className="col-12 text-muted">
                No more local sports articles.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalSports;
