import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const OtherSports = ({ articles = [], loading }) => {
  const filteredArticles = articles.filter(
    (article) =>
      Array.isArray(article.tags) &&
      !article.tags.includes("football") &&
      !article.tags.includes("soccer")
  );

  const sortedArticles = [...filteredArticles].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1084, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <div className="border-bottom mb-4">
        <h2 className="my-4">Other Sports</h2>
      </div>
      <Slider {...settings}>
        {sortedArticles.slice(0, 6).map((item, index) => (
          <div key={index} className="px-2">
            <div className="latest-news-item fixed-height d-flex flex-column bg-light rounded overflow-hidden">
              <div className="image-wrapper">
                <img
                  src={item.image || "img/placeholder.jpg"}
                  alt={item.headline}
                  className="img-zoomin img-fluid w-100 h-100 object-cover"
                />
              </div>
              <div className="d-flex flex-column justify-content-between p-4 flex-grow-1">
                <Link to={`/habari/${item._id}`} className="h5 mb-2">
                  {item.headline}
                </Link>
                <div className="d-flex justify-content-between mt-auto small text-body">
                  <Link to="#" className="link-hover">
                    by {item.author || "Unknown"}
                  </Link>
                  <span>
                    <i className="fas fa-calendar-alt me-1"></i>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OtherSports;
