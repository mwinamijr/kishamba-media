import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, clearAuthError } from "../features/users/authSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, isAuthenticated, userInfo } = useSelector(
    (state) => state.auth
  );

  console.log(userInfo);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

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

              {error && (
                <div className="alert alert-danger text-center py-2">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-muted">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control py-3 rounded-pill"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 rounded-pill"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="mt-3 text-center">
                <small>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Register
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

export default LoginScreen;
