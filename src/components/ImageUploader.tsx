"use client";

import { useRef, useState } from "react";
import { useUploadImageMutation } from "@/lib/api";

interface ImageUploaderProps {
  value?: string; // current image URL, if any
  onChange: (url: string) => void;
  articleId?: string; // link the upload to an article immediately, if known
}

const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif";
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // matches backend/middlewares/upload.js

// File picker + preview + upload, used wherever an article needs an image
// (hero image, in-body image blocks). Uploads immediately on file
// selection rather than waiting for the surrounding form's submit — the
// resulting URL is handed back via onChange for the parent to store.
export default function ImageUploader({ value, onChange, articleId }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (file.size > MAX_SIZE_BYTES) {
      setError("Picha ni kubwa mno (upeo ni 8MB).");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", file.name);
    if (articleId) formData.append("articleId", articleId);

    try {
      const image = await uploadImage(formData).unwrap();
      onChange(image.url);
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Imeshindikana kupakia picha.";
      setError(message);
    } finally {
      URL.revokeObjectURL(objectUrl);
      setLocalPreview(null);
    }
  };

  const displayUrl = localPreview || value;

  return (
    <div className="flex flex-col gap-2">
      {displayUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- local blob/preview URLs and cross-origin backend URLs both render fine as plain <img>; next/image's optimizer isn't needed for this small editor preview
        <img
          src={displayUrl}
          alt=""
          className="h-32 w-full rounded border border-secondary-50 object-cover"
        />
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
          className="rounded border border-primary-500 px-3 py-1.5 text-xs font-medium text-primary-500 hover:bg-primary-50 disabled:opacity-50"
        >
          {isLoading ? "Inapakia..." : value ? "Badilisha Picha" : "Pakia Picha"}
        </button>
        {value && !isLoading && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-secondary-500 hover:text-red-600"
          >
            Ondoa
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      <details className="text-xs text-secondary-500">
        <summary className="cursor-pointer hover:text-ink">Au tumia URL ya nje</summary>
        <input
          type="url"
          value={value?.startsWith("blob:") ? "" : value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="mt-2 w-full rounded border border-secondary-50 p-1.5 text-xs focus:border-primary-500 focus:outline-none"
        />
      </details>
    </div>
  );
}
