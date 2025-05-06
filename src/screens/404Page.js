import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
            <h1 className="display-1">404</h1>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">
              We’re sorry, the page you have looked for does not exist in our
              website! Maybe go to our home page or try to use a search?
            </p>
            <button
              onClick={() => navigate(-1)}
              className="btn border border-primary rounded-pill py-3 px-5"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
