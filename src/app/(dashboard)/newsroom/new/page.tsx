import ArticleForm from "@/components/ArticleForm";

export const metadata = { title: "Andika Habari Mpya" };

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-ink">Andika Habari Mpya</h1>
      <p className="mt-1 text-sm text-secondary-500">
        Habari itaanza kama rasimu (draft) — utaituma kwa ukaguzi ukiwa tayari.
      </p>
      <div className="mt-6">
        <ArticleForm mode="create" />
      </div>
    </div>
  );
}
