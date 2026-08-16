"use client";

import { useState } from "react";
import Link from "next/link";
import { useCreateUserByAdminMutation, useGetMeQuery } from "@/lib/api";
import type { Role } from "@/types/api";
import { ROLES, ROLE_LABELS, ADMIN_LEVEL_ROLES } from "@/lib/roles";

export default function NewUserPage() {
  const { data: me } = useGetMeQuery();
  const [createUser, { isLoading }] = useCreateUserByAdminMutation();
  const canGrantAdminRoles = me ? ADMIN_LEVEL_ROLES.includes(me.user.role) : false;

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "REPORTER" as Role,
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ username: string; tempPassword: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await createUser(form).unwrap();
      setResult({ username: res.user.username, tempPassword: res.tempPassword });
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data
          ? String((err.data as { message: unknown }).message)
          : "Imeshindikana kuunda mtumiaji.";
      setError(message);
    }
  };

  if (result) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="font-serif text-2xl font-bold text-ink">Mtumiaji Ameundwa</h1>
        <div className="mt-4 rounded border border-primary-200 bg-primary-50 p-4">
          <p className="text-sm text-secondary-500">
            Mpe <strong>{result.username}</strong> nywila hii ya muda — atahitajika kuibadilisha
            atakapoingia mara ya kwanza. Nywila hii <strong>haitaonekana tena</strong> baada ya
            kuondoka ukurasa huu.
          </p>
          <p className="mt-3 rounded bg-white px-3 py-2 font-mono text-sm text-ink">
            {result.tempPassword}
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <Link href="/admin/users" className="text-sm text-primary-500 hover:underline">
            Rudi kwenye orodha ya watumiaji
          </Link>
          <button
            onClick={() => setResult(null)}
            className="text-sm text-secondary-500 hover:underline"
          >
            Ongeza mwingine
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-serif text-2xl font-bold text-ink">Mtumiaji Mpya</h1>
      <p className="mt-1 text-sm text-secondary-500">
        Nywila ya muda itazalishwa moja kwa moja — hakuna nywila chaguo-msingi inayoshirikiwa.
      </p>

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
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Jina la kwanza"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
          <input
            placeholder="Jina la mwisho"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          />
        </div>
        <input
          placeholder="Simu (hiari)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
        />
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-secondary-500">Jukumu (Role)</span>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            className="rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none"
          >
            {ROLES.map((role) => (
              <option key={role} value={role} disabled={ADMIN_LEVEL_ROLES.includes(role) && !canGrantAdminRoles}>
                {ROLE_LABELS[role]}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 rounded bg-primary-500 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50"
        >
          {isLoading ? "Inaunda..." : "Unda Mtumiaji"}
        </button>
      </form>
    </div>
  );
}
