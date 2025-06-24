import React, { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPost } from "../../features/news/postSlice";
import type { RootState } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type ContentBlock =
  | { type: "subheading"; content: string }
  | { type: "paragraph"; content: string }
  | {
      type: "image";
      file: File | null;
      imageUrl?: string;
      alignment: "left" | "right" | "center";
      size?: "small" | "medium" | "large";
      tempId: string;
    };

const AddPost: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [title, setTitle] = useState<string>("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [formError, setFormError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector(
    (state: RootState) => state.getPosts
  );

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
        size: "medium",
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof ContentBlock,
    value: any
  ) => {
    const updated = [...contentBlocks];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setContentBlocks(updated);
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updated = [...contentBlocks];
    if (updated[index].type === "image") {
      updated[index] = {
        ...updated[index],
        file,
        imageUrl: file ? URL.createObjectURL(file) : undefined,
      };
    }
    setContentBlocks(updated);
  };

  const handleRemoveBlock = (index: number) => {
    const updated = [...contentBlocks];
    updated.splice(index, 1);
    setContentBlocks(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare content blocks for API
    const cleanedBlocks = contentBlocks.map((b) => {
      if (b.type === "image") {
        if (!b.file) {
          setFormError("Please select an image file for all image blocks.");
          return null;
        }
        // You may need to upload the image separately and use its URL here
        return {
          type: "image",
          alignment: b.alignment,
          size: b.size,
          // Add imageUrl or image reference as needed
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

    // Prepare the payload for PostCreateUpdateData
    const payload = {
      title,
      content: cleanedBlocks,
    };

    try {
      setFormError("");
      await dispatch(createPost(payload)).unwrap();
      navigate("/posts");
    } catch (err) {
      setFormError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <nav aria-label="breadcrumb" className="mb-6">
        <ol className="flex flex-wrap text-gray-600 text-sm">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <li key={name} aria-current="page" className="font-semibold">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </li>
            ) : (
              <li key={name}>
                <Link to={routeTo} className="hover:underline">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Link>
                <span className="mx-2">/</span>
              </li>
            );
          })}
        </ol>
      </nav>

      <h2 className="text-2xl font-bold mb-6">Add Post</h2>

      {error && (
        <p className="text-red-600 mb-4">Server error: {error.toString()}</p>
      )}
      {formError && <p className="text-red-600 mb-4">{formError}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {contentBlocks.map((block, index) => (
          <div
            key={block.type + "-" + index}
            className="border border-gray-300 rounded p-4 space-y-4"
          >
            <div className="flex justify-between items-center mb-2">
              <strong className="uppercase">{block.type}</strong>
              <button
                type="button"
                onClick={() => handleRemoveBlock(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            {(block.type === "paragraph" || block.type === "subheading") && (
              <>
                <label className="block mb-1 font-medium">
                  {block.type === "paragraph" ? "Paragraph" : "Subheading"}
                </label>
                {block.type === "paragraph" ? (
                  <textarea
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={5}
                    value={block.content}
                    onChange={(e) =>
                      handleChange(index, "content", e.target.value)
                    }
                    required
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={block.content}
                    onChange={(e) =>
                      handleChange(index, "content", e.target.value)
                    }
                    required
                  />
                )}
              </>
            )}

            {block.type === "image" && (
              <>
                <div>
                  <label className="block mb-1 font-medium">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(index, e.target.files?.[0] ?? null)
                    }
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-orange-50 file:text-orange-700
                      hover:file:bg-orange-100"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Alignment</label>
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={block.alignment}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "alignment",
                        e.target.value as "left" | "right" | "center"
                      )
                    }
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Image Size</label>
                  <select
                    className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={block.size ?? "medium"}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "size",
                        e.target.value as "small" | "medium" | "large"
                      )
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
                    className="mt-2 rounded shadow"
                    style={{
                      width:
                        block.size === "small"
                          ? 150
                          : block.size === "large"
                          ? "100%"
                          : 400,
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleAddSubheading}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Add Subheading
          </button>
          <button
            type="button"
            onClick={handleAddParagraph}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Add Paragraph
          </button>
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Add Image
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Saving post..." : "Save Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
