import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostDetails, updatePost } from "../../features/news/postSlice";

const PostUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error } = useSelector((state) => state.getPosts);

  const [title, setTitle] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);

  useEffect(() => {
    if (!post || post._id.toString() !== id) {
      dispatch(fetchPostDetails(id));
    } else {
      setTitle(post.title || "");
      setContentBlocks(post.contentBlocks || []);
    }
  }, [dispatch, post, id]);

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index][field] = value;
    setContentBlocks(newBlocks);
  };

  const removeBlock = (index) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const moveBlock = (index, directionOrPosition) => {
    const updated = [...contentBlocks];
    const blockToMove = updated[index];

    if (directionOrPosition === 'top') {
      updated.splice(index, 1);
      updated.unshift(blockToMove);
    } else if (directionOrPosition === 'bottom') {
      updated.splice(index, 1);
      updated.push(blockToMove);
    } else {
      const newIndex = index + directionOrPosition;
      if (newIndex < 0 || newIndex >= contentBlocks.length) return;
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    }

    setContentBlocks(updated);
  };

  const addBlock = () => {
    setContentBlocks([...contentBlocks, { type: "paragraph", text: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePost({ id, updatedData: { title, contentBlocks } }));
    navigate(`/posts/${id}`);
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <h5 className="mt-3">Content Blocks</h5>
        {contentBlocks.map((block, index) => (
          <div key={index} className="card p-3 my-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>Block {index + 1}</strong>
              <div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={() => moveBlock(index, -1)}
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary me-1"
                  onClick={() => moveBlock(index, 1)}
                  disabled={index === contentBlocks.length - 1}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary me-1"
                  onClick={() => moveBlock(index, 'top')}
                  disabled={index === 0}
                >
                  ⬆ Top
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary me-1"
                  onClick={() => moveBlock(index, 'bottom')}
                  disabled={index === contentBlocks.length - 1}
                >
                  ⬇ Bottom
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => removeBlock(index)}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="form-group mb-2">
              <label>Type</label>
              <select
                className="form-control"
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
                <div className="form-group mb-2">
                  <label>Image URL</label>
                  <input
                    className="form-control"
                    value={block.imageUrl || ""}
                    onChange={(e) =>
                      handleBlockChange(index, "imageUrl", e.target.value)
                    }
                  />
                </div>

                <div className="form-group mb-2">
                  <label>Alignment</label>
                  <select
                    className="form-control"
                    value={block.alignment || "center"}
                    onChange={(e) =>
                      handleBlockChange(index, "alignment", e.target.value)
                    }
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label>Image Size</label>
                  <select
                    className="form-control"
                    value={block.size || "medium"}
                    onChange={(e) =>
                      handleBlockChange(index, "size", e.target.value)
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
                    className="img-thumbnail mt-2"
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
              <div className="form-group">
                <label>Text</label>
                {block.type === "paragraph" ? (
                  <textarea
                    className="form-control"
                    rows="4"
                    value={block.text || ""}
                    onChange={(e) =>
                      handleBlockChange(index, "text", e.target.value)
                    }
                  />
                ) : (
                  <input
                    className="form-control"
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
          className="btn btn-secondary mt-3"
        >
          + Add Content Block
        </button>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary m-2">
            Update Post
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="btn btn-outline-secondary m-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostUpdate;
