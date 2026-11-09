import { renderTransformTool } from "../developer-text/transform-tool";

export type UrlAction = "encode" | "decode";

export function transformUriComponent(input: string, action: UrlAction): string {
  try {
    return action === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
  } catch {
    throw new TypeError("Malformed percent-encoding. Check the encoded input and try again.");
  }
}

export function renderUrlEncoder(container: HTMLElement): void {
  renderTransformTool(container, {
    id: "url-encoder",
    category: "Developer Tools",
    title: "URL Encoder / Decoder",
    description: "Encode or decode a URI component, such as a query value or path segment. This does not normalize full URLs.",
    inputLabel: "URI component",
    inputPlaceholder: "Hello world & Qraft",
    outputLabel: "Encoded / decoded result",
    actionLabel: "Convert",
    modes: [{ value: "encode", label: "Encode component" }, { value: "decode", label: "Decode component" }],
    initialMode: "encode",
    transform: (input, mode) => transformUriComponent(input, mode as UrlAction),
  });
}
