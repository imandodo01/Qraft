import { createEmptyContact, type VCardContact } from "../vcard-generator/types";

export type CardTheme = "light" | "dark";
export type CardAccent = string;

export const DEFAULT_CARD_ACCENT = "#635bdb";

export interface BusinessCardData {
  fullName: string;
  jobTitle: string;
  organization: string;
  email: string;
  phone: string;
  website: string;
  tagline: string;
  theme: CardTheme;
  accent: CardAccent;
}

export function createEmptyBusinessCard(): BusinessCardData {
  return {
    fullName: "",
    jobTitle: "",
    organization: "",
    email: "",
    phone: "",
    website: "",
    tagline: "",
    theme: "light",
    accent: DEFAULT_CARD_ACCENT,
  };
}

export function toVCardContact(data: BusinessCardData): VCardContact {
  const contact = createEmptyContact();
  const nameParts = data.fullName.trim().split(/\\s+/);
  contact.formattedName = data.fullName.trim();
  contact.givenName = nameParts.shift() ?? "";
  contact.familyName = nameParts.join(" ");
  contact.jobTitle = data.jobTitle.trim();
  contact.organization = data.organization.trim();
  contact.email = data.email.trim();
  contact.phone = data.phone.trim();
  contact.website = data.website.trim();
  return contact;
}
