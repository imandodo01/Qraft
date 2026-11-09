import { describe, expect, it } from "vitest";
import { categories, findTool, searchTools, tools } from "../src/app/tool-registry";

describe("tool registry", () => {
  it("contains uniquely identified tools with required metadata", () => {
    const ids = tools.map((tool) => tool.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(tools.length).toBeGreaterThan(0);

    for (const tool of tools) {
      expect(tool.name.trim()).not.toBe("");
      expect(tool.description.trim()).not.toBe("");
      expect(tool.category.trim()).not.toBe("");
      expect(tool.keywords.length).toBeGreaterThan(0);
    }
  });

  it("exposes the expected initial categories", () => {
    expect(categories).toEqual([
      "QR Studio",
      "Contact Studio",
      "Developer Tools",
      "Text Tools",
    ]);
  });

  it("finds a tool by its stable identifier", () => {
    expect(findTool("qr-generator")?.name).toBe("QR Generator");
    expect(findTool("vcard-generator")?.name).toBe("vCard Generator");
    expect(findTool("missing-tool")).toBeUndefined();
  });

  it("marks only the implemented v1 tools as available", () => {
    expect(tools.filter((tool) => tool.status === "available").map((tool) => tool.id)).toEqual([
      "qr-generator",
      "vcard-generator",
      "business-card",
    ]);
  });

  it("searches names, descriptions, categories, and keywords", () => {
    expect(searchTools("base64")).toHaveLength(1);
    expect(searchTools("contact")).toHaveLength(2);
    expect(searchTools("developer")).toHaveLength(4);
    expect(searchTools("  ")).toHaveLength(tools.length);
  });

  it("can filter by category and search query together", () => {
    const results = searchTools("contact", "Contact Studio");

    expect(results).toHaveLength(2);
    expect(results.every((tool) => tool.category === "Contact Studio")).toBe(true);
  });
});
