import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BreakingNewsTicker from "../components/home/BreakingNews";
import FollowUs from "../components/home/Followus";
import TrendingNews from "../components/home/TrendingNews";
import NewsArticle from "../components/single-news/NewsArticle";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../features/news/articleSlice";

const tags = [
  "Politics",
  "Business",
  "Corporate",
  "Business",
  "Health",
  "Education",
  "Science",
  "Business",
  "Foods",
  "Travel",
];

function NewsScreen() {
  const dispatch = useDispatch();

  const { articles, loading, error } = useSelector(
    (state) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      <br />
      {error && <p className="text-danger">{error}</p>}

      <BreakingNewsTicker articles={articles} loading={loading} />
      <div className="container-fluid">
        <div className="custom-container">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-9 col-lg-8">
              <NewsArticle />
            </div>
            <div className="col-lg-4">
              <FollowUs />

              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Advertisement
                  </h4>
                </div>
                <div className="bg-white text-center border border-top-0 p-3">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="img/news-800x500-2.jpg"
                      alt="Advertisement"
                    />
                  </Link>
                </div>
              </div>

              <TrendingNews />

              <div className="mb-4">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">Tags</h4>
                </div>
                <div className="bg-white border border-top-0 p-3">
                  <div className="d-flex flex-wrap m-n1">
                    {tags.map((tag, index) => (
                      <Link
                        key={index}
                        to="#"
                        className="btn btn-sm btn-outline-secondary m-1"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Advertisement
                  </h4>
                </div>
                <div className="bg-white text-center border border-top-0 p-3">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="img/news-800x500-2.jpg"
                      alt="Advertisement"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsScreen;
