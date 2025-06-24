import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteImage,
  fetchImages,
  updateImage,
} from "../../features/images/fetchImages";
import type { RootState } from "../../app/store"; // adjust import path
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Image {
  _id: string;
  title: string;
  url: string;
}

const ManageImages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { images, loading, error, updatedImage, deletedImageId } =
    useAppSelector((state: RootState) => state.fetchImages);

  const [copiedUrl, setCopiedUrl] = useState<string>("");
  const [renameTitles, setRenameTitles] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(""), 2000);
    });
  };

  const handleRename = (id: string) => {
    if (!renameTitles[id]) return;
    dispatch(updateImage({ id, title: renameTitles[id] }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(deleteImage(id));
    }
  };

  const handleRenameChange = (id: string, value: string) => {
    setRenameTitles((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-semibold">📁 Manage Uploaded Images</h4>
        <Link
          to="/upload"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Upload Image
        </Link>
      </div>

      {loading && <p className="text-gray-700">Loading images...</p>}
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}
      {updatedImage && (
        <p className="text-green-600 mb-2">
          ✅ Renamed to: {updatedImage.title}
        </p>
      )}
      {deletedImageId && (
        <p className="text-green-600 mb-2">🗑️ Image deleted successfully.</p>
      )}

      {images.length === 0 && !loading ? (
        <p>No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img: Image) => (
            <div
              key={img._id}
              className="bg-white shadow rounded overflow-hidden flex flex-col"
            >
              <img
                src={img.url}
                alt={img.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h6 className="font-semibold mb-2 truncate" title={img.title}>
                  {img.title}
                </h6>

                <input
                  type="text"
                  className="mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={renameTitles[img._id] || ""}
                  onChange={(e) => handleRenameChange(img._id, e.target.value)}
                  placeholder="New title"
                />

                <input
                  type="text"
                  className="mb-3 p-2 border border-gray-300 rounded bg-gray-100 cursor-pointer select-all"
                  readOnly
                  value={img.url}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />

                <div className="flex justify-between space-x-2 mt-auto">
                  <button
                    onClick={() => handleCopy(img.url)}
                    className="flex-1 px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                  >
                    {copiedUrl === img.url ? "✅ Copied!" : "Copy URL"}
                  </button>

                  <button
                    onClick={() => handleRename(img._id)}
                    disabled={loading || !renameTitles[img._id]}
                    className={`flex-1 px-3 py-1 text-sm rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? "Renaming..." : "Rename"}
                  </button>

                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={loading}
                    className={`flex-1 px-3 py-1 text-sm rounded border border-red-600 text-red-600 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? "Deleting..." : "Delete"}
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
