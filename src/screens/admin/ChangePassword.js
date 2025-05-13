import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { userInfo } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      "/api/users/profile/password",
      { oldPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
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

      <h4>Change Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="btn btn-danger" type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
