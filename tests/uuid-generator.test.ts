import { describe, expect, it } from "vitest";
import { generateUuidV4 } from "../src/tools/uuid-generator";

describe("generateUuidV4", () => {
  it("generates UUID v4 values with the correct version and variant bits", () => {
    const value = generateUuidV4();
    expect(value).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it("uses the secure random-values fallback and sets UUID v4 bits", () => {
    const fakeCrypto = {
      getRandomValues: (bytes: Uint8Array) => {
        bytes.fill(0);
        return bytes;
      },
    } as unknown as Crypto;
    expect(generateUuidV4(fakeCrypto)).toBe("00000000-0000-4000-8000-000000000000");
  });

  it("fails rather than using weak randomness when secure APIs are unavailable", () => {
    expect(() => generateUuidV4({} as Crypto)).toThrow(/secure random/i);
  });

  it("generates distinct values in an ordinary sample batch", () => {
    const values = Array.from({ length: 30 }, () => generateUuidV4());
    expect(new Set(values).size).toBe(values.length);
  });
});
