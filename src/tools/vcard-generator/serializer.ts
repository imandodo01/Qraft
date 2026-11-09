import { normalizeWebsiteUrl, validateVCardContact } from "./validation";
import type { VCardContact } from "./types";

const encoder = new TextEncoder();

export function escapeVCardText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function foldVCardLine(line: string): string {
  const foldedLines: string[] = [];
  let currentLine = "";
  let currentBytes = 0;

  for (const character of line) {
    const characterBytes = encoder.encode(character).length;

    if (currentBytes + characterBytes > 75) {
      foldedLines.push(currentLine);
      currentLine = " " + character;
      currentBytes = 1 + characterBytes;
    } else {
      currentLine += character;
      currentBytes += characterBytes;
    }
  }

  foldedLines.push(currentLine);
  return foldedLines.join("\r\n");
}

function isPresent(value: string): boolean {
  return value.trim().length > 0;
}

export function serializeVCard(contact: VCardContact): string {
  const validation = validateVCardContact(contact);
  if (!validation.valid) {
    throw new TypeError(validation.message);
  }

  const nameComponents = [
    contact.familyName,
    contact.givenName,
    "",
    "",
    "",
  ].map(escapeVCardText);

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${nameComponents.join(";")}`,
    `FN:${escapeVCardText(contact.formattedName)}`,
  ];

  if (isPresent(contact.organization)) {
    lines.push(`ORG:${escapeVCardText(contact.organization)}`);
  }

  if (isPresent(contact.jobTitle)) {
    lines.push(`TITLE:${escapeVCardText(contact.jobTitle)}`);
  }

  if (isPresent(contact.email)) {
    lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardText(contact.email)}`);
  }

  if (isPresent(contact.phone)) {
    lines.push(`TEL;TYPE=VOICE:${contact.phone}`);
  }

  if (isPresent(contact.website)) {
    lines.push(`URL:${normalizeWebsiteUrl(contact.website)}`);
  }

  lines.push("END:VCARD");
  return lines.map(foldVCardLine).join("\r\n") + "\r\n";
}
