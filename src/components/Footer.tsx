import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink } from "react-router-dom";
import NewsletterSubscription from "./home/NewsLetter";
import FooterTrending from "./home/FooterTrending";
import { fetchArticles } from "../features/news/articleSlice";
import {
  clearAuthError,
  loginUser,
  logoutUser,
} from "../features/users/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function Footer() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, loading } = useAppSelector((state) => state.auth);
  const { articles, loading: articleLoading } = useAppSelector(
    (state) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Replace your social icons with inline SVG or your preferred icon lib
  const socialLinks = [
    { icon: "twitter", link: "https://twitter.com/kishambamedia" },
    { icon: "facebook", link: "https://facebook.com/kishambamedia" },
    { icon: "linkedin", link: "https://linkedin.com/company/kishambamedia" },
    { icon: "instagram", link: "https://instagram.com/kishambamedia" },
    { icon: "youtube", link: "https://youtube.com/@kishambamedia" },
  ];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "twitter":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14.86 5.48 5.48 0 002.4-3.04 10.65 10.65 0 01-3.38 1.29 5.42 5.42 0 00-9.24 4.94A15.41 15.41 0 013 4.9a5.41 5.41 0 001.68 7.22 5.35 5.35 0 01-2.46-.68v.07a5.42 5.42 0 004.34 5.31 5.4 5.4 0 01-2.45.09 5.43 5.43 0 005.06 3.77A10.86 10.86 0 013 19.54a15.37 15.37 0 008.29 2.42c9.95 0 15.4-8.24 15.4-15.4 0-.24 0-.48-.02-.71A11 11 0 0023 3z" />
          </svg>
        );
      case "facebook":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.6v-5.7c0-1.36-.03-3.1-1.89-3.1-1.89 0-2.18 1.48-2.18 3v5.8h-3.6V9h3.46v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.55v6.19zM5.34 7.43a2.1 2.1 0 01-2.12-2.1 2.1 2.1 0 112.12 2.1zm-1.8 13.02h3.6V9h-3.6v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.75V1.75C24 .78 23.19 0 22.22 0z" />
          </svg>
        );
      case "instagram":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19.8 7.2c-.2-.7-.8-1.3-1.5-1.4C16.8 5.5 12 5.5 12 5.5s-4.8 0-6.3.3c-.7.1-1.3.7-1.5 1.4-.2.7-.2 2.2-.2 2.2s0 1.5.2 2.2c.2.7.8 1.3 1.5 1.4 1.5.3 6.3.3 6.3.3s4.8 0 6.3-.3c.7-.1 1.3-.7 1.5-1.4.2-.7.2-2.2.2-2.2s0-1.5-.2-2.2zM10 14.5v-5l4 2.5-4 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-gray-900 pt-6 px-4 md:px-12 mt-2 text-white">
        <NewsletterSubscription />
        <div className="flex flex-wrap py-6 gap-8">
          {/* Get In Touch */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h5 className="mb-4 uppercase font-bold">Wasialiana nasi</h5>
            <p className="font-medium flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              Kinondoni Mwanamboka, Dar es salaam, Plot No 12, Block no 31
            </p>
            <p className="font-medium flex items-center mb-2">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1c-9.39 0-17-7.61-17-17a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
              </svg>
              +255 754 675 410
            </p>
            <p className="font-medium flex items-center mb-4">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              kishambamedia2023@gmail.com
            </p>
            <h6 className="mt-6 mb-3 uppercase font-bold">Follow Us</h6>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-md hover:bg-orange-600 transition"
                  aria-label={icon}
                >
                  {renderIcon(icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Popular News */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <FooterTrending articles={articles} loading={articleLoading} />
          </div>

          {/* Staff Login */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h5 className="mb-4 uppercase font-bold">
              {userInfo ? `Habari, ${userInfo.username}` : "Staff Login"}
            </h5>

            {userInfo ? (
              <div className="text-gray-300">
                <p className="mb-2 font-semibold">{userInfo.username}</p>
                <NavLink
                  to="/profile"
                  className="block mb-2 text-gray-300 text-sm hover:underline"
                >
                  View Profile
                </NavLink>

                {userInfo.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="block mb-2 text-gray-300 text-sm hover:underline"
                  >
                    Admin Dashboard
                  </NavLink>
                )}

                {userInfo.role === "reporter" && (
                  <NavLink
                    to="/posts"
                    className="block mb-2 text-gray-300 text-sm hover:underline"
                  >
                    Reporter Dashboard
                  </NavLink>
                )}

                {userInfo.role === "editor" && (
                  <NavLink
                    to="/articles"
                    className="block mb-2 text-gray-300 text-sm hover:underline"
                  >
                    Editor Dashboard
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-2 rounded-full border border-gray-300 text-gray-300 px-6 py-1 hover:bg-gray-700 transition"
                >
                  Toka Nje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-400 text-sm mb-1"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-full py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-400 text-sm mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-full py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-full font-semibold transition disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            )}
          </div>

          {/* Staff Photos */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <h5 className="mb-4 uppercase font-bold text-white">
              Staff Photos
            </h5>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 1].map((num, idx) => (
                <Link
                  key={idx}
                  to="#"
                  className="block w-full overflow-hidden rounded-md"
                >
                  <img
                    className="w-full object-cover aspect-square"
                    src={`img/news-110x110-${num}.jpg`}
                    alt={`News ${num}`}
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="py-3 px-4 md:px-12 text-center text-white"
        style={{ backgroundColor: "#111111" }}
      >
        <p className="text-sm">
          &copy;{" "}
          <Link to="#" className="underline hover:text-orange-500">
            Kishamba Media
          </Link>
          . All Rights Reserved. <br />
          Managed by{" "}
          <Link
            to="https://mwinamijr.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-orange-500"
          >
            Mwinamijr
          </Link>{" "}
          of{" "}
          <Link
            to="https://techdometz.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-orange-500"
          >
            Techdometz
          </Link>
        </p>
      </div>
    </>
  );
}
