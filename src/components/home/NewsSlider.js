// components/MainCarousel.js
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const mainSlides = [
  {
    img: "/img/news-800x500-1.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit. Proin vitae porta diam...",
  },
  {
    img: "/img/news-800x500-2.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit. Proin vitae porta diam...",
  },
  {
    img: "/img/news-800x500-3.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit. Proin vitae porta diam...",
  },
];

const sideSlides = [
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
];

const MainCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Main Carousel */}
        <div className="col-lg-7 px-0">
          <Slider {...settings}>
            {mainSlides.map((slide, idx) => (
              <div
                key={idx}
                className="position-relative overflow-hidden"
                style={{ height: "500px" }}
              >
                <img
                  src={slide.img}
                  alt="main"
                  className="img-fluid h-100 w-100"
                  style={{ objectFit: "cover" }}
                />
                <div className="overlay">
                  <div className="mb-2">
                    <Link
                      className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      to="#"
                    >
                      {slide.category}
                    </Link>
                    <Link className="text-white" to="#">
                      {slide.date}
                    </Link>
                  </div>
                  <Link
                    className="h2 m-0 text-white text-uppercase font-weight-bold"
                    to="#"
                  >
                    {slide.title}
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Smaller Tiles */}
        <div className="col-lg-5 px-0">
          <div className="d-flex flex-wrap h-100">
            {sideSlides.map((slide, idx) => (
              <div
                key={idx}
                className="position-relative overflow-hidden"
                style={{
                  width: "50%",
                  height: "250px",
                }}
              >
                <img
                  src={slide.img}
                  alt="side"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div className="overlay">
                  <div className="mb-2">
                    <Link
                      className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                      to="#"
                    >
                      {slide.category}
                    </Link>
                    <Link className="text-white" to="#">
                      <small>{slide.date}</small>
                    </Link>
                  </div>
                  <Link
                    className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                    to="#"
                  >
                    {slide.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
