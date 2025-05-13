import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { userInfo } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    username: userInfo.username,
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phone: userInfo.phone,
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (profilePic) formData.append("profilePic", profilePic);

    await axios.put("/api/users/profile", formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // handle response...
  };

  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <li
                key={name}
                className="breadcrumb-item active"
                aria-current="page"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </li>
            ) : (
              <li key={name} className="breadcrumb-item">
                <Link to={routeTo}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <h4>Edit Profile</h4>
      <form onSubmit={handleSubmit}>
        <input
          label="username"
          className="form-control mb-2"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="file"
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
        <button className="btn btn-success" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
