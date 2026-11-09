import { renderTextCounter } from "./view";

export interface TextCounts {
  characters: number;
  words: number;
  lines: number;
}

export function countText(input: string): TextCounts {
  if (!input) return { characters: 0, words: 0, lines: 0 };
  const characters = Array.from(input).length;
  const words = input.match(/[\\p{L}\\p{N}]+(?:['’][\\p{L}\\p{N}]+)*/gu)?.length ?? 0;
  const lines = input.split(/\\r\\n|\\r|\\n/).length;
  return { characters, words, lines };
}

export { renderTextCounter };
