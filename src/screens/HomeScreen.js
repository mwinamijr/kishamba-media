import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NewsCarousel from "../components/home/NewsSlider";
import BreakingNewsTicker from "../components/home/BreakingNews";
import TopFeature from "../components/home/TopFeature";
import FeaturedNews from "../components/home/FeaturedNews";
import LatestNews from "../components/home/LatestNews";
import FollowUs from "../components/home/Followus";
import TrendingNews from "../components/home/TrendingNews";
import WhatsNew from "../components/home/WhatsNew";

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

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Kishamba Media | Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media home page" />
        <meta name="description" content="Kishamba media home page" />
      </Helmet>

      <NewsCarousel />
      <BreakingNewsTicker />
      <TopFeature />

      <div className="container-fluid">
        <FeaturedNews />
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <WhatsNew />
              <LatestNews />
            </div>
            <div class="col-lg-4">
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

              <div className="mb-3">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
