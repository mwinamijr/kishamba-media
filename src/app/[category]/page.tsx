import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategories, getPublishedArticles } from "@/lib/server-api";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 60;

// One data-driven category route. New categories created via the API
// (Category taxonomy in the backend) show up here automatically — no code
// change needed to add a section to the site.

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return {};
  return { title: category.name, description: category.description ?? undefined };
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const { data: articles } = await getPublishedArticles({ category: category.slug });

  return (
    <div>
      <SectionHeader title={category.name} />
      {articles.length === 0 ? (
        <p className="text-secondary-500">Hakuna habari bado katika sehemu hii.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
