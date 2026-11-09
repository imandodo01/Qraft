import { describe, expect, it } from "vitest";
import { convertCase } from "../src/tools/case-converter";

describe("convertCase", () => {
  const input = "hello WORLD from-qraft_tool";

  it("supports lower, upper, and title case", () => {
    expect(convertCase(input, "lowercase")).toBe("hello world from-qraft_tool");
    expect(convertCase(input, "uppercase")).toBe("HELLO WORLD FROM-QRAFT_TOOL");
    expect(convertCase(input, "title")).toBe("Hello World From Qraft Tool");
  });

  it("supports camel, Pascal, snake, and kebab case", () => {
    expect(convertCase(input, "camel")).toBe("helloWorldFromQraftTool");
    expect(convertCase(input, "pascal")).toBe("HelloWorldFromQraftTool");
    expect(convertCase(input, "snake")).toBe("hello_world_from_qraft_tool");
    expect(convertCase(input, "kebab")).toBe("hello-world-from-qraft-tool");
  });

  it("preserves Unicode letters in supported conversions", () => {
    expect(convertCase("café 東京", "snake")).toBe("café_東京");
    expect(convertCase("straße", "uppercase")).toBe("STRASSE");
  });

  it("returns an empty result for separator-only compound input", () => {
    expect(convertCase(" - _ ", "camel")).toBe("");
  });
});
