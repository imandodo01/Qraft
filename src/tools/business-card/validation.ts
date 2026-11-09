import type { BusinessCardData } from "./types";

export type BusinessCardValidation =
  | { valid: true }
  | { valid: false; field: keyof BusinessCardData; message: string };

export function validateBusinessCard(data: BusinessCardData): BusinessCardValidation {
  if (!data.fullName.trim()) {
    return { valid: false, field: "fullName", message: "Enter your name to create a business card." };
  }

  if (/[\\u0000-\\u001f\\u007f]/.test(data.fullName)) {
    return { valid: false, field: "fullName", message: "Name cannot contain control characters." };
  }

  if (data.email.trim() && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email.trim())) {
    return { valid: false, field: "email", message: "Enter a valid email address." };
  }

  if (/[\\u0000-\\u001f\\u007f]/.test(data.phone)) {
    return { valid: false, field: "phone", message: "Phone cannot contain line breaks or control characters." };
  }

  if (data.website.trim()) {
    try {
      const candidate = /^https?:\\/\\//i.test(data.website.trim())
        ? data.website.trim()
        : `https://${data.website.trim()}`;
      const url = new URL(candidate);
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname || /\\s/.test(data.website.trim())) {
        throw new TypeError();
      }
    } catch {
      return { valid: false, field: "website", message: "Enter a valid website domain or HTTP/HTTPS URL." };
    }
  }

  return { valid: true };
}
