import { describe, expect, it } from "vitest";
import { decodeBase64Utf8, encodeBase64Utf8, transformBase64 } from "../src/tools/base64";

describe("Base64 UTF-8 conversion", () => {
  it("round-trips ASCII and Unicode text", () => {
    for (const value of ["Hello Qraft", "Halo 👋 — selamat pagi", "東京 café"]) {
      expect(decodeBase64Utf8(encodeBase64Utf8(value))).toBe(value);
    }
  });

  it("handles empty input", () => {
    expect(encodeBase64Utf8("")).toBe("");
    expect(decodeBase64Utf8("")).toBe("");
  });

  it("rejects malformed Base64 and invalid UTF-8", () => {
    expect(() => decodeBase64Utf8("abc")).toThrow(/valid base64/i);
    expect(() => decodeBase64Utf8("!!!!")).toThrow(/valid base64/i);
    expect(() => decodeBase64Utf8("/w==")).toThrow(/valid utf-8/i);
  });

  it("supports the explicit encode and decode actions", () => {
    expect(transformBase64("Qraft", "encode")).toBe("UXJhZnQ=");
    expect(transformBase64("UXJhZnQ=", "decode")).toBe("Qraft");
  });
});
