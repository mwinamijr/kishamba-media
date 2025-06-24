import React, { useEffect } from "react";
import { fetchUsers } from "../../features/users/userSlice";
import Unauthorized from "./Unauthorized";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const ManageUsers: React.FC = () => {
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const { loading, error, users } = useAppSelector(
    (state: RootState) => state.getUsers
  );

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
        <Link
          to="/admin/add-user"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add User
        </Link>
      </div>

      {error && <p className="text-yellow-600 mb-4">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-300 rounded">
          {users.map((user: User) => (
            <li
              key={user._id}
              className="flex justify-between items-center px-4 py-3 hover:bg-gray-50"
            >
              <div>
                <Link
                  to={`/admin/user/${user._id}`}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {user.username}
                </Link>{" "}
                - {user.email} - <span className="capitalize">{user.role}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageUsers;
