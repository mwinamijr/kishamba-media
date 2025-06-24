import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../features/users/userSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  profilePic?: string;
}

const ViewUserProfile: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.getUsers
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [dispatch, id]);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex flex-wrap text-sm text-gray-600 space-x-2">
          <li>
            <Link to="/" className="hover:underline text-orange-600">
              Home
            </Link>
            <span>/</span>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const displayName = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <li key={routeTo} className="flex items-center">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-gray-800"
                  >
                    {displayName}
                  </span>
                ) : (
                  <>
                    <Link
                      to={routeTo}
                      className="hover:underline text-orange-600"
                    >
                      {displayName}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <h2 className="text-3xl font-semibold mb-6">User Profile</h2>

      {loading ? (
        <p>Loading user info...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              src={
                user?.profilePic
                  ? `http://localhost:5000/${user.profilePic}`
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3 text-gray-700">
            <p>
              <strong className="font-semibold">Username:</strong>{" "}
              {user?.username}
            </p>
            <p>
              <strong className="font-semibold">Email:</strong> {user?.email}
            </p>
            <p>
              <strong className="font-semibold">First Name:</strong>{" "}
              {user?.firstName}
            </p>
            <p>
              <strong className="font-semibold">Last Name:</strong>{" "}
              {user?.lastName}
            </p>
            <p>
              <strong className="font-semibold">Phone:</strong> {user?.phone}
            </p>
            <p>
              <strong className="font-semibold">Role:</strong>{" "}
              <span className="capitalize">{user?.role}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserProfile;
