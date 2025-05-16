import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, deleteArticle } from "../../features/news/articleSlice";
import { Link } from "react-router-dom";

const ManageArticles = () => {
  const dispatch = useDispatch();
  const { articles, loading, error, successMessage } = useSelector(
    (state) => state.getArticles
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Articles</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}

      <Link to="/articles/add" className="btn btn-primary mb-3">
        Add Article
      </Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Headline</th>
            <th>Category</th>
            <th>Breaking</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.headline}</td>
              <td>{article.category}</td>
              <td>{article.isBreaking ? "Yes" : "No"}</td>
              <td>{article.published ? "Yes" : "No"}</td>
              <td>
                <Link
                  to={`/articles/${article._id}/edit`}
                  className="btn btn-sm btn-info me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageArticles;
