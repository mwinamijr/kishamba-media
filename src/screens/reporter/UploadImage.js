import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUpload,
  uploadImage,
} from "../../features/images/imageUploadSlice";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import getCroppedImg from "../../components/CropImageHelper";

function UploadImage() {
  const dispatch = useDispatch();
  const { imageUrl, loading, error, successUpload } = useSelector(
    (state) => state.imageUpload
  );

  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropSize, setCropSize] = useState({ width: 700, height: 435 });
  const [title, setTitle] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: false,
  });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedFile = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      cropSize
    );
    dispatch(uploadImage({ imageFile: croppedFile, title }));
  };

  useEffect(() => {
    if (successUpload) {
      dispatch(clearUpload());
    }
  }, [successUpload, dispatch]);

  return (
    <div className="container mt-5 mb-5">
      <div
        {...getRootProps()}
        style={{ border: "2px dashed #ccc", padding: 20, marginBottom: 10 }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop image here or click to select file</p>
      </div>

      {imageSrc && (
        <>
          <div style={{ position: "relative", width: 400, height: 300 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={cropSize.width / cropSize.height}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <label>Crop Size: </label>
            <select
              onChange={(e) => {
                const [w, h] = e.target.value.split("x").map(Number);
                setCropSize({ width: w, height: h });
              }}
            >
              <option value="700x435">700x435</option>
              <option value="800x500">800x500</option>
              <option value="110x100">110x100</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Optional name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <br />

          <button onClick={handleUpload} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

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

export default UploadImage;
