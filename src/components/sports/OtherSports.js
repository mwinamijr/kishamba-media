import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const mostViewedNews = [
  {
    image: "img/news-7.jpg",
    title: "There are many variations of passages of Lorem Ipsum available,",
    author: "Willium Smith",
    date: "Dec 9, 2024",
  },
  {
    image: "img/news-6.jpg",
    title: "There are many variations of passages of Lorem Ipsum available,",
    author: "Willium Smith",
    date: "Dec 9, 2024",
  },
  {
    image: "img/news-3.jpg",
    title: "There are many variations of passages of Lorem Ipsum available,",
    author: "Willium Smith",
    date: "Dec 9, 2024",
  },
  {
    image: "img/news-4.jpg",
    title: "There are many variations of passages of Lorem Ipsum available,",
    author: "Willium Smith",
    date: "Dec 9, 2024",
  },
  {
    image: "img/news-5.jpg",
    title: "There are many variations of passages of Lorem Ipsum available,",
    author: "Willium Smith",
    date: "Dec 9, 2024",
  },
];

const MostViewedSports = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <div className="border-bottom mb-4">
        <h2 className="my-4">International Sports</h2>
      </div>
      <Slider {...settings}>
        {mostViewedNews.map((item, index) => (
          <div key={index} className="px-2">
            <div className="latest-news-item">
              <div className="bg-light rounded">
                <div className="rounded-top overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-zoomin img-fluid rounded-top w-100"
                  />
                </div>
                <div className="d-flex flex-column p-4">
                  <Link to="#" className="h4">
                    {item.title}
                  </Link>
                  <div className="d-flex justify-content-between">
                    <Link to="#" className="small text-body link-hover">
                      by {item.author}
                    </Link>
                    <small className="text-body d-block">
                      <i className="fas fa-calendar-alt me-1"></i> {item.date}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MostViewedSports;
