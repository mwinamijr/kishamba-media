import { describe, it, expect } from "vitest";
import { canAccessRoute } from "./route-access";

describe("canAccessRoute", () => {
  it("denies everyone with no role", () => {
    expect(canAccessRoute(undefined, "/profile")).toBe(false);
    expect(canAccessRoute(undefined, "/newsroom")).toBe(false);
    expect(canAccessRoute(undefined, "/admin")).toBe(false);
  });

  describe("/profile", () => {
    it("is open to every authenticated role", () => {
      for (const role of ["USER", "SUBSCRIBER", "REPORTER", "ADMIN", "SUPER_ADMIN"] as const) {
        expect(canAccessRoute(role, "/profile")).toBe(true);
      }
    });
  });

  describe("/newsroom", () => {
    it("is denied for plain readers", () => {
      expect(canAccessRoute("USER", "/newsroom")).toBe(false);
      expect(canAccessRoute("SUBSCRIBER", "/newsroom")).toBe(false);
    });

    it("is open to every staff role", () => {
      for (const role of ["REPORTER", "COPY_EDITOR", "SECTION_EDITOR", "MODERATOR", "ADMIN"] as const) {
        expect(canAccessRoute(role, "/newsroom")).toBe(true);
      }
    });
  });

  describe("/admin", () => {
    it("index page is open to any role holding at least one admin-section permission", () => {
      expect(canAccessRoute("ADMIN", "/admin")).toBe(true);
      expect(canAccessRoute("REPORTER", "/admin")).toBe(true); // media:upload
    });

    it("index page is denied for a role with zero admin permissions", () => {
      expect(canAccessRoute("COPY_EDITOR", "/admin")).toBe(false);
      expect(canAccessRoute("MODERATOR", "/admin")).toBe(false);
    });

    it("/admin/users requires user:manage or user:assign_role", () => {
      expect(canAccessRoute("ADMIN", "/admin/users")).toBe(true);
      expect(canAccessRoute("EDITOR_IN_CHIEF", "/admin/users")).toBe(true); // user:assign_role only
      expect(canAccessRoute("SECTION_EDITOR", "/admin/users")).toBe(false);
    });

    it("/admin/categories requires category:manage", () => {
      expect(canAccessRoute("ADMIN", "/admin/categories")).toBe(true);
      expect(canAccessRoute("SECTION_EDITOR", "/admin/categories")).toBe(false); // tag:manage, not category:manage
    });

    it("/admin/tags requires tag:manage — SECTION_EDITOR holds this even without full admin access", () => {
      expect(canAccessRoute("SECTION_EDITOR", "/admin/tags")).toBe(true);
      expect(canAccessRoute("REPORTER", "/admin/tags")).toBe(false);
    });

    it("/admin/media requires media:upload or media:manage", () => {
      expect(canAccessRoute("REPORTER", "/admin/media")).toBe(true); // media:upload
      expect(canAccessRoute("PHOTOJOURNALIST", "/admin/media")).toBe(true); // media:manage
      expect(canAccessRoute("COPY_EDITOR", "/admin/media")).toBe(false);
    });
  });
});
