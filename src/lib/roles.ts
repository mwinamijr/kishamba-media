import type { Role } from "@/types/api";

// Display labels for the admin UI. Order here is the display order in role
// dropdowns — roughly newsroom seniority, highest first.
export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR_IN_CHIEF: "Editor-in-Chief",
  MANAGING_EDITOR: "Managing Editor",
  SECTION_EDITOR: "Section Editor",
  COPY_EDITOR: "Copy Editor",
  REPORTER: "Reporter",
  CONTRIBUTOR: "Contributor",
  PHOTOJOURNALIST: "Photojournalist",
  SOCIAL_MEDIA_MANAGER: "Social Media Manager",
  MODERATOR: "Moderator",
  SUBSCRIBER: "Subscriber",
  USER: "User",
};

export const ROLES: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR_IN_CHIEF",
  "MANAGING_EDITOR",
  "SECTION_EDITOR",
  "COPY_EDITOR",
  "REPORTER",
  "CONTRIBUTOR",
  "PHOTOJOURNALIST",
  "SOCIAL_MEDIA_MANAGER",
  "MODERATOR",
  "SUBSCRIBER",
  "USER",
];

// Only ADMIN/SUPER_ADMIN may grant these two roles — mirrors the backend's
// self-escalation guard in authController.assignUserRole. Used to gray out
// options in the role dropdown for anyone below that (e.g. an
// EDITOR_IN_CHIEF who holds user:assign_role but shouldn't be able to make
// someone an ADMIN).
export const ADMIN_LEVEL_ROLES: Role[] = ["ADMIN", "SUPER_ADMIN"];
