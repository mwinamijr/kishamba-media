import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import FollowUs from "../components/home/Followus";
import ContactUs from "../components/ContactForm";

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Kishamba Media | Contact Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Kishamba media contact page" />
        <meta name="description" content="Kishamba media contact page" />
      </Helmet>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <ContactUs />
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <FollowUs />

            <div>
              <div className="mb-2 border-b pb-2">
                <h4 className="text-lg font-bold uppercase text-gray-800">
                  Tangazo
                </h4>
              </div>
              <div className="bg-white border p-3 text-center shadow-sm">
                <Link to="#">
                  <img
                    className="w-full h-auto object-cover"
                    src="/img/news-800x500-2.jpg"
                    alt="Advertisement"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
