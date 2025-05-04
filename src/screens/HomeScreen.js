import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NewsCarousel from "../components/home/NewsSlider";
import BreakingNewsTicker from "../components/home/BreakingNews";
import TopFeature from "../components/home/TopFeature";

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

      <br />
      <div className="row mb-2">
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                World
              </strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Design
              </strong>
              <h3 className="mb-0">Post title</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                World
              </strong>
              <h3 className="mb-0">Featured post</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-success">
                Design
              </strong>
              <h3 className="mb-0">Post title</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                This is a wider card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link to="#" className="stretched-link">
                Continue reading
              </Link>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                  Thumbnail
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Sports</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | football</div>

          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | football</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | football</div>
        </div>

        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Bussiness</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Arusha</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Arusha</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Arusha</div>
        </div>
        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Fashion</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Congo</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Congo</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Congo</div>
        </div>
        <div className="col-sm-3">
          <hr />
          <h3 className="mb-0">Tech</h3>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Kenya</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Kenya</div>
          <p className="mb-auto">
            This is a wider card with supporting text below as a natural lead-in
            to additional content.
          </p>
          <div className="mb-4 text-muted">2 days ago | Kenya</div>
        </div>
      </div>
    </>
  );
};

export default Home;
