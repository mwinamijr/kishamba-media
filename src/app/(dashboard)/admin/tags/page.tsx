"use client";

import { useState } from "react";
import { useGetTagsQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation } from "@/lib/api";
import type { Tag } from "@/types/api";
import Button from "@/components/Button";

function TagRow({ tag }: { tag: Tag }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(tag.name);
  const [updateTag, { isLoading: saving }] = useUpdateTagMutation();
  const [deleteTag, { isLoading: deleting }] = useDeleteTagMutation();

  const handleSave = async () => {
    await updateTag({ id: tag.id, name }).unwrap();
    setEditing(false);
  };

  if (editing) {
    return (
      <tr className="border-b border-secondary-50">
        <td className="py-2 pr-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-secondary-50 p-1.5 text-sm focus:border-primary-500 focus:outline-none"
          />
        </td>
        <td className="py-2 pr-4 text-xs text-secondary-500">{tag.slug}</td>
        <td className="py-2 pr-4 text-secondary-500">{tag.articleCount ?? 0}</td>
        <td className="py-2 pr-4">
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} loading={saving}>
              Hifadhi
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Ghairi
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-secondary-50">
      <td className="py-2 pr-4 text-ink">{tag.name}</td>
      <td className="py-2 pr-4 text-xs text-secondary-500">{tag.slug}</td>
      <td className="py-2 pr-4 text-secondary-500">{tag.articleCount ?? 0}</td>
      <td className="py-2 pr-4">
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
            Hariri
          </Button>
          <Button
            size="sm"
            variant="danger"
            loading={deleting}
            onClick={() => {
              const warning =
                tag.articleCount && tag.articleCount > 0
                  ? `Tag "${tag.name}" ipo kwenye habari ${tag.articleCount}. Kufuta hakutafuta habari hizo, tag itaondolewa tu. Endelea?`
                  : `Futa tag "${tag.name}"?`;
              if (confirm(warning)) deleteTag(tag.id);
            }}
          >
            Futa
          </Button>
        </div>
      </td>
    </tr>
  );
}

function NewTagForm() {
  const [name, setName] = useState("");
  const [createTag, { isLoading }] = useCreateTagMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createTag({ name }).unwrap();
      setName("");
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Imeshindikana kuongeza tag.";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded border border-secondary-50 p-4">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-secondary-500">Jina la tag</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Uchaguzi2026"
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
      </label>
      <Button type="submit" loading={isLoading}>
        + Ongeza
      </Button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </form>
  );
}

export default function TagsPage() {
  const { data: tags, isLoading } = useGetTagsQuery();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Tags</h1>
      <p className="mt-1 text-sm text-secondary-500">
        Tags mara nyingi huundwa moja kwa moja wakati wa kuandika habari — hapa unaweza kuzisimamia
        moja kwa moja, kubadilisha jina, au kuondoa zisizotumika.
      </p>

      <div className="mt-6">
        <NewTagForm />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-secondary-50 text-secondary-500">
              <th className="py-2 pr-4 font-medium">Jina</th>
              <th className="py-2 pr-4 font-medium">Slug</th>
              <th className="py-2 pr-4 font-medium">Habari</th>
              <th className="py-2 pr-4 font-medium">Vitendo</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="py-4 text-secondary-500">
                  Inapakia...
                </td>
              </tr>
            )}
            {tags?.map((tag) => (
              <TagRow key={tag.id} tag={tag} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
