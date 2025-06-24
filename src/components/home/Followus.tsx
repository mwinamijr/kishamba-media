import React from "react";
import { Link } from "react-router-dom";

interface SocialLink {
  name: string;
  color: string;
  icon: string;
  text: string;
  link: string;
}

const socialLinks: SocialLink[] = [
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

const FollowUs: React.FC = () => {
  return (
    <div className="mb-3">
      <div className="mb-0">
        <h4 className="uppercase font-bold text-lg">Tufuate</h4>
      </div>
      <div className="bg-white border border-t-0 p-3">
        {socialLinks.map((socialLink, index) => (
          <Link
            key={index}
            to={socialLink.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-full mb-3 text-white no-underline"
            style={{ backgroundColor: socialLink.color }}
          >
            <i
              className={`${socialLink.icon} py-4 mr-3 flex items-center justify-center`}
              style={{
                width: 65,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                flexShrink: 0,
              }}
            />
            <span className="font-medium">{socialLink.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
