import { describe, expect, it } from "vitest";
import { generateUuidV4 } from "../src/tools/uuid-generator";

describe("generateUuidV4", () => {
  it("generates UUID v4 values with the correct version and variant bits", () => {
    const value = generateUuidV4();
    expect(value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("generates distinct values in an ordinary sample batch", () => {
    const values = Array.from({ length: 30 }, () => generateUuidV4());
    expect(new Set(values).size).toBe(values.length);
  });
});
