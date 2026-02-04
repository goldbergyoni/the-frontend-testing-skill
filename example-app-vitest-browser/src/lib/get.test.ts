import { describe, it, expect } from "vitest";

import { get } from "./get";

describe("get", () => {
  it("should return the value at the given path", () => {
    const obj = { a: { b: { c: 1 } } };
    expect(get(obj, "a.b.c")).toBe(1);
  });

  it("should return undefined if the path does not exist", () => {
    const obj = { a: { b: { c: 1 } } };
    expect(get(obj, "a.b.d")).toBeUndefined();
  });

  it("should handle array indices", () => {
    const obj = { a: { b: [1, 2, 3] } };
    expect(get(obj, "a.b.1")).toBe(2);
  });

  it("should handle complex paths", () => {
    const obj = { a: { b: [{ c: 1 }, { c: 2 }, { c: 3 }] } };
    expect(get(obj, "a.b.1.c")).toBe(2);
  });
});
