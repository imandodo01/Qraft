export interface TextCounts {
  characters: number;
  words: number;
  lines: number;
}

interface WordSegment {
  isWordLike?: boolean;
}

interface SegmenterLike {
  segment(input: string): Iterable<WordSegment>;
}

type SegmenterConstructor = new (locales?: string | string[], options?: { granularity: "word" }) => SegmenterLike;

export function countText(input: string): TextCounts {
  if (!input) return { characters: 0, words: 0, lines: 0 };
  const characters = Array.from(input).length;
  const Segmenter = (Intl as unknown as { Segmenter?: SegmenterConstructor }).Segmenter;
  const words = Segmenter
    ? Array.from(new Segmenter(undefined, { granularity: "word" }).segment(input)).filter((part) => part.isWordLike).length
    : input.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  const lines = input.split(/\r\n|\r|\n/).length;
  return { characters, words, lines };
}
