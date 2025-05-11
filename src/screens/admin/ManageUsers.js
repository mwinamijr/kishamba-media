import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/userSlice";

const MAnageUsers = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, users } = useSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(users);
  return (
    <div>
      {error && <p className="text-warning">{error}</p>}
      MAnageUsers
    </div>
  );
};

export default MAnageUsers;
