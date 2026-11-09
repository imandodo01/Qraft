import { normalizeWebsiteUrl } from "../vcard-generator/validation";
import type { BusinessCardData } from "./types";

export type BusinessCardValidation =
  | { valid: true }
  | { valid: false; field: keyof BusinessCardData; message: string };

function hasControlCharacters(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x1f || code === 0x7f) return true;
  }
  return false;
}

export function validateBusinessCard(data: BusinessCardData): BusinessCardValidation {
  if (!/^#[0-9a-fA-F]{6}$/.test(data.accent)) {
    return { valid: false, field: "accent", message: "Choose a valid accent color." };
  }

  if (!data.fullName.trim()) {
    return { valid: false, field: "fullName", message: "Enter your name to create a business card." };
  }

  const textFields: Array<keyof Pick<BusinessCardData, "fullName" | "jobTitle" | "organization" | "tagline">> = [
    "fullName",
    "jobTitle",
    "organization",
    "tagline",
  ];
  for (const field of textFields) {
    if (hasControlCharacters(data[field])) {
      return { valid: false, field, message: "Remove control characters from this field." };
    }
  }

  if (data.email.trim() && (hasControlCharacters(data.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))) {
    return { valid: false, field: "email", message: "Enter a valid email address." };
  }

  if (hasControlCharacters(data.phone)) {
    return { valid: false, field: "phone", message: "Phone cannot contain line breaks or control characters." };
  }

  if (data.website.trim()) {
    try {
      normalizeWebsiteUrl(data.website);
    } catch {
      return { valid: false, field: "website", message: "Enter a valid website domain or HTTP/HTTPS URL." };
    }
  }

  return { valid: true };
}
