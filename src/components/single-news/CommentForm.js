import React, { useState } from "react";

const LeaveCommentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send formData to your backend here
    console.log("Submitted:", formData);
  };

  return (
    <div className="mb-3">
      <div className="section-title mb-0">
        <h4 className="m-0 text-uppercase font-weight-bold">Leave a comment</h4>
      </div>
      <div className="bg-white border border-top-0 p-4">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              className="form-control"
              id="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows="5"
              className="form-control"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group mb-0">
            <input
              type="submit"
              value="Leave a comment"
              className="btn btn-primary font-weight-semi-bold py-2 px-3"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveCommentForm;
