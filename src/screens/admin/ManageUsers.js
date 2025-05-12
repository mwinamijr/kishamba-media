import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";
import Unauthorized from "./Unauthorized";

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
      <h2>Manage Users</h2>
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
