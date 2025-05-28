import React from "react";
import { Link } from "react-router-dom";

const InternationalSports = ({ articles = [], loading }) => {
  const localSports = articles.filter(
    (article) =>
      Array.isArray(article.tags) && article.tags.includes("kimataifa")
  );

  const sortedLocal = [...localSports].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Remove mostViewed from sortedLocal if it's also the latest
  const latest = sortedLocal[0];
  const remainingArticles = sortedLocal
    .filter((a) => a._id !== latest?._id)
    .slice(0, 5); // get third to ninth

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
                className="display-6 text-dark mb-0 link-hover"
              >
                {latest.headline}
              </Link>
            </div>
            <p className="mt-3 mb-4">
              {latest.summary || "No summary available."}
            </p>
          </>
        )}
      </div>

      {/* Right Column */}
      <div className="col-lg-5 col-xl-4">
        <div className="bg-light p-4 pt-0">
          <div className="row g-4">
            {remainingArticles.map((article, index) => (
              <div className="col-12 mt-2" key={article.id || index}>
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="features-content d-flex flex-column">
                      <Link to={`/news/${article._id}`} className="h6">
                        {article.headline}
                      </Link>
                      <small>
                        <i className="fa fa-clock"></i>{" "}
                        {article.readTime || "06"} minute read
                      </small>
                      <small>
                        <i className="fa fa-eye"></i> {article.views} Views
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

export default InternationalSports;
