import React, { useEffect } from "react";
import { fetchPosts } from "../../features/news/postSlice";
import { Link } from "react-router-dom";
import type { RootState } from "../../app/store"; // Adjust this path
import { useAppSelector, useAppDispatch } from "../../app/hooks";

interface Post {
  _id: string;
  title: string;
}

const ManagePosts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(
    (state: RootState) => state.getPosts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Link
        to="/posts/add"
        className="inline-block mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Add Post
      </Link>

      <div className="space-y-2">
        {posts.map((post: Post) => (
          <Link
            key={post._id}
            to={`/posts/${post._id}`}
            className="block bg-white border border-gray-200 hover:bg-gray-100 rounded p-4 shadow-sm"
          >
            {post.title}
          </Link>
        ))}
      </div>

      {posts.length > 10 && (
        <div className="mt-6">
          <Link
            to="/posts/add"
            className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Add Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
