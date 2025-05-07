import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import FollowUs from "../components/home/Followus";
import ContactUs from "../components/ContactForm";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Kishamba Media | Contact Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media home page" />
        <meta name="description" content="Kishamba media home page" />
      </Helmet>

      <div className="container-fluid">
        <div className="custom-container">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-9 col-lg-8">
              <br />
              <ContactUs />
            </div>
            <div class="col-lg-4">
              <br />
              <FollowUs />

              <div className="mb-3">
                <div className="section-title mb-0">
                  <h4 className="m-0 text-uppercase font-weight-bold">
                    Tangazo
                  </h4>
                </div>
                <div className="bg-white text-center border border-top-0 p-3">
                  <Link to="#">
                    <img
                      className="img-fluid"
                      src="img/news-800x500-2.jpg"
                      alt="Advertisement"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
