import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { fetchArticles } from "../features/news/articleSlice";

import NewsCarousel from "../components/home/NewsSlider";
import BreakingNewsTicker from "../components/home/BreakingNews";
import TopFeature from "../components/home/TopFeature";
import InternationalNews from "../components/home/InternationalNews";
import LatestNews from "../components/home/LatestNews";
import FollowUs from "../components/home/Followus";
import TrendingNews from "../components/home/TrendingNews";
import WhatsNew from "../components/home/WhatsNew";

const tags = [
  "Siasa",
  "Biashara",
  "Burudani",
  "Kilimo",
  "Afya",
  "Education",
  "Sayansi",
  "Biashara",
  "Chakula",
  "Safari",
];

const Home = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector(
    (state) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Kishamba Media | Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media home page" />
        <meta name="description" content="Kishamba media home page" />
      </Helmet>

      {error && <p className="text-danger">{error}</p>}

      <NewsCarousel />
      <BreakingNewsTicker articles={articles} />
      <TopFeature />

      <div className="container-fluid">
        <div className="custom-container">
          <InternationalNews articles={articles} loading={loading} />
          <div className="row">
            <div className="col-lg-8">
              <WhatsNew articles={articles} loading={loading} />
              <LatestNews articles={articles} loading={loading} />
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
              <TrendingNews articles={articles} loading={loading} />
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
};

export default Home;
