import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPost } from "../../features/news/postSlice";

const AddPost = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [title, setTitle] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.getPosts);

  const handleAddSubheading = () => {
    setContentBlocks([...contentBlocks, { type: "subheading", content: "" }]);
  };

  const handleAddParagraph = () => {
    setContentBlocks([...contentBlocks, { type: "paragraph", content: "" }]);
  };

  const handleAddImage = () => {
    setContentBlocks([
      ...contentBlocks,
      {
        type: "image",
        file: null,
        alignment: "left",
        tempId: `temp-${Date.now()}`,
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...contentBlocks];
    updated[index][field] = value;
    setContentBlocks(updated);
  };

  const handleRemoveBlock = (index) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const imageFiles = contentBlocks
      .filter((b) => b.type === "image" && b.file)
      .map((b) => b.file);

    imageFiles.forEach((file) => formData.append("images", file));

    const cleanedBlocks = contentBlocks.map((b) => {
      if (b.type === "image") {
        if (!b.file) {
          setFormError("Please select an image file for all image blocks.");
          return null;
        }
        return {
          type: "image",
          tempId: b.tempId,
          alignment: b.alignment,
        };
      } else if (b.type === "subheading" || b.type === "paragraph") {
        return {
          type: b.type,
          text: b.content,
        };
      }
      return null;
    });

    if (cleanedBlocks.includes(null)) return;

    formData.append("title", title);
    formData.append("contentBlocks", JSON.stringify(cleanedBlocks));

    try {
      setFormError("");
      await dispatch(createPost(formData)).unwrap();
      navigate("/posts");
    } catch (err) {
      setFormError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb" className="mt-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <li
                key={name}
                className="breadcrumb-item active"
                aria-current="page"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </li>
            ) : (
              <li key={name} className="breadcrumb-item">
                <Link to={routeTo}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <h2>Add Post</h2>
      {error && <p className="text-danger">Server error: {error}</p>}
      {formError && <p className="text-danger">{formError}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {contentBlocks.map((block, index) => (
          <div key={index} className="form-group mb-4 border p-3 rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>{block.type.toUpperCase()}</strong>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleRemoveBlock(index)}
              >
                Remove
              </button>
            </div>

            {block.type === "paragraph" && (
              <>
                <label>Paragraph</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={block.content}
                  onChange={(e) =>
                    handleChange(index, "content", e.target.value)
                  }
                  required
                />
              </>
            )}

            {block.type === "subheading" && (
              <>
                <label>Subheading</label>
                <input
                  type="text"
                  className="form-control"
                  value={block.content}
                  onChange={(e) =>
                    handleChange(index, "content", e.target.value)
                  }
                  required
                />
              </>
            )}

            {block.type === "image" && (
              <>
                <div className="form-group mb-2">
                  <label>Image URL</label>
                  <input
                    className="form-control"
                    value={block.imageUrl || ""}
                    onChange={(e) =>
                      handleChange(index, "imageUrl", e.target.value)
                    }
                  />
                </div>

                <div className="form-group mb-2">
                  <label>Alignment</label>
                  <select
                    className="form-control"
                    value={block.alignment || "center"}
                    onChange={(e) =>
                      handleChange(index, "alignment", e.target.value)
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
                      handleChange(index, "size", e.target.value)
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
          </div>
        ))}

        <div className="mb-4">
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={handleAddSubheading}
          >
            Add Subheading
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={handleAddParagraph}
          >
            Add Paragraph
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={handleAddImage}
          >
            Add Image
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? "Saving post..." : "Save Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
