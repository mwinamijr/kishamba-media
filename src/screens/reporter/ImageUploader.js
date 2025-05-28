import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";

function ImageUploader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successUpload } = useSelector((state) => state.imageUpload);

  useEffect(() => {
    if (successUpload) {
      navigate("/posts");
    }
  }, [successUpload, navigate, dispatch]);

  return (
    <div className="container mt-5 mb-5">
      <Link to="/articles" className="btn btn-secondary mb-3">
        ← Back to Articles
      </Link>

      <UploadImage />
    </div>
  );
}

export default ImageUploader;
