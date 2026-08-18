import { describe, it, expect } from "vitest";
import { PERMISSIONS, hasPermission, hasAnyPermission, isScopedToArticle } from "./permissions";

describe("hasPermission", () => {
  it("grants SUPER_ADMIN every permission", () => {
    for (const permission of Object.values(PERMISSIONS)) {
      expect(hasPermission("SUPER_ADMIN", permission)).toBe(true);
    }
  });

  it("returns false for an undefined role instead of throwing", () => {
    expect(hasPermission(undefined, PERMISSIONS.ARTICLE_CREATE)).toBe(false);
  });

  it("USER only holds comment:create", () => {
    expect(hasPermission("USER", PERMISSIONS.COMMENT_CREATE)).toBe(true);
    expect(hasPermission("USER", PERMISSIONS.ARTICLE_CREATE)).toBe(false);
  });

  it("REPORTER can create/submit but not approve or publish", () => {
    expect(hasPermission("REPORTER", PERMISSIONS.ARTICLE_CREATE)).toBe(true);
    expect(hasPermission("REPORTER", PERMISSIONS.ARTICLE_APPROVE)).toBe(false);
    expect(hasPermission("REPORTER", PERMISSIONS.ARTICLE_PUBLISH)).toBe(false);
  });

  it("COPY_EDITOR can edit any article but not move the workflow forward", () => {
    expect(hasPermission("COPY_EDITOR", PERMISSIONS.ARTICLE_EDIT_ANY)).toBe(true);
    expect(hasPermission("COPY_EDITOR", PERMISSIONS.ARTICLE_APPROVE)).toBe(false);
  });
});

describe("hasAnyPermission", () => {
  it("true if the role holds at least one of the listed permissions", () => {
    expect(hasAnyPermission("REPORTER", [PERMISSIONS.ARTICLE_APPROVE, PERMISSIONS.ARTICLE_CREATE])).toBe(true);
  });

  it("false if the role holds none of the listed permissions", () => {
    expect(hasAnyPermission("USER", [PERMISSIONS.ARTICLE_APPROVE, PERMISSIONS.ARTICLE_CREATE])).toBe(false);
  });
});

describe("isScopedToArticle", () => {
  it("is always true for non-SECTION_EDITOR roles", () => {
    expect(isScopedToArticle({ role: "ADMIN" }, { category: { id: "cat-1" } })).toBe(true);
  });

  it("is true for a SECTION_EDITOR acting inside their assigned category", () => {
    const editor = { role: "SECTION_EDITOR" as const, editedCategories: [{ id: "cat-1" }] };
    expect(isScopedToArticle(editor, { category: { id: "cat-1" } })).toBe(true);
  });

  it("is false for a SECTION_EDITOR acting outside their assigned category", () => {
    const editor = { role: "SECTION_EDITOR" as const, editedCategories: [{ id: "cat-1" }] };
    expect(isScopedToArticle(editor, { category: { id: "cat-2" } })).toBe(false);
  });

  it("is false for an undefined user", () => {
    expect(isScopedToArticle(undefined, { category: { id: "cat-1" } })).toBe(false);
  });
});
