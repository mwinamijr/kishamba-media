import React from "react";
import { Link } from "react-router-dom";

const NewsletterSubscription = () => {
  return (
    <div
      className="pb-4 mb-4"
      style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
    >
      <div className="row g-4">
        <div className="col-lg-3">
          <Link to="#" className="d-flex flex-column flex-wrap">
            <p className="text-white mb-0 display-6">Kishamba Media</p>
            <small
              className="text-light"
              style={{ letterSpacing: "11px", lineHeight: 0 }}
            >
              Newspaper
            </small>
          </Link>
        </div>
        <div className="col-lg-9">
          <div className="d-flex position-relative rounded-pill overflow-hidden">
            <input
              className="form-control border-0 w-100 p-3 rounded-pill"
              type="email"
              placeholder="example@gmail.com"
            />
            <button
              type="submit"
              className="btn btn-primary border-0 pt-2 pb-2 rounded-pill text-white position-absolute"
              style={{ top: 0, right: 0 }}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
