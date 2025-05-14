import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostDetails } from "../../features/news/postSlice";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting state from the Redux store
  const { post, loading, error } = useSelector((state) => state.getPosts);

  // Fetch the post details on component mount
  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, [dispatch, id]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mt-4">
      {loading && <p>Loading ....</p>}
      {error && <div className="text-danger">Error: {error}</div>}
      <h2>{post.title}</h2>
      <p>{post.createdAt}</p>
      <div>
        {post.contentBlocks.map((block, index) => (
          <div key={index}>
            {block.type === "paragraph" && <p>{block.text}</p>}
            {block.type === "subheading" && <h3>{block.text}</h3>}
            {block.type === "image" && (
              <img
                src={block.imageUrl}
                alt="Post"
                style={{
                  float: block.alignment,
                  maxWidth: "100%",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/posts")}
        className="btn btn-secondary m-2"
      >
        Back to Posts
      </button>
      <button
        onClick={() => navigate(`/posts/${id}/edit`)}
        className="btn btn-warning m-2"
      >
        Edit Post
      </button>
    </div>
  );
};

export default PostDetails;
