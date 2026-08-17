"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function SearchBox({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/tafuta?q=${encodeURIComponent(trimmed)}` : "/tafuta");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tafuta habari..."
        className="flex-1 rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
      />
      <Button type="submit">Tafuta</Button>
    </form>
  );
}
