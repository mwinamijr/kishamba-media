import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

interface ContentBlock {
  type: string;
  imageUrl?: string;
}

interface Post {
  contentBlocks?: ContentBlock[];
}

interface Tag {
  name?: string;
}

interface Article {
  _id: string;
  image?: string;
  headline?: string;
  createdAt: string;
  category?: string;
  tags?: (string | Tag)[];
  post?: Post;
}

interface InternationalNewsProps {
  articles?: Article[];
  loading?: boolean;
}

const InternationalNews: React.FC<InternationalNewsProps> = ({ articles = [], loading }) => {
  const getFirstImageFromContentBlocks = (contentBlocks?: ContentBlock[]): string | null => {
    if (!contentBlocks?.length) return null;
    const firstImageBlock = contentBlocks.find((block) => block.type === "image");
    return firstImageBlock?.imageUrl ?? null;
  };

  const internationalArticles = articles
    .filter((article) =>
      Array.isArray(article.tags) &&
      article.tags.some((tag) =>
        typeof tag === "string"
          ? tag.toLowerCase() === "kimataifa"
          : tag.name?.toLowerCase() === "kimataifa"
      )
    )
    .map((article) => ({
      ...article,
      img:
        article.image ||
        getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
        "/img/news-700x435-1.jpg",
      category: article.category || "General",
      date: new Date(article.createdAt).toLocaleDateString(),
      title: article.headline || "Untitled Article",
    }))
    .slice(0, 5);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container-fluid pt-3 mb-3">
      <div className="mb-4">
        <h4 className="uppercase font-bold text-lg">International News</h4>
      </div>

      {loading && <p className="text-red-600">Loading...</p>}

      <Slider {...settings}>
        {internationalArticles.map((item, index) => (
          <div key={index} className="px-2">
            <div className="relative overflow-hidden h-[300px]">
              <img
                className="w-full h-full object-cover"
                src={item.img}
                alt={item.title}
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="mb-2 flex items-center space-x-2">
                  <Link
                    to="#"
                    className="bg-blue-600 text-white uppercase font-semibold px-2 py-1 rounded"
                  >
                    {item.category}
                  </Link>
                  <Link to="#" className="text-white text-sm">
                    <small>{item.date}</small>
                  </Link>
                </div>
                <Link
                  to={`/habari/${item._id}`}
                  className="text-white uppercase font-semibold text-base line-clamp-2"
                >
                  {item.title.length > 40
                    ? `${item.title.slice(0, 40)}...`
                    : item.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InternationalNews;
