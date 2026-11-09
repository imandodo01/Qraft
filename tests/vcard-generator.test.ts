import { describe, expect, it } from "vitest";
import { escapeVCardText, foldVCardLine, serializeVCard } from "../src/tools/vcard-generator/serializer";
import { validateVCardContact } from "../src/tools/vcard-generator/validation";
import { createEmptyContact } from "../src/tools/vcard-generator/types";

describe("validateVCardContact", () => {
  it("requires a formatted name", () => {
    const contact = createEmptyContact();
    expect(validateVCardContact(contact)).toMatchObject({
      valid: false,
      field: "formattedName",
    });
  });

  it("accepts a name and optional HTTP or HTTPS website", () => {
    const contact = { ...createEmptyContact(), formattedName: "Ada Lovelace", website: "https://example.com" };
    expect(validateVCardContact(contact)).toEqual({ valid: true });
  });

  it("rejects malformed and unsupported website URLs", () => {
    for (const website of ["example.com", "https://", "javascript:alert(1)", "https://example.com/a path"]) {
      const contact = { ...createEmptyContact(), formattedName: "Ada Lovelace", website };
      expect(validateVCardContact(contact)).toMatchObject({ valid: false, field: "website" });
    }
  });

  it("rejects malformed optional email addresses", () => {
    const contact = { ...createEmptyContact(), formattedName: "Ada Lovelace", email: "not-an-email" };
    expect(validateVCardContact(contact)).toMatchObject({ valid: false, field: "email" });
  });

  it("rejects line breaks in phone values to prevent property injection", () => {
    const contact = { ...createEmptyContact(), formattedName: "Ada Lovelace", phone: "+1 555\nTEL:123" };
    expect(validateVCardContact(contact)).toMatchObject({ valid: false, field: "phone" });
  });
});

describe("escapeVCardText", () => {
  it("escapes backslashes, commas, semicolons, and line breaks", () => {
    expect(escapeVCardText("A\\B, C; D\r\nE")).toBe("A\\\\B\\, C\\; D\\nE");
  });
});

describe("foldVCardLine", () => {
  it("folds long lines at 75 UTF-8 octets without splitting multibyte characters", () => {
    const line = `FN:${"é".repeat(50)}`;
    const folded = foldVCardLine(line).split("\r\n");
    expect(folded.length).toBeGreaterThan(1);
    expect(folded.every((part) => new TextEncoder().encode(part).length <= 75)).toBe(true);
    expect(folded.slice(1).every((part) => part.startsWith(" "))).toBe(true);
    expect(folded.map((part, index) => index === 0 ? part : part.slice(1)).join("")).toBe(line);
  });
});

describe("serializeVCard", () => {
  it("emits a vCard 3.0 envelope with required FN and N properties", () => {
    const contact = {
      ...createEmptyContact(),
      formattedName: "Ada Lovelace",
      givenName: "Ada",
      familyName: "Lovelace",
    };
    const output = serializeVCard(contact);
    expect(output).toContain("BEGIN:VCARD\r\n");
    expect(output).toContain("VERSION:3.0\r\n");
    expect(output).toContain("N:Lovelace;Ada;;;\r\n");
    expect(output).toContain("FN:Ada Lovelace\r\n");
    expect(output.endsWith("END:VCARD\r\n")).toBe(true);
  });

  it("omits empty optional properties and preserves Unicode", () => {
    const contact = {
      ...createEmptyContact(),
      formattedName: "李 小龍",
      organization: "東京ラボ",
    };
    const output = serializeVCard(contact);
    expect(output).toContain("FN:李 小龍");
    expect(output).toContain("ORG:東京ラボ");
    expect(output).not.toContain("EMAIL:");
    expect(output).not.toContain("TEL:");
    expect(output).not.toContain("URL:");
  });

  it("escapes text fields and includes valid optional contact properties", () => {
    const contact = {
      ...createEmptyContact(),
      formattedName: "Ada, Lovelace",
      organization: "Analytical; Engines",
      jobTitle: "Engineer\\Research",
      email: "ada@example.com",
      phone: "+1 555 0100",
      website: "https://example.com",
    };
    const output = serializeVCard(contact);
    expect(output).toContain("FN:Ada\\, Lovelace");
    expect(output).toContain("ORG:Analytical\\; Engines");
    expect(output).toContain("TITLE:Engineer\\\\Research");
    expect(output).toContain("EMAIL;TYPE=INTERNET:ada@example.com");
    expect(output).toContain("TEL;TYPE=VOICE:+1 555 0100");
    expect(output).toContain("URL:https://example.com");
  });

  it("rejects serialization when the required name is missing", () => {
    expect(() => serializeVCard(createEmptyContact())).toThrow(/name/i);
  });
});
