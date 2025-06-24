import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store"; // adjust path as needed

interface UserInfo {
  profilePic: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const UserProfile: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  if (!userInfo) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h3 className="text-2xl font-semibold mb-6">Your Profile</h3>

      <img
        src={`http://localhost:5000/${userInfo.profilePic}`}
        alt="Profile"
        width={120}
        height={120}
        className="rounded-full mb-6 object-cover"
      />

      <p className="mb-2">
        <strong className="font-semibold">Username:</strong> {userInfo.username}
      </p>
      <p className="mb-2">
        <strong className="font-semibold">Email:</strong> {userInfo.email}
      </p>
      <p className="mb-2">
        <strong className="font-semibold">Name:</strong> {userInfo.firstName}{" "}
        {userInfo.lastName}
      </p>
      <p className="mb-6">
        <strong className="font-semibold">Phone:</strong> {userInfo.phone}
      </p>

      <div className="flex space-x-4">
        <Link
          to="/profile/edit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Edit Profile
        </Link>
        <Link
          to="/profile/password"
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
