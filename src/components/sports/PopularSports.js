import React from "react";
import { Link } from "react-router-dom";

const popularNews = [
  {
    img: "img/features-sports-1.jpg",
    category: "Sports",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
    badge: 3,
  },
  {
    img: "img/features-technology.jpg",
    category: "Technology",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
    badge: 3,
  },
  {
    img: "img/features-fashion.jpg",
    category: "Fashion",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
    badge: 3,
  },
  {
    img: "img/features-life-style.jpg",
    category: "Life Style",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
    badge: 3,
  },
];

export default function PopularSports() {
  return (
    <>
      <h4 className="my-4">Popular News</h4>
      <div className="row g-4">
        {popularNews.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="row g-4 align-items-center features-item">
              <div className="col-4">
                <div className="rounded-circle position-relative">
                  <div className="overflow-hidden rounded-circle">
                    <img
                      src={item.img}
                      className="img-zoomin img-fluid rounded-circle w-100"
                      alt={item.category}
                    />
                  </div>
                  <span
                    className="rounded-circle border border-2 border-white bg-primary btn-sm-square text-white position-absolute"
                    style={{ top: "10%", right: "-10px" }}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
              <div className="col-8">
                <div className="features-content d-flex flex-column">
                  <p className="text-uppercase mb-2">{item.category}</p>
                  <Link to="#" className="h6">
                    {item.title}
                  </Link>
                  <small className="text-body d-block">
                    <i className="fas fa-calendar-alt me-1"></i> {item.date}
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
