import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostDetails, updatePost } from "../../features/news/postSlice";
import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

type ContentBlock = {
  type: "paragraph" | "subheading" | "image";
  text?: string;
  imageUrl?: string;
  alignment?: "left" | "right" | "center";
  size?: "small" | "medium" | "large";
};

const PostUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useAppSelector(
    (state: RootState) => state.getPosts
  );

  const [title, setTitle] = useState<string>("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (!post || post._id !== id) {
      dispatch(fetchPostDetails(id!));
    } else {
      setTitle(post.title || "");
      setContentBlocks(post.contentBlocks || []);
    }
  }, [dispatch, post, id]);

  const handleBlockChange = (
    index: number,
    field: keyof ContentBlock,
    value: any
  ) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index][field] = value;
    setContentBlocks(newBlocks);
  };

  const removeBlock = (index: number) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const moveBlock = (index: number, direction: number | "top" | "bottom") => {
    const updated = [...contentBlocks];
    const block = updated[index];

    if (direction === "top") {
      updated.splice(index, 1);
      updated.unshift(block);
    } else if (direction === "bottom") {
      updated.splice(index, 1);
      updated.push(block);
    } else {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= contentBlocks.length) return;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    }

    setContentBlocks(updated);
  };

  const addBlock = () => {
    setContentBlocks([...contentBlocks, { type: "paragraph", text: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updatePost({ id, updatedData: { title, contentBlocks } }));
    navigate(`/posts/${id}`);
  };

  if (loading)
    return (
      <div className="text-center py-6 text-gray-500">Loading post...</div>
    );
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <h3 className="text-xl font-semibold mt-6">Content Blocks</h3>
        {contentBlocks.map((block, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded p-4 space-y-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <strong>Block {index + 1}</strong>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => moveBlock(index, -1)}
                  disabled={index === 0}
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 1)}
                  disabled={index === contentBlocks.length - 1}
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, "top")}
                  disabled={index === 0}
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
                >
                  ⬆ Top
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, "bottom")}
                  disabled={index === contentBlocks.length - 1}
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
                >
                  ⬇ Bottom
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={block.type}
                onChange={(e) =>
                  handleBlockChange(index, "type", e.target.value)
                }
              >
                <option value="paragraph">Paragraph</option>
                <option value="subheading">Subheading</option>
                <option value="image">Image</option>
              </select>
            </div>

            {block.type === "image" && (
              <>
                <div>
                  <label className="block mb-1">Image URL</label>
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={block.imageUrl || ""}
                    onChange={(e) =>
                      handleBlockChange(index, "imageUrl", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block mb-1">Alignment</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={block.alignment || "center"}
                    onChange={(e) =>
                      handleBlockChange(
                        index,
                        "alignment",
                        e.target.value as ContentBlock["alignment"]
                      )
                    }
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Image Size</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={block.size || "medium"}
                    onChange={(e) =>
                      handleBlockChange(
                        index,
                        "size",
                        e.target.value as ContentBlock["size"]
                      )
                    }
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                {block.imageUrl && (
                  <img
                    src={block.imageUrl}
                    alt={`preview-${index}`}
                    className="mt-2 rounded shadow"
                    style={{
                      width:
                        block.size === "small"
                          ? "150px"
                          : block.size === "large"
                          ? "100%"
                          : "400px",
                    }}
                  />
                )}
              </>
            )}

            {(block.type === "paragraph" || block.type === "subheading") && (
              <div>
                <label className="block mb-1">Text</label>
                {block.type === "paragraph" ? (
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={4}
                    value={block.text || ""}
                    onChange={(e) =>
                      handleBlockChange(index, "text", e.target.value)
                    }
                  />
                ) : (
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={block.text || ""}
                    onChange={(e) =>
                      handleBlockChange(index, "text", e.target.value)
                    }
                  />
                )}
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addBlock}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          + Add Content Block
        </button>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostUpdate;
