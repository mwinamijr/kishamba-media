import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    img: "/img/features-sports-1.jpg",
    label: "Sports",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
  },
  {
    img: "/img/features-technology.jpg",
    label: "Technology",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
  },
  {
    img: "/img/features-fashion.jpg",
    label: "Fashion",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
  },
  {
    img: "/img/features-life-style.jpg",
    label: "Life Style",
    title: "Get the best speak market, news.",
    date: "December 9, 2024",
  },
];

const FeaturesSection = () => {
  return (
    <div className="container-fluid features mb-5">
      <div className="container py-5">
        <div className="row g-4">
          {features.map((item, idx) => (
            <div className="col-md-6 col-lg-6 col-xl-3" key={idx}>
              <div className="row g-4 align-items-center features-item">
                <div className="col-4">
                  <div className="rounded-circle position-relative">
                    <div className="overflow-hidden rounded-circle">
                      <img
                        src={item.img}
                        alt={item.label}
                        className="img-zoomin img-fluid rounded-circle w-100"
                      />
                    </div>
                    <span
                      className="rounded-circle border border-2 border-white bg-primary btn-sm-square text-white position-absolute"
                      style={{ top: "10%", right: "-10px" }}
                    >
                      3
                    </span>
                  </div>
                </div>
                <div className="col-8">
                  <div className="features-content d-flex flex-column">
                    <p className="text-uppercase mb-2">{item.label}</p>
                    <Link to="#" className="h6">
                      {item.title}
                    </Link>
                    <small className="text-body d-block">
                      <i className="fa fa-calendar"></i> {item.date}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
