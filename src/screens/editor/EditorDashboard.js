import React, { useState } from "react";
import ManageComments from "../admin/ManageComments";
import ManagePosts from "../reporter/ManagePosts";
import ManageArticles from "../reporter/ManageArticles";
import ImageUploader from "../reporter/ImageUploader";

const EditorDashboard = () => {
  const [activeTab, setActiveTab] = useState("articles");

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <ManagePosts />;
      case "articles":
        return <ManageArticles />;
      case "comments":
        return <ManageComments />;
      case "images":
        return <ImageUploader />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Editor Dashboard</h2>

      <ul className="nav nav-tabs">
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
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "images" ? "active" : ""}`}
            onClick={() => setActiveTab("images")}
          >
            Images
          </button>
        </li>
      </ul>

      <div className="tab-content mt-3">{renderTabContent()}</div>
    </div>
  );
};

export default EditorDashboard;
