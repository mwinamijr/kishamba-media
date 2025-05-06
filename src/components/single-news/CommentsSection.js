import React from "react";
import { Link } from "react-router-dom";

const CommentsSection = () => {
  return (
    <div className="mb-3">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">3 Comments</h4>
      </div>
      <div className="bg-white border border-top-0 p-4">
        <div className="media mb-4">
          <img
            src="/img/user.jpg"
            alt="User"
            className="img-fluid mr-3 mt-1"
            style={{ width: "45px" }}
          />
          <div className="media-body">
            <h6>
              <Link className="text-secondary font-weight-bold" to="#">
                John Doe
              </Link>{" "}
              <small>
                <i>01 Jan 2045</i>
              </small>
            </h6>
            <p>
              Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua,
              tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna
              dolores sed sed eirmod ipsum.
            </p>
            <button className="btn btn-sm btn-outline-secondary">Reply</button>
          </div>
        </div>

        <div className="media">
          <img
            src="/img/user.jpg"
            alt="User"
            className="img-fluid mr-3 mt-1"
            style={{ width: "45px" }}
          />
          <div className="media-body">
            <h6>
              <Link className="text-secondary font-weight-bold" to="#">
                John Doe
              </Link>{" "}
              <small>
                <i>01 Jan 2045</i>
              </small>
            </h6>
            <p>
              Diam amet duo labore stet elitr invidunt ea clita ipsum voluptua,
              tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna
              dolores sed sed eirmod ipsum.
            </p>
            <button className="btn btn-sm btn-outline-secondary">Reply</button>

            <div className="media mt-4">
              <img
                src="/img/user.jpg"
                alt="User"
                className="img-fluid mr-3 mt-1"
                style={{ width: "45px" }}
              />
              <div className="media-body">
                <h6>
                  <Link className="text-secondary font-weight-bold" to="#">
                    John Doe
                  </Link>{" "}
                  <small>
                    <i>01 Jan 2045</i>
                  </small>
                </h6>
                <p>
                  Diam amet duo labore stet elitr invidunt ea clita ipsum
                  voluptua, tempor labore accusam ipsum et no at. Kasd diam
                  tempor rebum magna dolores sed sed eirmod ipsum.
                </p>
                <button className="btn btn-sm btn-outline-secondary">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
