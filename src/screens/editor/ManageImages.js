// pages/ManageImages.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImage,
  fetchImages,
  updateImage,
} from "../../features/images/fetchImages";

const ManageImages = () => {
  const dispatch = useDispatch();
  const { images, loading, error, updatedImage, deletedImageId } = useSelector(
    (state) => state.fetchImages
  );

  const [copiedUrl, setCopiedUrl] = useState("");
  const [renameTitles, setRenameTitles] = useState({});

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(""), 2000);
    });
  };

  const handleRename = (id) => {
    if (!renameTitles[id]) return;
    dispatch(updateImage({ id, title: renameTitles[id] }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(deleteImage(id));
    }
  };

  const handleRenameChange = (id, value) => {
    setRenameTitles((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>📁 Manage Uploaded Images</h4>
        <Link to="/upload" className="btn btn-primary">
          + Upload Image
        </Link>
      </div>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      {updatedImage && (
        <p className="text-success">✅ Renamed to: {updatedImage.title}</p>
      )}
      {deletedImageId && (
        <p className="text-success">🗑️ Image deleted successfully.</p>
      )}

      {images.length === 0 && !loading ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div className="row">
          {images.map((img) => (
            <div key={img._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={img.url}
                  className="card-img-top"
                  alt={img.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title text-truncate">{img.title}</h6>

                  <input
                    type="text"
                    className="form-control mb-2"
                    value={renameTitles[img._id] || ""}
                    onChange={(e) =>
                      handleRenameChange(img._id, e.target.value)
                    }
                    placeholder="New title"
                  />

                  <input
                    className="form-control mb-2"
                    type="text"
                    readOnly
                    value={img.url}
                    onClick={(e) => e.target.select()}
                  />

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleCopy(img.url)}
                    >
                      {copiedUrl === img.url ? "✅ Copied!" : "Copy URL"}
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleRename(img._id)}
                      disabled={loading || !renameTitles[img._id]}
                    >
                      {loading ? "Renaming..." : "Rename"}
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(img._id)}
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageImages;
