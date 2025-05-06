import React from "react";
import { Link } from "react-router-dom";

const TopSports = () => {
  return (
    <div className="row g-4">
      {/* Left Column */}
      <div className="col-lg-7 col-xl-8 mt-0">
        <div className="position-relative overflow-hidden ">
          <img
            src="img/news-1.jpg"
            className="img-fluid  img-zoomin w-100"
            alt=""
          />
          <div
            className="d-flex justify-content-center px-4 position-absolute flex-wrap"
            style={{ bottom: "10px", left: 0 }}
          >
            <Link to="#" className="text-white me-3 link-hover">
              <i className="fa fa-clock"></i> 06 minute read
            </Link>
            <Link to="#" className="text-white me-3 link-hover">
              <i className="fa fa-eye"></i> 3.5k Views
            </Link>
            <Link to="#" className="text-white me-3 link-hover">
              <i className="fa fa-comment-dots"></i> 05 Comment
            </Link>
            <Link to="#" className="text-white link-hover">
              <i className="fa fa-arrow-up"></i> 1.5k Share
            </Link>
          </div>
        </div>

        <div className="border-bottom py-3">
          <Link to="#" className="display-4 text-dark mb-0 link-hover">
            Lorem Ipsum is simply dummy text of the printing
          </Link>
        </div>

        <p className="mt-3 mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry...
        </p>

        {/* Top Story */}
        <div className="bg-light p-4 ">
          <div className="news-2">
            <h3 className="mb-4">Top Story</h3>
          </div>
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div className=" overflow-hidden">
                <img
                  src="img/news-2.jpg"
                  className="img-fluid  img-zoomin w-100"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <Link to="#" className="h3">
                  Stoneman Clandestine Ukrainian claims successes against
                  Russian.
                </Link>
                <p className="mb-0 fs-5">
                  <i className="fa fa-clock"></i> 06 minute read
                </p>
                <p className="mb-0 fs-5">
                  <i className="fa fa-eye"></i> 3.5k Views
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-lg-5 col-xl-4">
        <div className="bg-light  p-4 pt-0">
          <div className="row g-4">
            {/* First Large News Box */}
            <div className="col-12">
              <div className=" overflow-hidden">
                <img
                  src="img/news-3.jpg"
                  className="img-fluid  img-zoomin w-100"
                  alt=""
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <Link to="#" className="h4 mb-2">
                  Get the best speak market, news.
                </Link>
                <p className="fs-5 mb-0">
                  <i className="fa fa-clock"></i> 06 minute read
                </p>
                <p className="fs-5 mb-0">
                  <i className="fa fa-eye"></i> 3.5k Views
                </p>
              </div>
            </div>

            {/* Reusable News List */}
            {[3, 4, 5, 6, 7, 7].map((num, index) => (
              <div className="col-12" key={index}>
                <div className="row align-items-center">
                  <div className="col-5">
                    <div className="overflow-hidden ">
                      <img
                        src={`img/news-${num}.jpg`}
                        className="img-zoomin img-fluid  w-100"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="features-content d-flex flex-column">
                      <Link to="#" className="h6">
                        Get the best speak market, news.
                      </Link>
                      <small>
                        <i className="fa fa-clock"></i> 06 minute read
                      </small>
                      <small>
                        <i className="fa fa-eye"></i> 3.5k Views
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
};

export default TopSports;
