"use client";

import { useState } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/lib/api";
import type { Category } from "@/types/api";

function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description ?? "");
  const [updateCategory, { isLoading: saving }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const handleSave = async () => {
    await updateCategory({ id: category.id, name, description: description || undefined }).unwrap();
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
        <td className="py-2 pr-4 text-xs text-secondary-500">{category.slug}</td>
        <td className="py-2 pr-4">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-secondary-50 p-1.5 text-sm focus:border-primary-500 focus:outline-none"
          />
        </td>
        <td className="py-2 pr-4">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded bg-primary-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-primary-600 disabled:opacity-50"
            >
              Hifadhi
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded border border-secondary-50 px-2.5 py-1 text-xs text-secondary-500"
            >
              Ghairi
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-secondary-50">
      <td className="py-2 pr-4 text-ink">{category.name}</td>
      <td className="py-2 pr-4 text-xs text-secondary-500">{category.slug}</td>
      <td className="py-2 pr-4 text-secondary-500">{category.description || "—"}</td>
      <td className="py-2 pr-4">
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="rounded border border-secondary-50 px-2.5 py-1 text-xs text-secondary-500 hover:bg-secondary-50"
          >
            Hariri
          </button>
          <button
            onClick={() => {
              if (confirm(`Futa kategoria "${category.name}"? Habari zilizopo zenye kategoria hii hazitafutwa lakini zitahitaji kategoria mpya.`)) {
                deleteCategory(category.id);
              }
            }}
            disabled={deleting}
            className="rounded border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Futa
          </button>
        </div>
      </td>
    </tr>
  );
}

function NewCategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createCategory({ name, description: description || undefined }).unwrap();
      setName("");
      setDescription("");
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Imeshindikana kuongeza kategoria.";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded border border-secondary-50 p-4">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-secondary-500">Jina la kategoria</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Utalii"
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-secondary-500">Maelezo (hiari)</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50"
      >
        {isLoading ? "Inaongeza..." : "+ Ongeza"}
      </button>
      {error && <p className="w-full text-sm text-red-600">{error}</p>}
    </form>
  );
}

export default function CategoriesPage() {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Kategoria</h1>
      <p className="mt-1 text-sm text-secondary-500">
        Kategoria hizi zinaendesha menyu ya tovuti moja kwa moja — kuongeza hapa kunaonekana kwenye
        tovuti mara moja.
      </p>

      <div className="mt-6">
        <NewCategoryForm />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-secondary-50 text-secondary-500">
              <th className="py-2 pr-4 font-medium">Jina</th>
              <th className="py-2 pr-4 font-medium">Slug</th>
              <th className="py-2 pr-4 font-medium">Maelezo</th>
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
            {categories?.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
