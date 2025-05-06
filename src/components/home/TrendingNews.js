import React from "react";
import { Link } from "react-router-dom";

const trendingNews = [
  {
    image: "img/news-110x110-1.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    image: "img/news-110x110-2.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    image: "img/news-110x110-3.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    image: "img/news-110x110-4.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
  {
    image: "img/news-110x110-5.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Lorem ipsum dolor sit amet elit...",
  },
];

const TrendingNews = () => {
  return (
    <div className="mb-4">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Trending News</h4>
      </div>
      <div className="bg-white border border-top-0 p-3">
        {trendingNews.map((news, index) => (
          <div
            className="d-flex align-items-center bg-white mb-3"
            style={{ height: "110px" }}
            key={index}
          >
            <img className="img-fluid" src={news.image} alt="news" />
            <div className="w-100 h-100 px-3 d-flex flex-column justify-content-center border border-left-0">
              <div className="mb-2">
                <Link
                  className="badge badge-primary text-uppercase font-weight-semi-bold p-1 mr-2"
                  to="#"
                >
                  {news.category}
                </Link>
                <Link className="text-body" to="#">
                  <small>{news.date}</small>
                </Link>
              </div>
              <Link
                className="h6 m-0 text-secondary text-uppercase font-weight-bold"
                to="#"
              >
                {news.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
