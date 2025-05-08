import React from "react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
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
              <h3 className="text-center mb-4 text-primary">Register</h3>
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="text-muted">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control py-3 rounded-pill"
                    id="username"
                    placeholder="Enter username"
                  />
                </div>
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
                <div className="form-group mb-3">
                  <label htmlFor="password" className="text-muted">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control py-3 rounded-pill"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="text-muted">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control py-3 rounded-pill"
                    id="confirmPassword"
                    placeholder="Confirm password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 rounded-pill"
                >
                  Register
                </button>
              </form>
              <div className="mt-3 text-center">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
