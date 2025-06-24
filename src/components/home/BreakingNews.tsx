import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

interface Article {
  _id: string;
  headline?: string;
  isBreaking: boolean;
  createdAt: string;
}

interface BreakingNewsTickerProps {
  articles?: Article[];
}

const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ articles = [] }) => {
  const breakingNewsItems = articles
    .filter((article) => article.isBreaking)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 2)
    .map((article) => ({
      id: article._id,
      headline: article.headline || "Untitled",
    }));

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
    <div className="bg-gray-900 py-3 mb-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center bg-gray-900">
          {/* Breaking News Label */}
          <div
            className="bg-orange-500 text-gray-900 text-center font-semibold py-2 px-4 whitespace-nowrap truncate flex-shrink-0"
            style={{ width: "170px" }}
          >
            Breaking News
          </div>

          {/* News ticker slider */}
          <div
            className="ml-3 flex-grow relative"
            style={{ overflow: "hidden", paddingRight: "90px" }}
          >
            <Slider {...settings} className="inline-flex items-center">
              {breakingNewsItems.map((item, idx) => (
                <div key={item.id} className="truncate px-3">
                  <Link
                    to={`/habari/${item.id}`}
                    className="text-white uppercase font-semibold whitespace-nowrap"
                  >
                    {`${idx + 1}. ${item.headline}`}
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
