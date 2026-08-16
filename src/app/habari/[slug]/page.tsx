import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/server-api";
import Badge from "@/components/Badge";
import CommentsSection from "@/components/CommentsSection";

export const revalidate = 30;

interface Props {
  params: { slug: string };
}

// Slug-based article lookup with full SEO metadata: Open Graph, Twitter
// Card, and (below, in the component body) NewsArticle JSON-LD structured
// data for search engines and social previews.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug).catch(() => null);
  if (!article) return {};

  const image = article.images[0]?.url;
  return {
    title: article.headline,
    description: article.summary ?? undefined,
    openGraph: {
      title: article.headline,
      description: article.summary ?? undefined,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.reportedBy.username],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.headline,
      description: article.summary ?? undefined,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug).catch(() => null);
  if (!article) notFound();

  const heroImage = article.images[0]?.url;

  // NewsArticle structured data — helps Google News / rich results eligibility.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [{ "@type": "Person", name: article.reportedBy.username }],
    image: heroImage ? [heroImage] : undefined,
  };

  return (
    <article className="mx-auto max-w-3xl">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-3 flex items-center gap-2">
        {article.isBreaking && <Badge tone="breaking">Breaking</Badge>}
        <Badge tone="category">{article.category.name}</Badge>
      </div>

      <h1 className="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {article.headline}
      </h1>

      <p className="mt-3 text-sm text-secondary-500">
        {article.reportedBy.firstName || article.reportedBy.username}
        {article.dateline && ` · ${article.dateline}`}
        {article.publishedAt && ` · ${new Date(article.publishedAt).toLocaleDateString()}`}
      </p>

      {article.status === "CORRECTED" && (
        <div className="mt-4 rounded border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-700">
          This story has been corrected since it was first published. See the correction history
          for details.
        </div>
      )}

      {heroImage && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md">
          <Image src={heroImage} alt={article.headline} fill className="object-cover" priority />
        </div>
      )}

      <div className="prose prose-secondary mt-6 max-w-none font-serif">
        {article.contentBlocks.map((block, i) => {
          if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
          if (block.type === "subheading") return <h2 key={i}>{block.text}</h2>;
          if (block.type === "quote")
            return (
              <blockquote key={i} className="border-l-4 border-primary-500 pl-4 italic">
                {block.text}
              </blockquote>
            );
          if (block.type === "image" && block.imageUrl)
            return (
              <div key={i} className="relative my-4 aspect-video w-full">
                <Image src={block.imageUrl} alt="" fill className="object-cover" />
              </div>
            );
          return null;
        })}
      </div>

      {article.sources.length > 0 && (
        <div className="mt-8 border-t border-secondary-50 pt-4 text-sm">
          <h3 className="font-semibold text-secondary-500">Sources</h3>
          <ul className="mt-1 list-disc pl-5 text-secondary-500">
            {article.sources.map((s) => (
              <li key={s.id}>
                {s.url ? (
                  <a href={s.url} className="hover:text-primary-500 hover:underline">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <CommentsSection articleId={article.id} />
    </article>
  );
}
