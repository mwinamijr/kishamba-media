import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/users/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Topbar Start */}
      <div className="container-fluid d-none d-lg-block">
        <div className="row align-items-center bg-dark px-lg-5">
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-sm bg-dark p-0">
              <ul className="navbar-nav ml-n2">
                <li className="nav-item border-right border-secondary">
                  <NavLink className="nav-link text-body small" to="#">
                    {formattedDate}
                  </NavLink>
                </li>
                <li className="nav-item border-right border-secondary">
                  <NavLink className="nav-link text-body small" to="#">
                    Advertise
                  </NavLink>
                </li>
                {userInfo ? (
                  <>
                    <li className="nav-item border-right border-secondary">
                      <NavLink className="nav-link text-body small">
                        Hello, {userInfo.username}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        onClick={handleLogout}
                        className="nav-link text-body small"
                      >
                        Logout
                      </NavLink>
                    </li>
                    {userInfo?.role === "admin" && (
                      <li className="nav-item border-right border-secondary">
                        <NavLink
                          className="nav-link text-body small"
                          to="/admin"
                        >
                          Admin Panel
                        </NavLink>
                      </li>
                    )}
                  </>
                ) : (
                  <li className="nav-item">
                    <NavLink className="nav-link text-body small" to="/login">
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <div className="col-lg-3 text-right d-none d-md-block">
            <nav className="navbar navbar-expand-sm bg-dark p-0">
              <ul className="navbar-nav ml-auto mr-n2">
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
                    link: "https://linkedin.com/kishambamedia",
                  },
                  {
                    icon: "instagram",
                    link: "https://instagram.com/kishambamedia",
                  },
                  {
                    icon: "youtube",
                    link: "https://youtube.com/@kishambamedia",
                  },
                ].map(({ icon, link }) => (
                  <li className="nav-item" key={icon}>
                    <a
                      className="nav-link text-body"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <small className={`fab fa-${icon}`}></small>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="row align-items-center bg-white py-3 px-lg-5">
          <div className="col-lg-4">
            <NavLink to="/" className="navbar-brand p-0 d-none d-lg-block">
              <h1 className="m-0 display-4 text-uppercase text-primary">
                Kishamba
                <span className="text-secondary font-weight-normal">Media</span>
              </h1>
            </NavLink>
          </div>
          <div className="col-lg-8 text-center text-lg-right">
            <img className="img-fluid" src="/img/ads-728x90.png" alt="ads" />
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2 py-lg-0 px-lg-5">
          <NavLink to="/" className="navbar-brand d-block d-lg-none">
            <h1 className="m-0 display-4 text-uppercase text-primary">
              Kishamba
              <span className="text-white font-weight-normal">Media</span>
            </h1>
          </NavLink>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between px-0 px-lg-3"
            id="navbarCollapse"
          >
            <div className="navbar-nav mr-auto py-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
                end
              >
                Home
              </NavLink>
              <NavLink
                to="/sports"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
              >
                Sports
              </NavLink>
              <NavLink
                to="/news-details"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
              >
                Single News
              </NavLink>
              <div className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                >
                  Dropdown
                </span>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink
                    to="/menu1"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Menu item 1
                  </NavLink>
                  <NavLink
                    to="/menu2"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Menu item 2
                  </NavLink>
                  <NavLink
                    to="/menu3"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Menu item 3
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
              >
                Contact
              </NavLink>
            </div>
            <div
              className="input-group ml-auto d-none d-lg-flex"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <input
                type="text"
                className="form-control border-0"
                placeholder="Keyword"
              />
              <div className="input-group-append">
                <button className="input-group-text bg-primary text-dark border-0 px-3">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
