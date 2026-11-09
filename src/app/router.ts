export interface Route {
  name: "home" | "tool" | "not-found";
  toolId?: string;
}

export function resolveRoute(hash: string): Route {
  const normalized = hash.replace(/^#/, "") || "/";
  if (normalized === "/") return { name: "home" };

  const toolMatch = normalized.match(/^\/tools\/([a-z0-9-]+)$/);
  if (toolMatch?.[1]) return { name: "tool", toolId: toolMatch[1] };

  return { name: "not-found" };
}

export function navigate(path: string): void {
  window.location.hash = path;
}
