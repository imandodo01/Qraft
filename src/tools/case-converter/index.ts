import { renderTransformTool } from "../developer-text/transform-tool";

export type TextCase = "lowercase" | "uppercase" | "title" | "camel" | "pascal" | "snake" | "kebab";

export function convertCase(input: string, target: TextCase): string {
  if (target === "lowercase") return input.toLocaleLowerCase();
  if (target === "uppercase") return input.toLocaleUpperCase();

  const words = input.match(/[\p{L}\p{N}]+/gu) ?? [];
  if (target === "title") return words.map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase()).join(" ");
  const normalized = words.map((word) => word.toLocaleLowerCase());
  if (target === "snake") return normalized.join("_");
  if (target === "kebab") return normalized.join("-");
  if (target === "pascal") return normalized.map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1)).join("");
  if (target === "camel") return normalized.map((word, index) => index === 0 ? word : word.charAt(0).toLocaleUpperCase() + word.slice(1)).join("");
  return input;
}

export function renderCaseConverter(container: HTMLElement): void {
  renderTransformTool(container, {
    id: "case-converter",
    category: "Text Tools",
    title: "Case Converter",
    description: "Convert text between common letter cases. Separators are normalized for compound naming styles.",
    inputLabel: "Text input",
    inputPlaceholder: "Hello world from Qraft",
    outputLabel: "Converted text",
    actionLabel: "Convert text",
    modes: [
      { value: "lowercase", label: "lowercase" },
      { value: "uppercase", label: "UPPERCASE" },
      { value: "title", label: "Title Case" },
      { value: "camel", label: "camelCase" },
      { value: "pascal", label: "PascalCase" },
      { value: "snake", label: "snake_case" },
      { value: "kebab", label: "kebab-case" },
    ],
    initialMode: "lowercase",
    transform: (input, mode) => convertCase(input, mode as TextCase),
  });
}
