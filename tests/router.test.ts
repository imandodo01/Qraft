import { describe, expect, it } from "vitest";
import { resolveRoute } from "../src/app/router";

describe("resolveRoute", () => {
  it("resolves the home route", () => {
    expect(resolveRoute("")).toEqual({ name: "home" });
    expect(resolveRoute("#/")).toEqual({ name: "home" });
  });

  it("resolves a valid tool route", () => {
    expect(resolveRoute("#/tools/qr-generator")).toEqual({
      name: "tool",
      toolId: "qr-generator",
    });
  });

  it("rejects unknown route patterns", () => {
    expect(resolveRoute("#/unknown")).toEqual({ name: "not-found" });
    expect(resolveRoute("#/tools/Bad_ID")).toEqual({ name: "not-found" });
  });
});
