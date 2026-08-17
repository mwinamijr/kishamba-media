import { getPublishedArticles } from "@/lib/server-api";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import AdSlot from "@/components/AdSlot";

export const revalidate = 60; // ISR — regenerate this page in the background at most once a minute

const CAROUSEL_SIZE = 5;

export default async function HomePage() {
  const { data: articles } = await getPublishedArticles({ page: 1 });

  // Breaking stories lead the carousel; fill the remaining slots with the
  // next most recent articles (already sorted publishedAt desc by the
  // backend). Whatever ends up in the carousel is excluded from the grid
  // below it, so nothing appears twice on the page.
  const breaking = articles.filter((a) => a.isBreaking);
  const nonBreaking = articles.filter((a) => !a.isBreaking);
  const carouselArticles = [...breaking, ...nonBreaking].slice(0, CAROUSEL_SIZE);
  const carouselIds = new Set(carouselArticles.map((a) => a.id));
  const rest = articles.filter((a) => !carouselIds.has(a.id));

  return (
    <div className="flex flex-col gap-10">
      {carouselArticles.length > 0 && <FeaturedCarousel articles={carouselArticles} />}

      <div className="flex justify-center">
        <AdSlot size="leaderboard" label="Ad Space — 728×90" />
      </div>

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
