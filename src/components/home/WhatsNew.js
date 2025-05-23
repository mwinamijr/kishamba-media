import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const tabs = [
  { id: "tab-1", title: "Sports" },
  { id: "tab-2", title: "Entert" },
  { id: "tab-3", title: "Politics" },
  { id: "tab-4", title: "Technology" },
  { id: "tab-5", title: "Fashion" },
];

export default function WhatsNew({ articles = [], loading }) {
  const [activeTab, setActiveTab] = useState("tab-1");

  const tabCategory = useMemo(() => {
    const tabMap = {
      "tab-1": "sports",
      "tab-2": "entertainment",
      "tab-3": "politics",
      "tab-4": "technology",
      "tab-5": "fashion",
    };
    return tabMap[activeTab];
  }, [activeTab]);

  // Helper to get first image URL from contentBlocks
  const getFirstImageFromContentBlocks = (contentBlocks) => {
    if (!contentBlocks || contentBlocks.length === 0) return null;

    const firstImageBlock = contentBlocks.find(
      (block) => block.type === "image"
    );
    return firstImageBlock ? firstImageBlock.imageUrl : null;
  };

  const processedArticles = articles.map((article) => {
    return {
      ...article,
      image:
        article.image ||
        getFirstImageFromContentBlocks(article.post?.contentBlocks) ||
        "/img/news-110x110-1.jpg",
    };
  });

  const filteredArticles = useMemo(() => {
    const sorted = [...processedArticles]
      .filter((article) => article.category === tabCategory)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return {
      main: sorted[0],
      items: sorted.slice(1, 6),
    };
  }, [processedArticles, tabCategory]);
  console.log(filteredArticles);

  return (
    <div className="mb-5">
      <div className="d-flex flex-column flex-md-row justify-content-md-between border-bottom mb-4">
        <h1 className="mb-4">What’s New</h1>
        <ul className="nav nav-pills d-inline-flex text-center">
          {tabs.map((tab) => (
            <li className="nav-item mb-3" key={tab.id}>
              <button
                className={`d-flex py-2 bg-light rounded-pill mr-2 ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
                style={{ border: "none", background: "transparent" }}
              >
                <span className="text-dark" style={{ width: "100px" }}>
                  {tab.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {!loading && filteredArticles.main ? (
        <div className="tab-pane fade show active p-0">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="position-relative rounded overflow-hidden">
                <img
                  src={filteredArticles.main.image}
                  className="img-zoomin img-fluid rounded w-100"
                  alt=""
                />
                <div
                  className="position-absolute text-white px-4 py-2 bg-primary rounded"
                  style={{ top: "20px", right: "20px" }}
                >
                  {filteredArticles.main.category}
                </div>
              </div>
              <div className="my-4">
                <Link to="#" className="h4">
                  {filteredArticles.main.headline}
                </Link>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="#" className="text-dark link-hover me-3">
                  <i className="fa fa-clock"></i> 06 minute read
                </Link>
                <Link to="#" className="text-dark link-hover me-3">
                  <i className="fa fa-eye"></i> {filteredArticles.main.views}
                </Link>
                <Link to="#" className="text-dark link-hover me-3">
                  <i className="fa fa-comment-dots"></i> 05 Comment
                </Link>
                <Link to="#" className="text-dark link-hover">
                  <i className="fa fa-arrow-up"></i> 1.5k Share
                </Link>
              </div>
              <p className="my-4">{filteredArticles.main.summary}</p>
            </div>
            <div className="col-lg-4">
              <div className="row g-4">
                {filteredArticles.items.map((item, index) => (
                  <div className="col-12" key={index}>
                    <div className="row g-4 align-items-center">
                      <div className="col-5">
                        <div className="overflow-hidden rounded">
                          <img
                            src={item.image}
                            className="img-zoomin img-fluid rounded w-100"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-7">
                        <div className="features-content d-flex flex-column">
                          <p className="text-uppercase mb-2">{item.category}</p>
                          <Link to="#" className="h6">
                            {`${item.headline?.slice(0, 30)}...` ||
                              "Untitled Article"}
                          </Link>
                          <small className="text-body d-block">
                            <i className="fas fa-calendar-alt me-1"></i>{" "}
                            {new Date(item.createdAt).toLocaleDateString()}
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
      ) : (
        <p>No articles...</p>
      )}
    </div>
  );
}
