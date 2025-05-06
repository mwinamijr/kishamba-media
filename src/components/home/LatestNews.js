import React from "react";
import { Link } from "react-router-dom";

// Sample newsItems
const newsItems = [
  {
    id: 1,
    image: "img/news-700x435-1.jpg",
    category: "Business",
    date: "Jan 01, 2045",
    title: "Large card - Lorem ipsum dolor sit amet elit...",
    description: "Dolor lorem eos dolor duo...",
    author: "John Doe",
    views: 12345,
    comments: 123,
  },
  {
    id: 2,
    image: "img/news-700x435-2.jpg",
    category: "Health",
    date: "Feb 12, 2045",
    title: "Large card - Sed ut perspiciatis unde omnis...",
    description: "Dolor sit magna rebum...",
    author: "Jane Smith",
    views: 8541,
    comments: 78,
  },
  {
    id: 3,
    image: "img/news-110x110-1.jpg",
    category: "Politics",
    date: "Mar 03, 2045",
    title: "Small card - At vero eos et accusamus...",
    author: "Alice Brown",
    views: 3000,
    comments: 25,
  },
  {
    id: 4,
    image: "img/news-110x110-2.jpg",
    category: "Science",
    date: "Apr 14, 2045",
    title: "Small card - Nemo enim ipsam voluptatem...",
    author: "Bob Lee",
    views: 4120,
    comments: 34,
  },
  {
    id: 5,
    image: "img/news-700x435-3.jpg",
    category: "Travel",
    date: "May 05, 2045",
    title: "Split view - Ut enim ad minima veniam...",
    description: "Quis autem vel eum iure reprehenderit...",
    author: "Lisa King",
    views: 7689,
    comments: 88,
  },
];

const NewsCard = ({ item }) => (
  <div className="col-lg-6">
    <div className="position-relative mb-3">
      <img
        className="img-fluid w-100"
        src={item.image}
        style={{ objectFit: "cover" }}
        alt=""
      />
      <div className="bg-white border border-top-0 p-4">
        <div className="mb-2">
          <Link
            className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
            to="#"
          >
            {item.category}
          </Link>
          <Link className="text-body" to="#">
            <small>{item.date}</small>
          </Link>
        </div>
        <Link
          className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
          to="#"
        >
          {item.title}
        </Link>
        <p className="m-0">{item.description}</p>
      </div>
      <div className="d-flex justify-content-between bg-white border border-top-0 p-4">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle mr-2"
            src="img/user.jpg"
            width="25"
            height="25"
            alt="author"
          />
          <small>{item.author}</small>
        </div>
        <div className="d-flex align-items-center">
          <small className="ml-3">
            <i className="far fa-eye mr-2"></i>
            {item.views}
          </small>
          <small className="ml-3">
            <i className="far fa-comment mr-2"></i>
            {item.comments}
          </small>
        </div>
      </div>
    </div>
  </div>
);

const SmallNewsCard = ({ item }) => (
  <div className="d-flex mb-3">
    <img
      src={item.image}
      style={{ width: 100, height: 100, objectFit: "cover" }}
      alt=""
    />
    <div className="w-100 d-flex flex-column justify-content-center bg-white border border-left-0 px-3">
      <div className="mb-1">
        <Link className="text-body" to="#">
          <small>{item.date}</small>
        </Link>
      </div>
      <Link
        className="h6 m-0 text-secondary text-uppercase font-weight-bold"
        to="#"
      >
        {item.title}
      </Link>
    </div>
  </div>
);

const SplitViewCard = ({ item }) => (
  <div className="bg-white border border-top-0 p-4 d-flex mb-4">
    <img
      className="img-fluid mr-4"
      style={{ width: "50%", objectFit: "cover" }}
      src={item.image}
      alt=""
    />
    <div>
      <div className="mb-2">
        <Link
          className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
          to="#"
        >
          {item.category}
        </Link>
        <Link className="text-body" to="#">
          <small>{item.date}</small>
        </Link>
      </div>
      <Link
        className="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold"
        to="#"
      >
        {item.title}
      </Link>
      <p className="m-0">{item.description}</p>
    </div>
  </div>
);

const LatestNews = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="section-title d-flex justify-content-between">
          <h4 className="m-0 text-uppercase font-weight-bold">Latest News</h4>
          <Link
            className="text-secondary font-weight-medium text-decoration-none"
            to="#"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Large 2-column cards */}
      {newsItems.slice(0, 2).map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}

      {/* Ad Banner */}
      <div className="col-lg-12 mb-3">
        <Link to="#">
          <img className="img-fluid w-100" src="img/ads-728x90.png" alt="Ad" />
        </Link>
      </div>

      {/* Small horizontal cards */}
      <div className="col-lg-12">
        {newsItems.slice(2, 4).map((item) => (
          <SmallNewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Split View card */}
      <div className="col-lg-12">
        <SplitViewCard item={newsItems[4]} />
      </div>
    </div>
  );
};

export default LatestNews;
