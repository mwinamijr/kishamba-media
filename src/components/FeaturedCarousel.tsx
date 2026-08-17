"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/api";
import Badge from "./Badge";

const AUTO_ADVANCE_MS = 6000;

interface FeaturedCarouselProps {
  articles: Article[]; // pre-fetched by the server component that renders this — no client-side fetch here
}

// Auto-advancing carousel for the home page's top stories. Receives
// already-fetched articles as props rather than fetching client-side,
// since the parent (a Server Component) already has this data from its
// own ISR-cached request — fetching it again here would be redundant and
// would reintroduce the client-render flash that the rest of the public
// pages are built to avoid.
export default function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || articles.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % articles.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, articles.length]);

  if (articles.length === 0) return null;

  const current = articles[index];
  const heroImage = current.images[0]?.url;

  const goTo = (i: number) => setIndex(((i % articles.length) + articles.length) % articles.length);

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-secondary-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Link href={`/habari/${current.slug}`} className="group block">
        <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={current.headline}
              fill
              priority
              className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
            />
          ) : (
            <div className="h-full w-full bg-secondary-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/40 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            {current.isBreaking && <Badge tone="breaking">Breaking</Badge>}
            <Badge tone="category">{current.category.name}</Badge>
          </div>
          <h2 className="font-serif text-xl font-bold leading-snug sm:text-2xl">{current.headline}</h2>
          {current.summary && (
            <p className="hidden max-w-2xl text-sm text-white/80 sm:block">{current.summary}</p>
          )}
        </div>
      </Link>

      {articles.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Iliyotangulia"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Inayofuata"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
          >
            ›
          </button>

          <div className="absolute bottom-2 right-4 flex gap-1.5">
            {articles.map((a, i) => (
              <button
                key={a.id}
                type="button"
                aria-label={`Nenda kwenye habari ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-primary-500" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
