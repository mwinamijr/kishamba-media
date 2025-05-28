import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import NewsletterSubscription from "./home/NewsLetter";
import FooterTrending from "./home/FooterTrending";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../features/news/articleSlice";
import {
  clearAuthError,
  loginUser,
  logoutUser,
} from "../features/users/authSlice";

const Footer = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, loading } = useSelector((state) => state.auth);
  const { articles, loading: articleLoading } = useSelector(
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="container-fluid bg-dark pt-3 px-sm-3 px-md-5 mt-2 text-white">
        <NewsletterSubscription />
        <div className="row py-3">
          {/* Get In Touch */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h5 className="mb-4 text-uppercase font-weight-bold text-white">
              Wasialiana nasi
            </h5>
            <p className="font-weight-medium">
              <i className="fa fa-map-marker-alt mr-2"></i>Kinondoni Mwanamboka,
              Dar es salaam, Plot No 12, Block no 31
            </p>
            <p className="font-weight-medium">
              <i className="fa fa-phone-alt mr-2"></i>+255 754 675 410
            </p>
            <p className="font-weight-medium">
              <i className="fa fa-envelope mr-2"></i>kishambamedia2023@gmail.com
            </p>
            <h6 className="mt-4 mb-3 text-uppercase font-weight-bold text-white">
              Follow Us
            </h6>
            <div className="d-flex justify-content-start">
              {[
                {
                  icon: "x-twitter",
                  link: "https://twitter.com/kishambamedia",
                },
                {
                  icon: "facebook-f",
                  link: "https://facebook.com/kishambamedia",
                },
                {
                  icon: "linkedin-in",
                  link: "https://linkedin.com/company/kishambamedia",
                },
                {
                  icon: "instagram",
                  link: "https://instagram.com/kishambamedia",
                },
                { icon: "youtube", link: "https://youtube.com/@kishambamedia" },
              ].map(({ icon, link }, idx) => (
                <Link
                  key={idx}
                  className="btn btn-lg btn-secondary btn-lg-square mr-2"
                  to={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${icon}`}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular News */}
          <FooterTrending articles={articles} loading={articleLoading} />

          {/* Staff login */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h5 className="mb-4 text-uppercase font-weight-bold text-white">
              {userInfo ? "Habari, " : "Staff Login"}
            </h5>

            {userInfo ? (
              <div className="text-body">
                <p className="mb-2 font-weight-bold">{userInfo.username}</p>
                <NavLink to="/profile" className="d-block mb-2 text-body small">
                  View Profile
                </NavLink>

                {userInfo.role === "admin" && (
                  <NavLink to="/admin" className="d-block mb-2 text-body small">
                    Admin Dashboard
                  </NavLink>
                )}

                {userInfo.role === "reporter" && (
                  <NavLink to="/posts" className="d-block mb-2 text-body small">
                    Reporter Dashboard
                  </NavLink>
                )}

                {userInfo.role === "editor" && (
                  <NavLink
                    to="/articles"
                    className="d-block mb-2 text-body small"
                  >
                    Editor Dashboard
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm mt-2 rounded-pill px-3"
                >
                  Toka Nje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="text-muted small">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control py-2 rounded-pill"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="text-muted small">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control py-2 rounded-pill"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-pill"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            )}
          </div>

          {/* Flickr Photos */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h5 className="mb-4 text-uppercase font-weight-bold text-white">
              Staff Photos
            </h5>
            <div className="row">
              {[1, 2, 3, 4, 5, 1].map((num, idx) => (
                <div key={idx} className="col-4 mb-3">
                  <Link to="#">
                    <img
                      className="w-100"
                      src={`img/news-110x110-${num}.jpg`}
                      alt={`News ${num}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="container-fluid py-3 px-sm-3 px-md-5"
        style={{ background: "#111111" }}
      >
        <p className="m-0 text-center text-white">
          &copy; <Link to="#">Kishamba Media</Link>. All Rights Reserved. <br />
          Managed by <Link to="https://mwinamijr.github.io">
            Mwinamijr
          </Link> of <Link to="https://techdometz.github.io"> Techdometz</Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
