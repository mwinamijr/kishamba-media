import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../features/users/userSlice";
import type { RootState, AppDispatch } from "../../app/store"; // adjust path as needed

interface FormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  role: "reporter" | "editor" | "admin";
}

const AddUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.getUsers);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    role: "reporter",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createUser(formData)).unwrap();
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h3 className="text-2xl font-semibold mb-6">Add New User</h3>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.username}
            onChange={handleChange}
            required
            type="text"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="firstName" className="block mb-1 font-medium">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block mb-1 font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.phone}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="role" className="block mb-1 font-medium">
            Role
          </label>
          <select
            id="role"
            name="role"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="reporter">Reporter</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded mt-4 w-full disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating user ..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
