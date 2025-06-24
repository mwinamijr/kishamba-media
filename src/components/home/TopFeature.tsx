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

const FeaturesSection: React.FC = () => {
  return (
    <div className="w-full mb-6">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              {/* Image with badge */}
              <div className="relative w-20 h-20">
                <img
                  src={item.img}
                  alt={item.label}
                  className="rounded-full object-cover w-full h-full"
                />
                <span className="absolute top-1 left-[85%] transform -translate-x-1/2 rounded-full bg-blue-600 text-white text-xs w-6 h-6 flex items-center justify-center border-2 border-white">
                  3
                </span>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <p className="uppercase text-sm text-gray-700 mb-1">
                  {item.label}
                </p>
                <Link
                  to="#"
                  className="text-base font-medium text-black hover:text-blue-600 transition"
                >
                  {item.title}
                </Link>
                <small className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fa fa-calendar"></i> {item.date}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
