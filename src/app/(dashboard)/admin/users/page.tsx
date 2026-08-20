"use client";

import { useState } from "react";
import {
  useGetUsersQuery,
  useGetMeQuery,
  useGetCategoriesQuery,
  useAssignUserRoleMutation,
  useAssignUserCategoryScopeMutation,
  useDeleteUserMutation,
} from "@/lib/api";
import type { Role, User } from "@/types/api";
import { ROLES, ROLE_LABELS, ADMIN_LEVEL_ROLES } from "@/lib/roles";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import Button from "@/components/Button";

function RoleSelect({ user, canGrantAdminRoles }: { user: User; canGrantAdminRoles: boolean }) {
  const [assignRole, { isLoading }] = useAssignUserRoleMutation();

  return (
    <select
      value={user.role}
      disabled={isLoading}
      onChange={(e) => assignRole({ id: user.id, role: e.target.value as Role })}
      className="rounded border border-secondary-50 p-1.5 text-sm focus:border-primary-500 focus:outline-none disabled:opacity-50"
    >
      {ROLES.map((role) => (
        <option key={role} value={role} disabled={ADMIN_LEVEL_ROLES.includes(role) && !canGrantAdminRoles}>
          {ROLE_LABELS[role]}
        </option>
      ))}
    </select>
  );
}

// Dedicated admin-UI control for backend/README.md §3.5's former
// Prisma-Studio-only step: which categories a SECTION_EDITOR may act on.
// Full-replace on every toggle — matches the mutation's semantics, so what
// you see checked here is always exactly the server's current scope
// (subject to normal cache latency), never a client-side diff.
function CategoryScopeEditor({ user }: { user: User }) {
  const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();
  const [assignScope, { isLoading: saving }] = useAssignUserCategoryScopeMutation();

  const current = new Set((user.editedCategories ?? []).map((c) => c.id));

  const toggle = (categoryId: string) => {
    const next = new Set(current);
    if (next.has(categoryId)) next.delete(categoryId);
    else next.add(categoryId);
    assignScope({ id: user.id, categoryIds: Array.from(next) });
  };

  if (loadingCategories) {
    return <span className="text-xs text-secondary-500">Inapakia sehemu...</span>;
  }

  return (
    <details className="relative">
      <summary className="cursor-pointer list-none rounded border border-secondary-50 px-2 py-1 text-xs text-secondary-500 hover:border-primary-500 hover:text-ink">
        {current.size > 0 ? `Sehemu ${current.size}` : "Hakuna sehemu"}
      </summary>
      <div className="absolute z-10 mt-1 w-56 rounded border border-secondary-50 bg-white p-2 shadow-lg">
        {saving && <p className="mb-1 text-xs text-secondary-500">Inahifadhi...</p>}
        {(categories ?? []).length === 0 && <p className="text-xs text-secondary-500">Hakuna sehemu bado.</p>}
        <ul className="max-h-56 space-y-1 overflow-y-auto">
          {(categories ?? []).map((category) => (
            <li key={category.id}>
              <label className="flex items-center gap-2 text-xs text-ink">
                <input
                  type="checkbox"
                  checked={current.has(category.id)}
                  disabled={saving}
                  onChange={() => toggle(category.id)}
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const { data: me } = useGetMeQuery();
  const { data, isLoading } = useGetUsersQuery({ page });
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const canAssignRole = hasPermission(me?.user.role, PERMISSIONS.USER_ASSIGN_ROLE);
  const canManageUsers = hasPermission(me?.user.role, PERMISSIONS.USER_MANAGE);
  const canGrantAdminRoles = me ? ADMIN_LEVEL_ROLES.includes(me.user.role) : false;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Watumiaji</h1>
          <p className="mt-1 text-sm text-secondary-500">
            {data ? `Jumla ya watumiaji: ${data.total}` : "Inapakia..."}
          </p>
        </div>
        {canManageUsers && <Button href="/admin/users/new">+ Mtumiaji Mpya</Button>}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-secondary-50 text-secondary-500">
              <th className="py-2 pr-4 font-medium">Jina la mtumiaji</th>
              <th className="py-2 pr-4 font-medium">Barua pepe</th>
              <th className="py-2 pr-4 font-medium">Jukumu (Role)</th>
              {canAssignRole && <th className="py-2 pr-4 font-medium">Sehemu (Scope)</th>}
              {canManageUsers && <th className="py-2 pr-4 font-medium">Vitendo</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3 + (canAssignRole ? 1 : 0) + (canManageUsers ? 1 : 0)} className="py-4 text-secondary-500">
                  Inapakia...
                </td>
              </tr>
            )}
            {data?.data.map((user) => (
              <tr key={user.id} className="border-b border-secondary-50">
                <td className="py-2 pr-4 text-ink">{user.username}</td>
                <td className="py-2 pr-4 text-secondary-500">{user.email}</td>
                <td className="py-2 pr-4">
                  {canAssignRole && user.id !== me?.user.id ? (
                    <RoleSelect user={user} canGrantAdminRoles={canGrantAdminRoles} />
                  ) : (
                    ROLE_LABELS[user.role]
                  )}
                </td>
                {canAssignRole && (
                  <td className="py-2 pr-4">
                    {user.role === "SECTION_EDITOR" ? (
                      <CategoryScopeEditor user={user} />
                    ) : (
                      <span className="text-xs text-secondary-500">—</span>
                    )}
                  </td>
                )}
                {canManageUsers && (
                  <td className="py-2 pr-4">
                    {user.id !== me?.user.id && (
                      <Button
                        variant="danger"
                        size="sm"
                        loading={deleting}
                        onClick={() => {
                          if (confirm(`Futa mtumiaji ${user.username}? Hatua hii haiwezi kurudishwa.`)) {
                            deleteUser(user.id);
                          }
                        }}
                      >
                        Futa
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Iliyotangulia
          </Button>
          <span className="text-sm text-secondary-500">
            Ukurasa {data.page} kati ya {data.totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))} disabled={page === data.totalPages}>
            Inayofuata
          </Button>
        </div>
      )}
    </div>
  );
}
