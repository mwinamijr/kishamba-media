import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../features/users/userSlice";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.getUsers);
  console.log(user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "reporter",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createUser(formData)).unwrap();
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add New User</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="reporter">Reporter</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          {loading ? "Creating user ..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
