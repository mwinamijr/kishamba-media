"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetCategoriesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "@/lib/api";
import type { Article, ContentBlock } from "@/types/api";
import ImageUploader from "./ImageUploader";
import Button from "./Button";

interface EditableBlock extends ContentBlock {
  _key: string; // local-only React key, not sent to the backend
}

function blankBlock(type: ContentBlock["type"]): EditableBlock {
  return { _key: crypto.randomUUID(), type, text: "", imageUrl: "" };
}

function toEditableBlocks(blocks: ContentBlock[]): EditableBlock[] {
  return blocks.length > 0
    ? blocks.map((b) => ({ ...b, _key: crypto.randomUUID() }))
    : [blankBlock("paragraph")];
}

const BLOCK_TYPES: ContentBlock["type"][] = ["paragraph", "subheading", "quote", "image", "embed"];

// <input type="datetime-local"> needs "YYYY-MM-DDTHH:mm" in the *browser's*
// local time, with no timezone suffix — different from the ISO string the
// API sends/expects. These two are the only place that distinction matters.
function toDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalValue(value: string): string {
  return new Date(value).toISOString();
}

interface ArticleFormProps {
  mode: "create" | "edit";
  initial?: Article; // required for edit mode
}

// Handles both authoring a new draft and editing an existing one. In edit
// mode, if the article is already PUBLISHED/CORRECTED, a correction note is
// required before the backend will accept the change — see
// ../../backend/README.md §2 (ArticleRevision) for why.
export default function ArticleForm({ mode, initial }: ArticleFormProps) {
  const router = useRouter();
  const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();
  const [createArticle, { isLoading: creating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: updating }] = useUpdateArticleMutation();

  const [headline, setHeadline] = useState(initial?.headline ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [dateline, setDateline] = useState(initial?.dateline ?? "");
  const [isBreaking, setIsBreaking] = useState(initial?.isBreaking ?? false);
  const [categoryId, setCategoryId] = useState(initial?.category.id ?? "");
  const [tagsInput, setTagsInput] = useState(initial?.tags.map((t) => t.name).join(", ") ?? "");
  const [publishAt, setPublishAt] = useState(initial?.publishAt ? toDatetimeLocalValue(initial.publishAt) : "");
  const [blocks, setBlocks] = useState<EditableBlock[]>(toEditableBlocks(initial?.contentBlocks ?? []));
  const [correctionNote, setCorrectionNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const requiresCorrectionNote = mode === "edit" && (initial?.status === "PUBLISHED" || initial?.status === "CORRECTED");
  const isSubmitting = creating || updating;

  const updateBlock = (key: string, patch: Partial<ContentBlock>) => {
    setBlocks((prev) => prev.map((b) => (b._key === key ? { ...b, ...patch } : b)));
  };

  const addBlock = (type: ContentBlock["type"]) => {
    setBlocks((prev) => [...prev, blankBlock(type)]);
  };

  const removeBlock = (key: string) => {
    setBlocks((prev) => (prev.length > 1 ? prev.filter((b) => b._key !== key) : prev));
  };

  const moveBlock = (key: string, direction: -1 | 1) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b._key === key);
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!categoryId) {
      setError("Chagua kategoria.");
      return;
    }
    if (requiresCorrectionNote && correctionNote.trim().length < 10) {
      setError("Eleza marekebisho yaliyofanywa (angalau maneno machache) kabla ya kuhifadhi.");
      return;
    }

    const contentBlocks: ContentBlock[] = blocks
      .filter((b) => b.text?.trim() || b.imageUrl?.trim())
      .map(({ _key, ...block }) => block);

    const tagNames = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (mode === "create") {
        const article = await createArticle({
          headline,
          summary: summary || undefined,
          contentBlocks,
          categoryId,
          tagNames,
          dateline: dateline || undefined,
          isBreaking,
          publishAt: publishAt ? fromDatetimeLocalValue(publishAt) : undefined,
        }).unwrap();
        router.push(`/newsroom/${article.slug}/edit`);
      } else if (initial) {
        await updateArticle({
          id: initial.id,
          headline,
          summary: summary || undefined,
          contentBlocks,
          categoryId,
          dateline: dateline || undefined,
          isBreaking,
          ...(requiresCorrectionNote ? { correctionNote } : { publishAt: publishAt ? fromDatetimeLocalValue(publishAt) : null }),
        }).unwrap();
        router.push("/newsroom");
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Imeshindikana kuhifadhi makala. Jaribu tena.";
      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && <div className="rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-secondary-500">Kichwa cha habari (headline)</span>
          <input
            required
            minLength={5}
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-secondary-500">Muhtasari (summary)</span>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-secondary-500">Kategoria</span>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={loadingCategories}
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          >
            <option value="">-- Chagua --</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-secondary-500">Dateline (mahali/tarehe)</span>
          <input
            value={dateline}
            onChange={(e) => setDateline(e.target.value)}
            placeholder="e.g. Dodoma, Agosti 16"
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-sm font-medium text-secondary-500">Tags (tenganisha kwa koma)</span>
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="siasa, uchumi, michezo"
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-secondary-500">
          <input type="checkbox" checked={isBreaking} onChange={(e) => setIsBreaking(e.target.checked)} />
          Alama ya Breaking News
        </label>

        {!requiresCorrectionNote && (
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-sm font-medium text-secondary-500">
              Ratiba ya kuchapisha (hiari — embargo)
            </span>
            <input
              type="datetime-local"
              value={publishAt}
              onChange={(e) => setPublishAt(e.target.value)}
              className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
            />
            <span className="text-xs text-secondary-500">
              Ukiweka tarehe ya baadaye, habari haitachapishwa kabla ya wakati huo — hata ukibofya
              &quot;Chapisha&quot; kabla ya hapo. Itachapishwa yenyewe wakati ukifika. Acha wazi kuchapisha mara moja.
            </span>
          </label>
        )}
      </div>

      {/* Content block editor */}
      <div>
        <h2 className="text-sm font-semibold text-ink">Maudhui ya habari</h2>
        <div className="mt-2 flex flex-col gap-3">
          {blocks.map((block, i) => (
            <div key={block._key} className="rounded border border-secondary-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <select
                  value={block.type}
                  onChange={(e) => updateBlock(block._key, { type: e.target.value as ContentBlock["type"] })}
                  className="rounded border border-secondary-50 p-1 text-xs"
                >
                  {BLOCK_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlock(block._key, -1)}
                    disabled={i === 0}
                    aria-label="Hamisha juu"
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlock(block._key, 1)}
                    disabled={i === blocks.length - 1}
                    aria-label="Hamisha chini"
                  >
                    ↓
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeBlock(block._key)}
                    disabled={blocks.length === 1}
                  >
                    Ondoa
                  </Button>
                </div>
              </div>

              {block.type === "image" ? (
                <div className="mt-2">
                  <ImageUploader
                    value={block.imageUrl}
                    onChange={(url) => updateBlock(block._key, { imageUrl: url })}
                    articleId={initial?.id}
                  />
                </div>
              ) : (
                <textarea
                  value={block.text}
                  onChange={(e) => updateBlock(block._key, { text: e.target.value })}
                  rows={block.type === "subheading" ? 1 : 3}
                  placeholder={block.type === "embed" ? "Embed URL or code" : "Andika hapa..."}
                  className="mt-2 w-full rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {BLOCK_TYPES.map((t) => (
            <Button key={t} type="button" variant="outline" size="sm" onClick={() => addBlock(t)}>
              + {t}
            </Button>
          ))}
        </div>
      </div>

      {requiresCorrectionNote && (
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-secondary-500">
            Eleza marekebisho (correction note) — inahitajika kwa sababu habari hii tayari imechapishwa
          </span>
          <textarea
            required
            minLength={10}
            value={correctionNote}
            onChange={(e) => setCorrectionNote(e.target.value)}
            rows={2}
            className="rounded border border-primary-200 bg-primary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </label>
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" size="lg" loading={isSubmitting}>
          {mode === "create" ? "Hifadhi Rasimu" : "Hifadhi Mabadiliko"}
        </Button>
      </div>
    </form>
  );
}
