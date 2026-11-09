import { describe, expect, it } from "vitest";
import { createEmptyBusinessCard, toVCardContact } from "../src/tools/business-card/types";
import { validateBusinessCard } from "../src/tools/business-card/validation";
import { serializeVCard } from "../src/tools/vcard-generator/serializer";

describe("validateBusinessCard", () => {
  it("requires a full name", () => {
    expect(validateBusinessCard(createEmptyBusinessCard())).toMatchObject({
      valid: false,
      field: "fullName",
    });
  });

  it("accepts valid contact details and optional presentation settings", () => {
    const data = {
      ...createEmptyBusinessCard(),
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      website: "example.com",
      theme: "dark" as const,
      accent: "teal" as const,
    };
    expect(validateBusinessCard(data)).toEqual({ valid: true });
  });

  it("rejects malformed email, website, and control characters", () => {
    const base = { ...createEmptyBusinessCard(), fullName: "Ada Lovelace" };
    expect(validateBusinessCard({ ...base, email: "not-an-email" })).toMatchObject({ valid: false, field: "email" });
    expect(validateBusinessCard({ ...base, website: "javascript:alert(1)" })).toMatchObject({ valid: false, field: "website" });
    expect(validateBusinessCard({ ...base, phone: "+1 555\\nTEL:123" })).toMatchObject({ valid: false, field: "phone" });
  });
});

describe("toVCardContact", () => {
  it("maps card details to the existing vCard serializer contract", () => {
    const data = {
      ...createEmptyBusinessCard(),
      fullName: "Ada Lovelace",
      jobTitle: "Engineer",
      organization: "Analytical Engines",
      email: "ada@example.com",
      phone: "+1 555 0100",
      website: "example.com",
    };
    const vCard = serializeVCard(toVCardContact(data));
    expect(vCard).toContain("FN:Ada Lovelace");
    expect(vCard).toContain("TITLE:Engineer");
    expect(vCard).toContain("ORG:Analytical Engines");
    expect(vCard).toContain("EMAIL;TYPE=INTERNET:ada@example.com");
    expect(vCard).toContain("TEL;TYPE=VOICE:+1 555 0100");
    expect(vCard).toContain("URL:https://example.com/");
  });
});
