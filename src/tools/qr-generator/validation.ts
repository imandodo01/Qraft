export type QrContentType = "url" | "text";

export type QrValidationResult =
  | { valid: true; normalizedContent: string }
  | { valid: false; message: string };

export function validateQrContent(content: string, contentType: QrContentType): QrValidationResult {
  if (content.trim().length === 0) {
    return {
      valid: false,
      message: contentType === "url" ? "Enter a URL to generate a QR code." : "Enter some text to generate a QR code.",
    };
  }

  if (contentType === "text") {
    return { valid: true, normalizedContent: content };
  }

  if (content !== content.trim() || /\s/.test(content)) {
    return { valid: false, message: "A URL cannot contain spaces or line breaks." };
  }

  if (!/^https?:\/\//i.test(content)) {
    return { valid: false, message: "Enter a complete URL starting with http:// or https://." };
  }

  try {
    const parsedUrl = new URL(content);
    if (!["http:", "https:"].includes(parsedUrl.protocol) || !parsedUrl.hostname) {
      return { valid: false, message: "Enter a valid HTTP or HTTPS URL." };
    }
  } catch {
    return { valid: false, message: "Enter a valid HTTP or HTTPS URL." };
  }

  return { valid: true, normalizedContent: content };
}
