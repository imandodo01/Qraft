import { renderTransformTool } from "../developer-text/transform-tool";

export type JsonAction = "format" | "minify";

export function transformJson(input: string, action: JsonAction): string {
  if (!input.trim()) throw new TypeError("Enter JSON to format or minify.");
  let parsed: unknown;
  try {
    parsed = JSON.parse(input) as unknown;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON.";
    throw new SyntaxError(`Invalid JSON: ${message}`);
  }
  return action === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
}

export function renderJsonFormatter(container: HTMLElement): void {
  renderTransformTool(container, {
    id: "json-formatter",
    category: "Developer Tools",
    title: "JSON Formatter",
    description: "Format, minify, and validate JSON with clear parsing feedback.",
    inputLabel: "JSON input",
    inputPlaceholder: '{ "name": "Qraft", "local": true }',
    outputLabel: "Formatted output",
    actionLabel: "Process JSON",
    modes: [{ value: "format", label: "Format · 2 spaces" }, { value: "minify", label: "Minify" }],
    initialMode: "format",
    transform: (input, mode) => transformJson(input, mode as JsonAction),
  });
}
