import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/api";
import Badge from "./Badge";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
}

// Shared card used everywhere an article preview appears — home, category
// pages, "related articles", search results — so every listing looks and
// behaves consistently.
export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const heroImage = article.images[0]?.url;
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/habari/${article.slug}`}
      className="group flex flex-col gap-3 sm:flex-row sm:items-start"
    >
      {heroImage && (
        <div
          className={`relative shrink-0 overflow-hidden rounded-md bg-secondary-50 ${
            isFeatured ? "aspect-[16/9] w-full" : "aspect-[4/3] w-full sm:w-40"
          }`}
        >
          <Image
            src={heroImage}
            alt={article.headline}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          {article.isBreaking && <Badge tone="breaking">Breaking</Badge>}
          <Badge tone="category">{article.category.name}</Badge>
        </div>
        <h3
          className={`font-serif font-semibold leading-snug text-ink group-hover:text-primary-500 ${
            isFeatured ? "text-2xl" : "text-base"
          }`}
        >
          {article.headline}
        </h3>
        {article.summary && isFeatured && (
          <p className="line-clamp-2 text-sm text-secondary-500">{article.summary}</p>
        )}
        <p className="text-xs text-secondary-500">
          {article.reportedBy.firstName || article.reportedBy.username}
          {article.publishedAt && ` · ${new Date(article.publishedAt).toLocaleDateString()}`}
        </p>
      </div>
    </Link>
  );
}
