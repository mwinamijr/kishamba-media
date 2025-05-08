import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearAuthError } from "../features/users/authSlice";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [isAuthenticated, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError("");
    dispatch(registerUser({ username, email, password }));
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
              <h3 className="text-center mb-4 text-primary">Register</h3>

              {(error || localError) && (
                <div className="alert alert-danger text-center py-2">
                  {localError || error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="username" className="text-muted">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control py-3 rounded-pill"
                    id="username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 rounded-pill"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
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
