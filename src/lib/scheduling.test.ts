import { describe, it, expect } from "vitest";
import { isEmbargoed } from "./scheduling";

describe("isEmbargoed", () => {
  const now = new Date("2026-08-18T12:00:00Z");

  it("is false when publishAt is not set", () => {
    expect(isEmbargoed({ publishAt: null }, now)).toBe(false);
    expect(isEmbargoed({}, now)).toBe(false);
  });

  it("is true when publishAt is in the future", () => {
    expect(isEmbargoed({ publishAt: "2026-08-18T18:00:00Z" }, now)).toBe(true);
  });

  it("is false when publishAt is in the past", () => {
    expect(isEmbargoed({ publishAt: "2026-08-18T06:00:00Z" }, now)).toBe(false);
  });
});
