import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add logic to send the form data to your backend here
  };

  return (
    <>
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">
          Wasiliana nasi kwa maswali yeyote
        </h4>
      </div>
      <div className="bg-white border border-top-0 p-4 mb-3">
        <div className="mb-4">
          <h6 className="text-uppercase font-weight-bold">Taarifa za mawasiliano</h6>
          <p className="mb-4">
            Kwa mawasiliano zaidi tumia aina hizi za mawasiliano kutufikia kwa mambo mbalimbali kama taarifa, matangazo au 
            habari yeyote kutoka kwetu. Pia unaweza kuwasiliana nasi kutuletea habari mbalimbali nasi hatutasita kukusaidia. KARIBU.
          </p>

          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-2"></i>
              <h6 className="font-weight-bold mb-0">Ofisi zetu</h6>
            </div>
            <p className="m-0">
              Kinondoni Mwanamboka, Dar es salaam, Plot No 12, Block no 31
            </p>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <i className="fa fa-envelope-open text-primary mr-2"></i>
              <h6 className="font-weight-bold mb-0">Barua pepe</h6>
            </div>
            <p className="m-0">kishambamedia2023@gmail.com</p>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <i className="fa fa-phone-alt text-primary mr-2"></i>
              <h6 className="font-weight-bold mb-0">Tupigie simu</h6>
            </div>
            <p className="m-0">+255 754 675 410</p>
          </div>
        </div>

        <h6 className="text-uppercase font-weight-bold mb-3">Wasiliana nasi</h6>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control p-4"
                  name="name"
                  placeholder="Jina lako"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control p-4"
                  name="email"
                  placeholder="Barua "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control p-4"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="4"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <button
              className="btn btn-primary font-weight-semi-bold px-4"
              style={{ height: "50px" }}
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactUs;
