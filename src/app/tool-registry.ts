export type ToolStatus = "available" | "planned";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  status: ToolStatus;
}

export const tools: ToolDefinition[] = [
  {
    id: "qr-generator",
    name: "QR Generator",
    description: "Create QR codes from a URL or plain text.",
    category: "QR Studio",
    keywords: ["qr", "qrcode", "url", "text", "generator"],
    status: "available",
  },
  {
    id: "vcard-generator",
    name: "vCard Generator",
    description: "Create downloadable digital contact cards.",
    category: "Contact Studio",
    keywords: ["contact", "vcard", "vcf", "address book"],
    status: "available",
  },
  {
    id: "business-card",
    name: "Digital Business Card",
    description: "Design and export a shareable digital business card.",
    category: "Contact Studio",
    keywords: ["business", "profile", "card", "contact"],
    status: "available",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON.",
    category: "Developer Tools",
    keywords: ["json", "format", "minify", "validate"],
    status: "planned",
  },
  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode UTF-8 text using Base64.",
    category: "Developer Tools",
    keywords: ["base64", "encode", "decode"],
    status: "planned",
  },
  {
    id: "url-encoder",
    name: "URL Encoder / Decoder",
    description: "Encode or decode URI components.",
    category: "Developer Tools",
    keywords: ["url", "uri", "encode", "decode"],
    status: "planned",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate UUID v4 identifiers.",
    category: "Developer Tools",
    keywords: ["uuid", "guid", "identifier", "random"],
    status: "planned",
  },
  {
    id: "text-counter",
    name: "Text Counter",
    description: "Count words, characters, and lines.",
    category: "Text Tools",
    keywords: ["text", "word", "character", "line", "counter"],
    status: "planned",
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between common letter cases.",
    category: "Text Tools",
    keywords: ["text", "case", "uppercase", "lowercase", "camelcase"],
    status: "planned",
  },
];

export const categories = [...new Set(tools.map((tool) => tool.category))];

export function findTool(id: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.id === id);
}

export function searchTools(query: string, category?: string): ToolDefinition[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return tools.filter((tool) => {
    const matchesCategory = !category || tool.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchableText = [
      tool.name,
      tool.description,
      tool.category,
      ...tool.keywords,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
