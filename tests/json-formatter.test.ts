import { describe, expect, it } from "vitest";
import { transformJson } from "../src/tools/json-formatter";

describe("transformJson", () => {
  const source = '{"name":"Qraft","nested":{"enabled":true,"items":[1,2]}}';

  it("formats nested JSON with two-space indentation", () => {
    expect(transformJson(source, "format")).toBe(JSON.stringify(JSON.parse(source), null, 2));
  });

  it("minifies valid JSON", () => {
    expect(transformJson(source, "minify")).toBe('{"name":"Qraft","nested":{"enabled":true,"items":[1,2]}}');
  });

  it("preserves Unicode and escaped strings", () => {
    const input = '{"message":"Halo 👋 \\n \\"Qraft\\""}';
    expect(JSON.parse(transformJson(input, "minify"))).toEqual(JSON.parse(input));
  });

  it("rejects empty and malformed JSON with a useful error", () => {
    expect(() => transformJson("  ", "format")).toThrow(/enter json/i);
    expect(() => transformJson('{"name":', "format")).toThrow(/invalid json/i);
  });
});
