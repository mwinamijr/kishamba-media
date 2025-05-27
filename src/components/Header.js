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
                    Tangaza Nasi
                  </NavLink>
                </li>
                {userInfo ? (
                  <>
                    <li className="nav-item border-right border-secondary">
                      <NavLink
                        className="nav-link text-body small"
                        to="/profile"
                      >
                        Habari, {userInfo.username}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        onClick={handleLogout}
                        className="nav-link text-body small"
                      >
                        Toka Nje
                      </NavLink>
                    </li>
                    {userInfo?.role === "admin" && (
                      <li className="nav-item border-right border-secondary">
                        <NavLink
                          className="nav-link text-body small"
                          to="/admin"
                        >
                          Admin Dashboard
                        </NavLink>
                      </li>
                    )}
                    {userInfo?.role === "reporter" && (
                      <li className="nav-item border-right border-secondary">
                        <NavLink
                          className="nav-link text-body small"
                          to="/posts"
                        >
                          Reporter Dashboard
                        </NavLink>
                      </li>
                    )}
                    {userInfo?.role === "editor" && (
                      <li className="nav-item border-right border-secondary">
                        <NavLink
                          className="nav-link text-body small"
                          to="/articles"
                        >
                          Editor Dashboard
                        </NavLink>
                      </li>
                    )}
                  </>
                ) : (
                  <li className="nav-item">
                    <NavLink className="nav-link text-body small" to="/ingia">
                      Ingia
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
          <div className="col-12 col-lg-4 text-center text-lg-left mb-2 mb-lg-0">
            {/* Visible on all screen sizes */}
            <NavLink to="/" className="navbar-brand p-0">
              <h1
                className="m-0 display-5 text-uppercase text-primary"
                style={{ wordBreak: "break-word" }}
              >
                Kishamba
                <span className="text-secondary font-weight-normal">Media</span>
              </h1>
            </NavLink>
          </div>
          <div className="col-12 col-lg-8 text-center text-lg-right">
            <img
              className="img-fluid w-100 w-lg-auto"
              src="/img/ads-728x90.png"
              alt="ads"
            />
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
                Nyumbani
              </NavLink>
              <NavLink
                to="/michezo"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
              >
                Michezo
              </NavLink>
              <NavLink
                to="/kuhusu"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
              >
                Kuhusu
              </NavLink>
              <div className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                >
                  Habari Nyingine
                </span>
                <div className="dropdown-menu rounded-0 m-0">
                  <NavLink
                    to="/afya"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Afya
                  </NavLink>
                  <NavLink
                    to="/biashara"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Biashara
                  </NavLink>
                  <NavLink
                    to="/mitindo"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Mitindo
                  </NavLink>
                  <NavLink
                    to="/burudani"
                    className={({ isActive }) =>
                      `dropdown-item${isActive ? " active" : ""}`
                    }
                  >
                    Burudani
                  </NavLink>
                </div>
              </div>

              <NavLink
                to="/wasiliana-nasi"
                className={({ isActive }) =>
                  `nav-item nav-link${isActive ? " active" : ""}`
                }
              >
                Wasiliana Nasi
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
