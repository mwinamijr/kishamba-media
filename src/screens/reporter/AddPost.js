import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { createPost } from "../../features/news/postSlice";

const AddPost = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => []);
  const [title, setTitle] = useState("");
  const [contentBlocks, setContentBlocks] = useState([]);
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.getPosts);

  const handleAddBlock = (type) => {
    const newBlock =
      type === "image"
        ? {
            type,
            file: null,
            alignment: "left",
            tempId: `temp-${Date.now()}`,
          }
        : { type, content: "" };

    setContentBlocks([...contentBlocks, newBlock]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...contentBlocks];
    updated[index][field] = value;
    setContentBlocks(updated);
  };

  const handleFileChange = async (index, file) => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const updated = [...contentBlocks];
      updated[index].file = compressedFile;
      updated[index].tempId = compressedFile.name;
      setContentBlocks(updated);
    } catch (err) {
      console.error("Image compression error:", err);
    }
  };

  const moveBlock = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= contentBlocks.length) return;

    const updated = [...contentBlocks];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
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
        return { type: "image", tempId: b.tempId, alignment: b.alignment };
      } else {
        return { type: b.type, text: b.content };
      }
    });

    if (cleanedBlocks.includes(null)) return;

    formData.append("title", title);
    formData.append("contentBlocks", JSON.stringify(cleanedBlocks));

    try {
      setFormError("");
      await dispatch(createPost(formData)).unwrap();
      navigate("/posts");
    } catch {
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
          <div
            key={index}
            className="form-group mb-4 border p-3 rounded position-relative"
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>{block.type.toUpperCase()}</strong>
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
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveBlock(index)}
                >
                  Remove
                </button>
              </div>
            </div>

            {block.type === "paragraph" && (
              <>
                <label>Paragraph</label>
                <textarea
                  className="form-control"
                  rows="4"
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
                <label>Upload Image</label>
                <input
                  type="file"
                  className="form-control mb-2"
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  required
                />
                <label>Alignment</label>
                <select
                  className="form-control"
                  value={block.alignment}
                  onChange={(e) =>
                    handleChange(index, "alignment", e.target.value)
                  }
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="center">Center</option>
                </select>
                {block.file && (
                  <img
                    src={URL.createObjectURL(block.file)}
                    alt="preview"
                    className="img-thumbnail mt-2"
                    style={{ maxWidth: "200px" }}
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
            onClick={() => handleAddBlock("subheading")}
          >
            Add Subheading
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={() => handleAddBlock("paragraph")}
          >
            Add Paragraph
          </button>
          <button
            type="button"
            className="btn btn-secondary m-2"
            onClick={() => handleAddBlock("image")}
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
