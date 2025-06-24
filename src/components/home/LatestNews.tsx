import React from "react";
import { Link } from "react-router-dom";

interface NewsItem {
  id: number;
  image: string;
  category: string;
  date: string;
  title: string;
  description?: string;
  author: string;
  views: number;
  comments: number;
}

const newsItems: NewsItem[] = [
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

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <div className="w-full lg:w-1/2 px-2 mb-6">
    <div className="relative mb-3">
      <img
        className="w-full h-64 object-cover"
        src={item.image}
        alt=""
      />
      <div className="bg-white border border-t-0 p-6">
        <div className="mb-2 flex items-center">
          <Link
            className="bg-blue-600 text-white uppercase font-semibold px-3 py-1 mr-2 rounded"
            to="#"
          >
            {item.category}
          </Link>
          <Link className="text-gray-600 text-sm" to="#">
            <small>{item.date}</small>
          </Link>
        </div>
        <Link
          className="block mb-3 text-gray-800 uppercase font-bold text-xl hover:text-blue-600"
          to="#"
        >
          {item.title}
        </Link>
        {item.description && <p className="m-0 text-gray-700">{item.description}</p>}
      </div>
      <div className="flex justify-between bg-white border border-t-0 p-6">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            src="img/user.jpg"
            width="25"
            height="25"
            alt="author"
          />
          <small className="text-gray-700">{item.author}</small>
        </div>
        <div className="flex items-center space-x-6 text-gray-700 text-sm">
          <small className="flex items-center space-x-1">
            <i className="far fa-eye"></i>
            <span>{item.views}</span>
          </small>
          <small className="flex items-center space-x-1">
            <i className="far fa-comment"></i>
            <span>{item.comments}</span>
          </small>
        </div>
      </div>
    </div>
  </div>
);

const SmallNewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <div className="flex mb-3 bg-white border border-l-0">
    <img
      src={item.image}
      alt=""
      className="w-24 h-24 object-cover"
    />
    <div className="flex-1 flex flex-col justify-center px-3">
      <div className="mb-1">
        <Link className="text-gray-600 text-sm" to="#">
          <small>{item.date}</small>
        </Link>
      </div>
      <Link
        className="text-gray-800 uppercase font-bold text-lg"
        to="#"
      >
        {item.title}
      </Link>
    </div>
  </div>
);

const SplitViewCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <div className="bg-white border border-t-0 p-6 flex mb-6">
    <img
      className="w-1/2 object-cover mr-6"
      src={item.image}
      alt=""
    />
    <div className="flex-1">
      <div className="mb-2 flex items-center">
        <Link
          className="bg-blue-600 text-white uppercase font-semibold px-3 py-1 mr-2 rounded"
          to="#"
        >
          {item.category}
        </Link>
        <Link className="text-gray-600 text-sm" to="#">
          <small>{item.date}</small>
        </Link>
      </div>
      <Link
        className="block mb-3 text-gray-800 uppercase font-bold text-xl hover:text-blue-600"
        to="#"
      >
        {item.title}
      </Link>
      {item.description && <p className="m-0 text-gray-700">{item.description}</p>}
    </div>
  </div>
);

const LatestNews: React.FC = () => {
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full px-2 mb-4 flex justify-between items-center">
        <h4 className="uppercase font-bold text-xl">Latest News</h4>
        <Link
          className="text-gray-600 font-semibold underline hover:text-gray-900"
          to="#"
        >
          View All
        </Link>
      </div>

      {/* Large 2-column cards */}
      {newsItems.slice(0, 2).map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}

      {/* Ad Banner */}
      <div className="w-full px-2 mb-6">
        <Link to="#">
          <img className="w-full h-auto" src="img/ads-728x90.png" alt="Ad" />
        </Link>
      </div>

      {/* Small horizontal cards */}
      <div className="w-full lg:w-1/2 px-2">
        {newsItems.slice(1, 3).map((item) => (
          <SmallNewsCard key={item.id} item={item} />
        ))}
      </div>
      <div className="w-full lg:w-1/2 px-2">
        {newsItems.slice(3, 5).map((item) => (
          <SmallNewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Split View card */}
      <div className="w-full px-2">
        <SplitViewCard item={newsItems[4]} />
      </div>
    </div>
  );
};

export default LatestNews;
