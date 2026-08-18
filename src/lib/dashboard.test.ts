import { describe, it, expect } from "vitest";
import { getDashboardPathForRole, safeNextPath } from "./dashboard";

describe("getDashboardPathForRole", () => {
  it("sends admin-tier roles to /admin", () => {
    expect(getDashboardPathForRole("SUPER_ADMIN")).toBe("/admin");
    expect(getDashboardPathForRole("ADMIN")).toBe("/admin");
  });

  it("sends editorial/staff roles to /newsroom", () => {
    for (const role of [
      "EDITOR_IN_CHIEF",
      "MANAGING_EDITOR",
      "SECTION_EDITOR",
      "COPY_EDITOR",
      "REPORTER",
      "CONTRIBUTOR",
      "PHOTOJOURNALIST",
      "SOCIAL_MEDIA_MANAGER",
      "MODERATOR",
    ] as const) {
      expect(getDashboardPathForRole(role)).toBe("/newsroom");
    }
  });

  it("sends plain readers to /profile", () => {
    expect(getDashboardPathForRole("USER")).toBe("/profile");
    expect(getDashboardPathForRole("SUBSCRIBER")).toBe("/profile");
  });

  it("defaults to /profile for an undefined role", () => {
    expect(getDashboardPathForRole(undefined)).toBe("/profile");
  });
});

describe("safeNextPath — open-redirect guard", () => {
  it("accepts a normal relative path", () => {
    expect(safeNextPath("/newsroom")).toBe("/newsroom");
    expect(safeNextPath("/admin/users")).toBe("/admin/users");
  });

  it("rejects absolute external URLs", () => {
    expect(safeNextPath("https://evil.example.com")).toBeNull();
    expect(safeNextPath("http://evil.example.com/phish")).toBeNull();
  });

  it("rejects protocol-relative URLs (//host)", () => {
    expect(safeNextPath("//evil.example.com")).toBeNull();
  });

  it("rejects a path with no leading slash", () => {
    expect(safeNextPath("evil.example.com")).toBeNull();
  });

  it("returns null for empty/missing input", () => {
    expect(safeNextPath(null)).toBeNull();
    expect(safeNextPath(undefined)).toBeNull();
    expect(safeNextPath("")).toBeNull();
  });
});
