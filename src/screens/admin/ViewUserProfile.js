import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../features/users/userSlice";

const ViewUserProfile = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, user } = useSelector((state) => state.getUsers);
  console.log(user);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  return (
    <div className="container mt-4">
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

      <h2>User Profile</h2>

      {loading ? (
        <p>Loading user info...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="card p-3">
          <div className="row">
            <div className="col-md-4">
              <img
                src={
                  user?.profilePic
                    ? `http://localhost:5000/${user.profilePic}`
                    : "/default-avatar.png"
                }
                alt="Profile"
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="col-md-8">
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>First Name:</strong> {user?.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {user?.lastName}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUserProfile;
