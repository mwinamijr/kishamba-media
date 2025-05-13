import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="container mt-5">
      <h3>Your Profile</h3>
      <img
        src={`http://localhost:5000/${userInfo.profilePic}`}
        alt="Profile"
        width={120}
      />
      <p>
        <strong>Username:</strong> {userInfo.username}
      </p>
      <p>
        <strong>Email:</strong> {userInfo.email}
      </p>
      <p>
        <strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}
      </p>
      <p>
        <strong>Phone:</strong> {userInfo.phone}
      </p>

      <Link to="/profile/edit" className="btn btn-primary mr-2">
        Edit Profile
      </Link>
      <Link to="/profile/password" className="btn btn-secondary">
        Change Password
      </Link>
    </div>
  );
};

export default UserProfile;
