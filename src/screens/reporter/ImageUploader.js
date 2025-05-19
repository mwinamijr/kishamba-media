import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../features/imageUploadSlice";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { imageUrl, loading, error } = useSelector(
    (state) => state.imageUpload
  );

  const handleUpload = () => {
    if (file) {
      dispatch(uploadImage({ imageFile: file, name }));
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Optional name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div>
          <p>Image Uploaded:</p>
          <img src={imageUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
