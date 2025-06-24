import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store"; // adjust path as needed

interface FormState {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const UpdateProfile: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<FormState>({
    username: userInfo.username,
    email: userInfo.email,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phone: userInfo.phone,
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (profilePic) formData.append("profilePic", profilePic);

      await axios.put("/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Profile updated successfully.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
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

      <h4 className="text-xl font-semibold mb-4">Edit Profile</h4>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && <p className="mb-4 text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Last Name"
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Phone"
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setProfilePic(e.target.files[0]);
            }
          }}
          className="w-full"
          accept="image/*"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
