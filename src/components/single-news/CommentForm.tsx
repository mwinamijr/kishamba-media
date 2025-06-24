import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  website: string;
  message: string;
};

const LeaveCommentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    website: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // You can send formData to your backend here
    console.log("Submitted:", formData);
  };

  return (
    <div className="mb-6">
      <div className="mb-4 border-b border-gray-300">
        <h4 className="text-xl font-bold uppercase m-0">Leave a comment</h4>
      </div>
      <div className="bg-white border border-t-0 p-6 rounded-md shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="name" className="block mb-1 font-medium">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="website" className="block mb-1 font-medium">
              Website
            </label>
            <input
              type="url"
              id="website"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-1 font-medium">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div>
            <input
              type="submit"
              value="Leave a comment"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded cursor-pointer hover:bg-blue-700 transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveCommentForm;
