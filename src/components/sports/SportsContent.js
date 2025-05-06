import React from "react";
import { Link } from "react-router-dom";

const sportsContent = {
  main: {
    img: "img/news-1.jpg",
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    category: "Sports",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's standard dummy..",
  },
  items: Array(5)
    .fill()
    .map((_, i) => ({
      img: `img/news-${i + 3}.jpg`,
      category: "Sports",
      title: "Get the best speak market, news.",
      date: "Dec 9, 2024",
    })),
};

export default function SportsContent() {
  return (
    <div className="mb-5">
      <h1 className="mb-4 border-bottom pb-2">What’s New - Sports</h1>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="position-relative rounded overflow-hidden">
            <img
              src={sportsContent.main.img}
              className="img-zoomin img-fluid rounded w-100"
              alt=""
            />
            <div
              className="position-absolute text-white px-4 py-2 bg-primary rounded"
              style={{ top: "20px", right: "20px" }}
            >
              {sportsContent.main.category}
            </div>
          </div>
          <div className="my-4">
            <Link to="#" className="h4">
              {sportsContent.main.title}
            </Link>
          </div>
          <div className="d-flex justify-content-between">
            <Link to="#" className="text-dark link-hover me-3">
              <i className="fa fa-clock"></i> 06 minute read
            </Link>
            <Link to="#" className="text-dark link-hover me-3">
              <i className="fa fa-eye"></i> 3.5k Views
            </Link>
            <Link to="#" className="text-dark link-hover me-3">
              <i className="fa fa-comment-dots"></i> 05 Comment
            </Link>
            <Link to="#" className="text-dark link-hover">
              <i className="fa fa-arrow-up"></i> 1.5k Share
            </Link>
          </div>
          <p className="my-4">{sportsContent.main.description}</p>
        </div>

        <div className="col-lg-4">
          <div className="row g-4">
            {sportsContent.items.map((item, index) => (
              <div className="col-12" key={index}>
                <div className="row g-4 align-items-center">
                  <div className="col-5">
                    <div className="overflow-hidden rounded">
                      <img
                        src={item.img}
                        className="img-zoomin img-fluid rounded w-100"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="features-content d-flex flex-column">
                      <p className="text-uppercase mb-2">{item.category}</p>
                      <Link to="#" className="h6">
                        {item.title}
                      </Link>
                      <small className="text-body d-block">
                        <i className="fas fa-calendar-alt me-1"></i> {item.date}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
