import React, { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearAuthError } from "../features/users/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import type { RootState } from "../app/store";

const RegisterScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    return () => {
      dispatch(clearAuthError());
    };
  }, [isAuthenticated, dispatch, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError("");
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <Link
              to="/"
              className="inline-block border border-gray-400 rounded-full px-6 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              ← Back to Home
            </Link>
          </div>

          <h3 className="text-center mb-6 text-2xl font-semibold text-blue-600">
            Register
          </h3>

          {(error || localError) && (
            <div className="bg-red-100 text-red-700 text-center py-2 rounded mb-4">
              {localError || error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1 text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-gray-600">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full text-white font-semibold transition ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
