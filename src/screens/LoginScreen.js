import React from "react";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-md-6 col-lg-5">
            <div className="card p-4 rounded shadow">
              <div className="mb-3">
                <Link
                  to="/"
                  className="btn btn-outline-secondary rounded-pill px-4"
                >
                  ← Back to Home
                </Link>
              </div>
              <h3 className="text-center mb-4 text-primary">Login</h3>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-muted">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control py-3 rounded-pill"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control py-3 rounded-pill"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 rounded-pill"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
