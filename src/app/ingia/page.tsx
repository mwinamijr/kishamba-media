"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/lib/api";
import { getDashboardPathForRole, safeNextPath } from "@/lib/dashboard";
import Button from "@/components/Button";

// The JWT never touches client-side JS — the backend sets an httpOnly
// session cookie on login (see backend/README.md §5).
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user } = await login({ email, password }).unwrap();
      // If the person got here via middleware.ts bouncing them off a
      // protected route, send them back there; otherwise land on the
      // dashboard their role actually has work in.
      const destination = safeNextPath(searchParams.get("next")) || getDashboardPathForRole(user.role);
      router.push(destination);
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

// useSearchParams() (for the post-login "next" redirect target) requires a
// Suspense boundary around whatever calls it, or `next build` bails the
// whole page out of static optimization with a build error — see
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
