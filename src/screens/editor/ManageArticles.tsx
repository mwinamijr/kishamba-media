import React, { useEffect } from "react";
import { fetchArticles, deleteArticle } from "../../features/news/articleSlice";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust to your store path
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Article {
  _id: string;
  headline: string;
  category: string;
  isBreaking: boolean;
  published: boolean;
}

const ManageArticles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, error, successMessage } = useAppSelector(
    (state: RootState) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-semibold mb-4">Articles</h2>

      {loading && <p className="text-gray-700">Loading...</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {successMessage && (
        <p className="text-green-600 mb-2">{successMessage}</p>
      )}

      <Link
        to="/articles/add"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add Article
      </Link>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Headline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Breaking
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article: Article) => (
              <tr key={article._id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {article.headline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {article.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                  {article.isBreaking ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">
                  {article.published ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Link
                    to={`/articles/${article._id}/edit`}
                    className="inline-block mr-2 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="inline-block px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {articles.length > 10 && (
        <Link
          to="/articles/add"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Article
        </Link>
      )}
    </div>
  );
};

export default ManageArticles;
