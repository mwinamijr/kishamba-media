import React, { useState, useCallback, useEffect } from "react";
import {
  clearUpload,
  uploadImage,
} from "../../features/images/imageUploadSlice";
import Cropper from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import getCroppedImg from "../../components/CropImageHelper";
import type { RootState } from "../../app/store"; // Adjust if necessary
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type Crop = { x: number; y: number };
type Size = { width: number; height: number };

const UploadImage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { imageUrl, loading, error, successUpload } = useAppSelector(
    (state: RootState) => state.imageUpload
  );

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropSize, setCropSize] = useState<Size>({ width: 700, height: 435 });
  const [title, setTitle] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: false,
  });

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
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
    <div className="max-w-3xl mx-auto mt-6 mb-10 px-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:bg-gray-50 transition mb-4"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Drag & drop image here or click to select file
        </p>
      </div>

      {imageSrc && (
        <>
          <div className="relative w-full max-w-md h-[300px] mx-auto mb-4">
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

          <div className="mb-3">
            <label className="block mb-1 font-medium text-sm">Crop Size</label>
            <select
              className="w-full max-w-xs border rounded px-3 py-2"
              onChange={(e) => {
                const [w, h] = e.target.value.split("x").map(Number);
                setCropSize({ width: w, height: h });
              }}
              value={`${cropSize.width}x${cropSize.height}`}
            >
              <option value="700x435">700x435</option>
              <option value="800x500">800x500</option>
              <option value="110x100">110x100</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">
              Optional Name
            </label>
            <input
              type="text"
              className="w-full max-w-sm border rounded px-3 py-2"
              placeholder="Enter image name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <p className="font-medium">Image Uploaded:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-2 w-52 border rounded shadow"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
