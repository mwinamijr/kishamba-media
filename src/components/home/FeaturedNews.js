import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const newsItems = [
  {
    img: "/img/news-700x435-1.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    img: "/img/news-700x435-2.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    img: "/img/news-700x435-3.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    img: "/img/news-700x435-4.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    img: "/img/news-700x435-5.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
];

const FeaturedNews = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container-fluid pt-5 mb-3">
      <div className="container">
        <div className="section-title">
          <h4 className="m-0 text-uppercase font-weight-bold">Featured News</h4>
        </div>
        <Slider {...settings}>
          {newsItems.map((item, index) => (
            <div key={index} className="px-2">
              <div
                className="position-relative overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  className="img-fluid h-100 w-100"
                  src={item.img}
                  alt={item.title}
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
                  style={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="mb-2">
                    <Link
                      className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      to="#"
                    >
                      {item.category}
                    </Link>
                    <Link className="text-white" to="#">
                      <small>{item.date}</small>
                    </Link>
                  </div>
                  <Link
                    className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                    to="#"
                  >
                    {item.title}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedNews;
