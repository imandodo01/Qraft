import type { VCardContact, VCardValidationResult } from "./types";

function isPresent(value: string): boolean {
  return value.trim().length > 0;
}

function hasControlCharacters(value: string): boolean {
  return /[\u0000-\u001F\u007F]/.test(value);
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
    const website = contact.website;
    if (
      website !== website.trim() ||
      /\s/.test(website) ||
      !/^https?:\/\//i.test(website)
    ) {
      return {
        valid: false,
        field: "website",
        message: "Enter a complete website URL starting with http:// or https://.",
      };
    }

    try {
      const parsedUrl = new URL(website);
      if (!["http:", "https:"].includes(parsedUrl.protocol) || !parsedUrl.hostname) {
        return {
          valid: false,
          field: "website",
          message: "Enter a valid HTTP or HTTPS website URL.",
        };
      }
    } catch {
      return {
        valid: false,
        field: "website",
        message: "Enter a valid HTTP or HTTPS website URL.",
      };
    }
  }

  return { valid: true };
}
