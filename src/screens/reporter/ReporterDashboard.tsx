import React, { useState } from "react";
import ManagePosts from "./ManagePosts";
import ManageArticles from "../editor/ManageArticles";
import ManageComments from "../admin/ManageComments";
import ManageImages from "../editor/ManageImages";

type Tab = "posts" | "articles" | "comments" | "images";

const ReporterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <ManagePosts />;
      case "articles":
        return <ManageArticles />;
      case "comments":
        return <ManageComments />;
      case "images":
        return <ManageImages />;
      default:
        return null;
    }
  };

  const tabClasses = (tab: Tab) =>
    `px-4 py-2 rounded-t-lg text-sm font-medium ${
      activeTab === tab
        ? "bg-orange-500 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-6">Reporter Dashboard</h2>

      <div className="flex space-x-2 border-b border-gray-200 mb-4">
        <button onClick={() => setActiveTab("posts")} className={tabClasses("posts")}>
          Posts
        </button>
        <button onClick={() => setActiveTab("articles")} className={tabClasses("articles")}>
          Articles
        </button>
        <button onClick={() => setActiveTab("comments")} className={tabClasses("comments")}>
          Comments
        </button>
        <button onClick={() => setActiveTab("images")} className={tabClasses("images")}>
          Images
        </button>
      </div>

      <div className="bg-white p-4 shadow rounded">{renderTabContent()}</div>
    </div>
  );
};

export default ReporterDashboard;
