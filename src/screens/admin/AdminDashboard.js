import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import ManagePosts from "../reporter/ManagePosts";
import ManageArticles from "../editor/ManageArticles";
import ManageComments from "./ManageComments";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

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
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "articles" ? "active" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            Articles
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "comments" ? "active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;
