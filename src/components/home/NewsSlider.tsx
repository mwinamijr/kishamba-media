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

const MainCarousel: React.FC = () => {
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
    <div className="w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Left Main Carousel */}
        <div className="w-full lg:w-7/12">
          <Slider {...settings}>
            {mainSlides.map((slide, idx) => (
              <div key={idx} className="relative h-[500px] overflow-hidden">
                <img
                  src={slide.img}
                  alt="main"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    <Link
                      to="#"
                      className="bg-blue-600 text-white uppercase font-semibold px-2 py-1 rounded text-xs"
                    >
                      {slide.category}
                    </Link>
                    <Link to="#" className="text-white text-xs">
                      {slide.date}
                    </Link>
                  </div>
                  <Link
                    to="#"
                    className="text-white text-2xl uppercase font-bold leading-tight"
                  >
                    {slide.title}
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Right Smaller Tiles */}
        <div className="w-full lg:w-5/12 flex flex-wrap">
          {sideSlides.map((slide, idx) => (
            <div key={idx} className="relative w-1/2 h-[250px] overflow-hidden">
              <img
                src={slide.img}
                alt="side"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end">
                <div className="mb-2 flex items-center gap-2 text-sm">
                  <Link
                    to="#"
                    className="bg-blue-600 text-white uppercase font-semibold px-2 py-1 rounded text-xs"
                  >
                    {slide.category}
                  </Link>
                  <Link to="#" className="text-white text-xs">
                    {slide.date}
                  </Link>
                </div>
                <Link
                  to="#"
                  className="text-white text-sm uppercase font-semibold leading-tight"
                >
                  {slide.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
