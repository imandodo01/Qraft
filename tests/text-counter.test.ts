import { describe, expect, it } from "vitest";
import { countText } from "../src/tools/text-counter";

describe("countText", () => {
  it("returns zero counts for empty input", () => {
    expect(countText("")).toEqual({ characters: 0, words: 0, lines: 0 });
  });

  it("counts Unicode code points, words, and newline-separated lines", () => {
    expect(countText("Halo 👋 dunia\r\nQraft")).toEqual({ characters: 19, words: 3, lines: 2 });
  });

  it("handles whitespace-only input and repeated line breaks", () => {
    expect(countText("  \n\n ")).toEqual({ characters: 5, words: 0, lines: 3 });
  });

  it("counts Unicode letters and apostrophe-connected words", () => {
    expect(countText("café l’été 東京")).toMatchObject({ words: 3 });
  });
});
