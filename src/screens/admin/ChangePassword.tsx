import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { RootState } from "../../app/store"; // adjust path as needed
import { useAppSelector } from "../../app/hooks";

const ChangePassword: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.put(
        "/api/users/profile/password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setSuccess("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update password.");
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

      <h4 className="text-xl font-semibold mb-4">Change Password</h4>

      {error && <p className="mb-4 text-red-600">{error}</p>}
      {success && <p className="mb-4 text-green-600">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Old Password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
