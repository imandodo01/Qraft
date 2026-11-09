import { describe, expect, it } from "vitest";
import { generateQrPng, QrGenerationError } from "../src/tools/qr-generator/qr-service";
import { validateQrContent } from "../src/tools/qr-generator/validation";

describe("validateQrContent", () => {
  it("rejects empty and whitespace-only content", () => {
    expect(validateQrContent("", "text").valid).toBe(false);
    expect(validateQrContent("   \n  ", "text").valid).toBe(false);
    expect(validateQrContent(" ", "url").valid).toBe(false);
  });

  it("preserves plain text, spaces, line breaks, and Unicode", () => {
    const content = "Halo dunia!\nSelamat pagi 👋 — Qraft";
    expect(validateQrContent(content, "text")).toEqual({ valid: true, normalizedContent: content });
  });

  it("accepts complete HTTP and HTTPS URLs without rewriting them", () => {
    for (const content of ["http://example.com/path?a=1&b=two", "https://example.com"]) {
      expect(validateQrContent(content, "url")).toEqual({ valid: true, normalizedContent: content });
    }
  });

  it("rejects URLs without an explicit HTTP or HTTPS scheme", () => {
    expect(validateQrContent("example.com", "url").valid).toBe(false);
    expect(validateQrContent("https:example.com", "url").valid).toBe(false);
  });

  it("rejects malformed URLs and URLs containing whitespace", () => {
    expect(validateQrContent("https://", "url").valid).toBe(false);
    expect(validateQrContent("https://example.com/a path", "url").valid).toBe(false);
    expect(validateQrContent(" https://example.com", "url").valid).toBe(false);
  });

  it("rejects unsupported URL schemes", () => {
    for (const content of [
      "javascript:alert(1)",
      "data:text/plain,hello",
      "file:///C:/private.txt",
      "ftp://example.com",
    ]) {
      expect(validateQrContent(content, "url").valid).toBe(false);
    }
  });
});

describe("generateQrPng", () => {
  it("returns a PNG data URL for plain text and URLs", async () => {
    await expect(generateQrPng("Hello from Qraft")).resolves.toMatch(/^data:image\/png;base64,/);
    await expect(generateQrPng("https://example.com")).resolves.toMatch(/^data:image\/png;base64,/);
  });

  it("supports Unicode text", async () => {
    await expect(generateQrPng("Halo 👋 — selamat datang di Qraft")).resolves.toMatch(/^data:image\/png;base64,/);
  });

  it("reports oversized content instead of truncating it", async () => {
    await expect(generateQrPng("x".repeat(5000))).rejects.toThrow(QrGenerationError);
    await expect(generateQrPng("x".repeat(5000))).rejects.toThrow(/too long for a QR code/i);
  });
});
