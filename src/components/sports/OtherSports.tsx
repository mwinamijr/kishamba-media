import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

type Article = {
  _id: string,
  headline: string,
  image?: string,
  author?: string,
  createdAt: string,
  tags?: string[],
};

interface OtherSportsProps {
  articles?: Article[];
  loading?: boolean;
}

const OtherSports: React.FC<OtherSportsProps> = ({
  articles = [],
  loading,
}) => {
  const filteredArticles = articles.filter(
    (article) =>
      Array.isArray(article.tags) &&
      !article.tags.includes("football") &&
      !article.tags.includes("soccer")
  );

  const sortedArticles = [...filteredArticles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
      <div className="border-b mb-4">
        <h2 className="my-4 text-2xl font-semibold">Other Sports</h2>
      </div>
      <Slider {...settings}>
        {sortedArticles.slice(0, 6).map((item, index) => (
          <div key={index} className="px-2">
            <div className="flex flex-col bg-gray-100 rounded overflow-hidden h-[350px]">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image || "/img/placeholder.jpg"}
                  alt={item.headline}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between p-4 flex-grow">
                <Link
                  to={`/habari/${item._id}`}
                  className="text-lg font-semibold mb-2 text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {item.headline}
                </Link>
                <div className="flex justify-between text-sm text-gray-600 mt-auto">
                  <Link to="#" className="hover:underline">
                    by {item.author || "Unknown"}
                  </Link>
                  <span>
                    <i className="fas fa-calendar-alt mr-1"></i>
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
