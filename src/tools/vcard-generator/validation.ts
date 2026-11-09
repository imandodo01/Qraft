import type { VCardContact, VCardValidationResult } from "./types";

function isPresent(value: string): boolean {
  return value.trim().length > 0;
}

function hasControlCharacters(value: string): boolean {
  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0;
    if (codePoint <= 0x1f || codePoint === 0x7f) return true;
  }
  return false;
}

/**
 * Normalizes a website value for vCard output.
 * Bare domains and URLs default to HTTPS; explicit HTTP(S) is preserved.
 */
export function normalizeWebsiteUrl(value: string): string {
  const website = value.trim();
  if (!website) return "";

  if (/\s/.test(website)) {
    throw new TypeError("Website URLs cannot contain whitespace.");
  }

  const hasScheme = /^[a-z][a-z\d+.-]*:(?!\d+(?:[/?#]|$))/i.test(website);
  if (hasScheme && !/^https?:\/\//i.test(website)) {
    throw new TypeError("Only HTTP and HTTPS website URLs are supported.");
  }

  const candidate = /^https?:\/\//i.test(website)
    ? website
    : `https://${website}`;

  const parsedUrl = new URL(candidate);
  if (!["http:", "https:"].includes(parsedUrl.protocol) || !parsedUrl.hostname) {
    throw new TypeError("Enter a valid HTTP or HTTPS website URL.");
  }

  return parsedUrl.href;
}

export function validateVCardContact(contact: VCardContact): VCardValidationResult {
  if (!isPresent(contact.formattedName)) {
    return {
      valid: false,
      field: "formattedName",
      message: "Enter a name to create your contact card.",
    };
  }

  if (isPresent(contact.email)) {
    if (hasControlCharacters(contact.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      return {
        valid: false,
        field: "email",
        message: "Enter a valid email address.",
      };
    }
  }

  if (isPresent(contact.phone) && hasControlCharacters(contact.phone)) {
    return {
      valid: false,
      field: "phone",
      message: "Phone number cannot contain line breaks or control characters.",
    };
  }

  if (isPresent(contact.website)) {
    try {
      normalizeWebsiteUrl(contact.website);
    } catch {
      return {
        valid: false,
        field: "website",
        message: "Enter a valid website domain or HTTP/HTTPS URL.",
      };
    }
  }

  return { valid: true };
}
