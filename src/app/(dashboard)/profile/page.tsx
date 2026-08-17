"use client";

import { useEffect, useState } from "react";
import {
  useGetMeQuery,
  useLogoutMutation,
  useUpdateMyProfileMutation,
  useUpdateMyPasswordMutation,
} from "@/lib/api";
import { ROLE_LABELS } from "@/lib/roles";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const inputClass =
  "rounded border border-secondary-50 p-2 text-sm focus:border-primary-500 focus:outline-none";

export default function ProfilePage() {
  const { data: me, isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const [updateProfile, { isLoading: savingProfile, isSuccess: profileSaved }] = useUpdateMyProfileMutation();
  const [updatePassword, { isLoading: savingPassword, isSuccess: passwordSaved, error: passwordError }] =
    useUpdateMyPasswordMutation();

  const [form, setForm] = useState({ username: "", email: "", phone: "", firstName: "", lastName: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });

  // Seed the edit form once `me` loads — a plain useState default can't see
  // it yet since the query resolves after first render.
  useEffect(() => {
    if (!me) return;
    setForm({
      username: me.user.username,
      email: me.user.email,
      phone: me.user.phone || "",
      firstName: me.user.firstName || "",
      lastName: me.user.lastName || "",
    });
  }, [me]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  if (isLoading) return <p className="text-sm text-secondary-500">Inapakia...</p>;
  if (!me) return null; // middleware.ts already guarantees a session for this route

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Wasifu Wangu</h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge tone="neutral">{ROLE_LABELS[me.user.role]}</Badge>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Toka
        </Button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile({ id: me.user.id, ...form });
        }}
        className="mt-6 flex flex-col gap-3"
      >
        <h2 className="text-sm font-semibold text-ink">Taarifa Binafsi</h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Jina la kwanza"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className={inputClass}
          />
          <input
            placeholder="Jina la mwisho"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className={inputClass}
          />
        </div>
        <input
          placeholder="Jina la mtumiaji"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Barua pepe"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass}
        />
        <input
          placeholder="Simu"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
        />
        {profileSaved && <p className="text-sm text-green-700">Taarifa zimehifadhiwa.</p>}
        <Button type="submit" loading={savingProfile} className="w-fit">
          Hifadhi Taarifa
        </Button>
      </form>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updatePassword({ id: me.user.id, ...passwordForm });
          setPasswordForm({ currentPassword: "", newPassword: "" });
        }}
        className="mt-8 flex flex-col gap-3 border-t border-secondary-50 pt-6"
      >
        <h2 className="text-sm font-semibold text-ink">Badilisha Nywila</h2>
        <input
          type="password"
          required
          placeholder="Nywila ya sasa"
          value={passwordForm.currentPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          className={inputClass}
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Nywila mpya (angalau herufi 8)"
          value={passwordForm.newPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          className={inputClass}
        />
        {passwordError && <p className="text-sm text-red-600">Nywila ya sasa si sahihi.</p>}
        {passwordSaved && <p className="text-sm text-green-700">Nywila imebadilishwa.</p>}
        <Button type="submit" loading={savingPassword} variant="outline" className="w-fit">
          Badilisha Nywila
        </Button>
      </form>
    </div>
  );
}
