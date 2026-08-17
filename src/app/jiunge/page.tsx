"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useDispatch } from "react-redux";
import { getDashboardPathForRole, safeNextPath } from "@/lib/dashboard";
import Button from "@/components/Button";

// Registration isn't in the RTK Query slice by design — it's a one-off
// action, unlike login/logout which are reused across the auth-gated
// header state — so it POSTs directly and invalidates the "Me" tag afterward.
function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Imeshindikana kujisajili");
      }
      const body = await res.json();
      dispatch(api.util.invalidateTags(["Me"]));
      // A freshly-registered account is always role USER, but route via the
      // same helper as login so this stays correct if that ever changes.
      const destination = safeNextPath(searchParams.get("next")) || getDashboardPathForRole(body.user?.role);
      router.push(destination);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Imeshindikana kujisajili");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="font-serif text-2xl font-bold text-ink">Jiunge</h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          required
          placeholder="Jina la mtumiaji"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
        <input
          type="email"
          required
          placeholder="Barua pepe"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Nywila (angalau herufi 8)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" loading={isLoading} className="mt-2 w-full">
          Jiunge
        </Button>
      </form>
    </div>
  );
}

// See ingia/page.tsx for why the Suspense boundary is required here.
export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
