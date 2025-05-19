// pages/ManageImages.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../../features/images/fetchImages";

const ManageImages = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.fetchImages);
  const [copiedUrl, setCopiedUrl] = useState("");
  console.log(images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(""), 2000);
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Manage Images</h4>
        <Link to="/upload" className="btn btn-primary">
          Upload Image
        </Link>
      </div>

      {loading && <p>Loading images...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {images.length === 0 && !loading ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div className="row">
          {images.map((img, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={img}
                  className="card-img-top"
                  alt={img}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h6 className="card-title text-truncate">{img}</h6>
                  <input
                    className="form-control mb-2"
                    type="text"
                    readOnly
                    value={img}
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleCopy(img)}
                  >
                    {copiedUrl === img ? "Copied!" : "Copy URL"}
                  </button>
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
