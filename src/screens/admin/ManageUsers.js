import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";
import Unauthorized from "./Unauthorized";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, users } = useSelector((state) => state.getUsers);

  useEffect(() => {
    if (userInfo?.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, userInfo]);

  if (userInfo?.role !== "admin") {
    return <Unauthorized />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Users</h2>
        <Link to="/admin/add-user" className="btn btn-primary">
          Add User
        </Link>
      </div>
      {error && <p className="text-warning">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id} className="list-group-item">
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageUsers;
