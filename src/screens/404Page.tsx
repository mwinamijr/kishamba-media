import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // Optional: for a nice warning icon

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-100">
      <div className="text-center max-w-xl">
        <div className="flex justify-center text-gray-400 mb-6">
          <AlertTriangle className="w-20 h-20" />
        </div>
        <h1 className="text-7xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, the page you are looking for doesn't exist. It may have
          been moved or removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
