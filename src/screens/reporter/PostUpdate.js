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

  // Populate form with existing data
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updatePost({ id, updatedData: { title, contentBlocks } }));
    navigate(`/posts/${id}`);
  };

  const addBlock = () => {
    setContentBlocks([...contentBlocks, { type: "paragraph", text: "" }]);
  };

  const removeBlock = (index) => {
    const newBlocks = [...contentBlocks];
    newBlocks.splice(index, 1);
    setContentBlocks(newBlocks);
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
          <div key={index} className="card p-3 my-2">
            <div className="form-group">
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
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    className="form-control"
                    value={block.imageUrl || ""}
                    onChange={(e) =>
                      handleBlockChange(index, "imageUrl", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
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
              </>
            )}{" "}
            {block.type === "paragraph" && (
              <div className="form-group">
                <label>Text</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={block.text || ""}
                  onChange={(e) =>
                    handleBlockChange(index, "text", e.target.value)
                  }
                />
              </div>
            )}
            {block.type === "subheading" && (
              <div className="form-group">
                <label>Text</label>
                <input
                  className="form-control"
                  value={block.text || ""}
                  onChange={(e) =>
                    handleBlockChange(index, "text", e.target.value)
                  }
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="btn btn-danger mt-2"
            >
              Remove Block
            </button>
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
