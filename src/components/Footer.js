import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NewsletterSubscription from "./home/NewsLetter";
import FooterTrending from "./home/FooterTrending";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../features/news/articleSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector((state) => state.getArticles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);
  return (
    <>
      <div className="container-fluid bg-dark pt-3 px-sm-3 px-md-5 mt-2 text-white">
        <NewsletterSubscription />
        <div className="row py-3">
          {/* Get In Touch */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h5 className="mb-4 text-uppercase font-weight-bold text-white">
              Get In Touch
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
          <FooterTrending articles={articles} loading={loading} />

          {/* Categories */}
          <div className="col-lg-3 col-md-6 mb-3">
            <h5 className="mb-4 text-uppercase font-weight-bold text-white">
              Categories
            </h5>
            <div className="m-n1">
              {[
                "Politics",
                "Business",
                "Corporate",
                "Business",
                "Health",
                "Education",
                "Science",
                "Business",
                "Foods",
                "Entertainment",
                "Travel",
                "Lifestyle",
                "Politics",
                "Business",
                "Corporate",
                "Business",
                "Health",
                "Education",
                "Science",
                "Business",
                "Foods",
              ].map((category, idx) => (
                <Link key={idx} to="#" className="btn btn-sm btn-secondary m-1">
                  {category}
                </Link>
              ))}
            </div>
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
