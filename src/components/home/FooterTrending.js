import React from "react";
import { Link } from "react-router-dom";

const FooterTrending = ({ articles = [], loading }) => {
  const trendingNews = articles
    .filter((article) => article.views !== undefined)
    .sort((a, b) => {
      if (b.views === a.views) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.views - a.views;
    })
    .slice(0, 3);

  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <h5 className="mb-4 text-uppercase font-weight-bold text-white">
        Habari Maarufu
      </h5>
      {trendingNews.map((item, idx) => (
        <div key={idx} className="mb-3">
          <div className="mb-2">
            <Link
              className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
              to="#"
            >
              {item.category}
            </Link>
            <Link className="text-body" to="#">
              <small>{new Date(item.createdAt).toLocaleDateString()}</small>
            </Link>
          </div>
          <Link
            className="small text-body text-uppercase font-weight-medium"
            to={`/news/${item._id}`}
          >
            {item.headline.length > 40
              ? `${item.headline.slice(0, 40)}...`
              : item.headline}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FooterTrending;
