import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostDetails } from "../../features/news/postSlice";
import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

interface ContentBlock {
  type: "paragraph" | "subheading" | "image";
  text?: string;
  imageUrl?: string;
  alignment?: "left" | "right" | "center";
}

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { post, loading, error } = useAppSelector(
    (state: RootState) => state.getPosts
  );

  useEffect(() => {
    if (id) dispatch(fetchPostDetails(id));
  }, [dispatch, id]);

  if (!post)
    return (
      <div className="text-center mt-10 text-gray-500">Post not found</div>
    );

  return (
    <div className="container mx-auto px-4 mt-8">
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      <div className="space-y-6">
        {post.contentBlocks.map((block: ContentBlock, index: number) => (
          <div key={index}>
            {block.type === "paragraph" && (
              <p className="text-base text-gray-800">{block.text}</p>
            )}
            {block.type === "subheading" && (
              <h3 className="text-xl font-semibold mt-4">{block.text}</h3>
            )}
            {block.type === "image" && block.imageUrl && (
              <img
                src={block.imageUrl}
                alt={`post-image-${index}`}
                className={`mt-4 mb-4 rounded shadow ${
                  block.alignment === "left"
                    ? "float-left mr-4"
                    : block.alignment === "right"
                    ? "float-right ml-4"
                    : "mx-auto"
                }`}
                style={{ maxWidth: "100%" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="clear-both mt-10 flex gap-4">
        <button
          onClick={() => navigate("/posts")}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
        >
          Back to Posts
        </button>
        <button
          onClick={() => navigate(`/posts/${id}/edit`)}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
        >
          Edit Post
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
