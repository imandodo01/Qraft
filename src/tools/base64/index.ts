import { renderTransformTool } from "../developer-text/transform-tool";

export type Base64Action = "encode" | "decode";

export function encodeBase64Utf8(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function decodeBase64Utf8(input: string): string {
  const normalized = input.replace(/[\\t\\n\\f\\r ]/g, "");
  if (!normalized) return "";
  if (normalized.length % 4 !== 0 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(normalized)) {
    throw new TypeError("Enter valid Base64 text with correct padding.");
  }
  let binary: string;
  try {
    binary = atob(normalized);
  } catch {
    throw new TypeError("This value is not valid Base64.");
  }
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new TypeError("The Base64 data is not valid UTF-8 text.");
  }
}

export function transformBase64(input: string, action: Base64Action): string {
  return action === "encode" ? encodeBase64Utf8(input) : decodeBase64Utf8(input);
}

export function renderBase64Tool(container: HTMLElement): void {
  renderTransformTool(container, {
    id: "base64",
    category: "Developer Tools",
    title: "Base64 Encoder / Decoder",
    description: "Encode and decode UTF-8 text. Binary files are not supported in this version.",
    inputLabel: "Text or Base64 input",
    inputPlaceholder: "Enter text to encode, or Base64 to decode…",
    outputLabel: "Result",
    actionLabel: "Convert",
    modes: [{ value: "encode", label: "Encode to Base64" }, { value: "decode", label: "Decode from Base64" }],
    initialMode: "encode",
    transform: (input, mode) => transformBase64(input, mode as Base64Action),
  });
}
