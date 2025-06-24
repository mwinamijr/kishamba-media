import React, { useState } from "react";
import ManageComments from "../admin/ManageComments";
import ManagePosts from "../reporter/ManagePosts";
import ManageArticles from "./ManageArticles";
import ManageImages from "./ManageImages";

const EditorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "posts" | "articles" | "comments" | "images"
  >("articles");

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

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="mb-6 text-3xl font-semibold">Editor Dashboard</h2>

      <ul className="flex border-b border-gray-300">
        {["articles", "posts", "comments", "images"].map((tab) => (
          <li key={tab} className="mr-4">
            <button
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-4 font-medium border-b-2 transition-colors duration-300 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

export default EditorDashboard;
