import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/news/postSlice";
import { Link } from "react-router-dom";

const ManagePosts = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.getPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Link to="/posts/add" className="btn btn-primary mb-3">
        Add Post
      </Link>
      <div className="list-group">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className="list-group-item list-group-item-action"
          >
            {post.title}
          </Link>
        ))}
      </div>
      <Link to="/posts/add" className="btn btn-primary mb-3">
        Add Post
      </Link>
    </div>
  );
};

export default ManagePosts;
