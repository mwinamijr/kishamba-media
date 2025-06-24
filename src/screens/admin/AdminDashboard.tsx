import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import ManagePosts from "../reporter/ManagePosts";
import ManageArticles from "../editor/ManageArticles";
import ManageComments from "./ManageComments";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "articles" | "posts" | "comments">("users");

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <ManageUsers />;
      case "articles":
        return <ManageArticles />;
      case "posts":
        return <ManagePosts />;
      case "comments":
        return <ManageComments />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>

      <ul className="flex border-b border-gray-300">
        {[
          { id: "users", label: "Users" },
          { id: "articles", label: "Articles" },
          { id: "posts", label: "Posts" },
          { id: "comments", label: "Comments" },
        ].map(({ id, label }) => (
          <li key={id} className="mr-4">
            <button
              className={`pb-2 border-b-2 font-medium ${
                activeTab === id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-orange-600 hover:border-orange-300"
              }`}
              onClick={() => setActiveTab(id as typeof activeTab)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;
