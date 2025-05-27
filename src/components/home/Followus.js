import React from "react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    name: "Facebook",
    color: "#39569E",
    icon: "fab fa-facebook-f",
    text: "12,345 Fans",
    link: "https://facebook.com/kishambamedia",
  },
  {
    name: "Twitter",
    color: "#52AAF4",
    icon: "fab fa-twitter",
    text: "12,345 Followers",
    link: "https://twitter.com/kishambamedia",
  },
  {
    name: "Instagram",
    color: "#C8359D",
    icon: "fab fa-instagram",
    text: "12,345 Followers",
    link: "https://instagram.com/kishambamedia",
  },
  {
    name: "YouTube",
    color: "#DC472E",
    icon: "fab fa-youtube",
    text: "12,345 Subscribers",
    link: "https://youtube.com/@kishambamedia",
  },
];

const FollowUs = () => {
  return (
    <div className="mb-3">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Tufuate</h4>
      </div>
      <div className="bg-white border border-top-0 p-3">
        {socialLinks.map((socialLink, index) => (
          <Link
            key={index}
            to={socialLink.link}
            className="d-block w-100 text-white text-decoration-none mb-3"
            style={{ background: socialLink.color }}
          >
            <i
              className={`${socialLink.icon} text-center py-4 mr-3`}
              style={{
                width: "65px",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            ></i>
            <span className="font-weight-medium">{socialLink.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
