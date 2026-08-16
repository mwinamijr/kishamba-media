"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useGetUsersQuery,
  useGetMeQuery,
  useAssignUserRoleMutation,
  useDeleteUserMutation,
} from "@/lib/api";
import type { Role, User } from "@/types/api";
import { ROLES, ROLE_LABELS, ADMIN_LEVEL_ROLES } from "@/lib/roles";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

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
        {canManageUsers && (
          <Link
            href="/admin/users/new"
            className="rounded bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
          >
            + Mtumiaji Mpya
          </Link>
        )}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-secondary-50 text-secondary-500">
              <th className="py-2 pr-4 font-medium">Jina la mtumiaji</th>
              <th className="py-2 pr-4 font-medium">Barua pepe</th>
              <th className="py-2 pr-4 font-medium">Jukumu (Role)</th>
              {canManageUsers && <th className="py-2 pr-4 font-medium">Vitendo</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="py-4 text-secondary-500">
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
                {canManageUsers && (
                  <td className="py-2 pr-4">
                    {user.id !== me?.user.id && (
                      <button
                        onClick={() => {
                          if (confirm(`Futa mtumiaji ${user.username}? Hatua hii haiwezi kurudishwa.`)) {
                            deleteUser(user.id);
                          }
                        }}
                        disabled={deleting}
                        className="rounded border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        Futa
                      </button>
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
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded border border-secondary-50 px-3 py-1 text-sm disabled:opacity-30"
          >
            Iliyotangulia
          </button>
          <span className="text-sm text-secondary-500">
            Ukurasa {data.page} kati ya {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
            className="rounded border border-secondary-50 px-3 py-1 text-sm disabled:opacity-30"
          >
            Inayofuata
          </button>
        </div>
      )}
    </div>
  );
}
