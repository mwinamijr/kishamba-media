import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="blog-header py-3">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          Logo
        </Link>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="#" className="nav-link px-2 link-secondary">
              Home
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-2 link-dark">
              Features
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-2 link-dark">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-2 link-dark">
              FAQs
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-2 link-dark">
              About
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <button type="button" className="btn btn-outline-primary me-2">
            Login
          </button>
          <button type="button" className="btn btn-primary">
            Sign-up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
