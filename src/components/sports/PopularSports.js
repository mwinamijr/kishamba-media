import React from "react";
import { Link } from "react-router-dom";

export default function PopularSports({ articles = [], loading }) {
  // Filter and sort the top 5 trending articles
  const popularSports = articles
    .filter((article) => article.views !== undefined) // filter out invalid articles
    .sort((a, b) => {
      if (b.views === a.views) {
        return new Date(b.createdAt) - new Date(a.createdAt); // newer first if views equal
      }
      return b.views - a.views; // higher views first
    })
    .slice(0, 5); // take top 5

  return (
    <>
      <h4 className="my-4">Popular News</h4>
      <div className="row g-4">
        {popularSports.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="row g-4 align-items-center features-item">
              <div className="col-4">
                <div className="rounded-circle position-relative p-3">
                  <div className="overflow-hidden rounded-circle">
                    <img
                      src={item.image}
                      className="img-zoomin img-fluid rounded-circle"
                      alt={item.category}
                    />
                  </div>
                  <span
                    className="rounded-circle border border-2 border-white bg-primary btn-sm-square text-white position-absolute"
                    style={{ top: "10%", right: "20px" }}
                  >
                    {item.views}
                  </span>
                </div>
              </div>
              <div className="col-8">
                <div className="features-content d-flex flex-column">
                  <p className="text-uppercase mb-2">{item.category}</p>
                  <Link to={`/news/${item._id}`} className="h6">
                    {`${item.headline?.slice(0, 30)}...` || "Untitled Article"}
                  </Link>
                  <small className="text-body d-block">
                    <i className="fas fa-calendar-alt me-1"></i>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
