import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "./UploadImage";
import type { RootState } from "../../app/store"; // Adjust path based on your project
import { useAppSelector } from "../../app/hooks";

const ImageUploader: React.FC = () => {
  const navigate = useNavigate();

  const successUpload = useAppSelector(
    (state: RootState) => state.imageUpload.successUpload
  );

  useEffect(() => {
    if (successUpload) {
      navigate("/posts");
    }
  }, [successUpload, navigate]);

  return (
    <div className="container mx-auto mt-12 mb-12 px-4">
      <Link
        to="/articles"
        className="inline-block mb-6 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
      >
        ← Back to Articles
      </Link>

      <UploadImage />
    </div>
  );
};

export default ImageUploader;
