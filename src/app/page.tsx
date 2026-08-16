import { getPublishedArticles } from "@/lib/server-api";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 60; // ISR — regenerate this page in the background at most once a minute

export default async function HomePage() {
  const { data: articles } = await getPublishedArticles({ page: 1 });
  const [lead, ...rest] = articles;
  const breaking = articles.filter((a) => a.isBreaking);

  return (
    <div className="flex flex-col gap-10">
      {breaking.length > 0 && (
        <div className="flex items-center gap-3 rounded bg-breaking px-4 py-2 text-sm font-semibold text-ink">
          <span className="rounded bg-ink px-2 py-0.5 text-xs uppercase text-breaking">
            Breaking
          </span>
          <span className="truncate">{breaking[0].headline}</span>
        </div>
      )}

      {lead && (
        <section>
          <SectionHeader title="Habari Kuu" />
          <ArticleCard article={lead} variant="featured" />
        </section>
      )}

      <section>
        <SectionHeader title="Habari za Hivi Karibuni" href="/habari" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
