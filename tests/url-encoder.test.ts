import { describe, expect, it } from "vitest";
import { transformUriComponent } from "../src/tools/url-encoder";

describe("transformUriComponent", () => {
  it("encodes spaces, Unicode, reserved characters, and punctuation", () => {
    const input = "Halo dunia 👋 & status=ready!";
    expect(transformUriComponent(input, "encode")).toBe(encodeURIComponent(input));
  });

  it("decodes encoded components", () => {
    expect(transformUriComponent("Halo%20dunia%20%E2%9C%93", "decode")).toBe("Halo dunia ✓");
  });

  it("reports malformed percent-encoding", () => {
    expect(() => transformUriComponent("%E0%A4%A", "decode")).toThrow(/malformed percent/i);
  });

  it("does not reinterpret full URLs beyond URI component encoding", () => {
    const input = "https://example.com/a?x=one two";
    expect(transformUriComponent(input, "encode")).toBe(encodeURIComponent(input));
  });
});
