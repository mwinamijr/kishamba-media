import React from "react";

const Unauthorized: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-20 text-center p-6 bg-red-50 rounded shadow">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        403 - Unauthorized
      </h1>
      <p className="text-gray-700">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default Unauthorized;
