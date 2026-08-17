"use client";

import { useGetImagesQuery, useDeleteImageMutation, useGetMeQuery } from "@/lib/api";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import Button from "@/components/Button";

function formatSize(bytes?: number) {
  if (!bytes) return "";
  const kb = bytes / 1024;
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;
}

export default function MediaPage() {
  const { data: me } = useGetMeQuery();
  const { data: images, isLoading } = useGetImagesQuery();
  const [deleteImage, { isLoading: deleting }] = useDeleteImageMutation();
  const canManage = hasPermission(me?.user.role, PERMISSIONS.MEDIA_MANAGE);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Picha</h1>
      <p className="mt-1 text-sm text-secondary-500">
        Picha zote zilizopakiwa — zimehifadhiwa moja kwa moja kwenye database.
      </p>

      {isLoading && <p className="mt-6 text-sm text-secondary-500">Inapakia...</p>}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {images?.map((image) => (
          <div key={image.id} className="flex flex-col gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail grid of backend-served images, next/image optimization isn't worth the extra config for a small admin grid */}
            <img
              src={image.url}
              alt={image.title || ""}
              className="aspect-square w-full rounded border border-secondary-50 object-cover"
            />
            <p className="truncate text-xs text-secondary-500">{image.title}</p>
            <p className="text-[10px] text-secondary-500">{formatSize(image.size)}</p>
            {canManage && (
              <Button
                size="sm"
                variant="danger"
                loading={deleting}
                onClick={() => {
                  if (confirm("Futa picha hii?")) deleteImage(image.id);
                }}
              >
                Futa
              </Button>
            )}
          </div>
        ))}
      </div>

      {images?.length === 0 && !isLoading && (
        <p className="mt-6 text-sm text-secondary-500">
          Hakuna picha bado — pakia moja kwa kuandika au kuhariri habari.
        </p>
      )}
    </div>
  );
}
