import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { fetchArticles } from "../../features/news/articleSlice";
import { useDispatch, useSelector } from "react-redux";

const InternationalNews = () => {
  const dispatch = useDispatch();

  const { loading, error, articles } = useSelector(
    (state) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Helper to get first image URL from contentBlocks
  const getFirstImageFromContentBlocks = (contentBlocks) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;

    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock ? firstImageBlock.imageUrl : null;
  };

  // Process articles: filter ones with "international" tag and assign fallback image
  const internationalArticles = articles
    .filter(
      (article) =>
        Array.isArray(article.tags) &&
        article.tags.some((tag) =>
          typeof tag === "string"
            ? tag.toLowerCase() === "international"
            : tag.name?.toLowerCase() === "international"
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
      <div className="section-title">
        <h4 className="m-0 text-uppercase font-weight-bold">
          International News
        </h4>
      </div>

      {loading && <p className="text-danger">Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Slider {...settings}>
        {internationalArticles.map((item, index) => (
          <div key={index} className="px-2">
            <div
              className="position-relative overflow-hidden"
              style={{ height: "300px" }}
            >
              <img
                className="img-fluid h-100 w-100"
                src={item.img}
                alt={item.title}
                style={{ objectFit: "cover" }}
              />
              <div
                className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3"
                style={{ background: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="mb-2">
                  <Link
                    className="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                    to="#"
                  >
                    {item.category}
                  </Link>
                  <Link className="text-white" to="#">
                    <small>{item.date}</small>
                  </Link>
                </div>
                <Link
                  className="h6 m-0 text-white text-uppercase font-weight-semi-bold"
                  to={`/news/${item._id}`}
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
