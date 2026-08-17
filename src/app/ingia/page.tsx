"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/lib/api";
import Button from "@/components/Button";

// The JWT never touches client-side JS — the backend sets an httpOnly
// session cookie on login (see backend/README.md §5).
export default function LoginPage() {
  const router = useRouter();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      router.push("/");
      router.refresh();
    } catch {
      // error state below handles display
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-2xl font-bold text-ink">Ingia</h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Barua pepe"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
        <input
          type="password"
          required
          placeholder="Nywila"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
        {error && <p className="text-sm text-red-600">Barua pepe au nywila si sahihi.</p>}
        <Button type="submit" loading={isLoading} className="mt-2 w-full">
          Ingia
        </Button>
      </form>
    </div>
  );
}
