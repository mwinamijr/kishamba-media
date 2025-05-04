import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const breakingNewsItems = [
  "1. Lorem ipsum dolor sit amet elit. Proin interdum lacus eget ante tincidunt, sed faucibus nisl sodales",
  "2. Lorem ipsum dolor sit amet elit. Proin interdum lacus eget ante tincidunt, sed faucibus nisl sodales",
];

const BreakingNewsTicker = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 6000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
  };

  return (
    <div className="container-fluid bg-dark py-3 mb-3">
      <div className="container">
        <div className="row align-items-center bg-dark">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="bg-primary text-dark text-center font-weight-medium py-2 px-3"
                style={{
                  width: "170px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flexShrink: 0,
                }}
              >
                Breaking News
              </div>
              <div
                className="ml-3 flex-grow-1 position-relative"
                style={{ overflow: "hidden", paddingRight: "90px" }}
              >
                <Slider
                  {...settings}
                  className="d-inline-flex align-items-center"
                >
                  {breakingNewsItems.map((item, idx) => (
                    <div key={idx} className="text-truncate px-3">
                      <Link
                        className="text-white text-uppercase font-weight-semi-bold"
                        to="#"
                      >
                        {item}
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
