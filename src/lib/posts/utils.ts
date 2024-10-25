export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function generateExcerpt(content: string, length = 160): string {
  const cleanContent = content
    .replace(/\[\[(.*?)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*`]/g, "");

  return cleanContent.slice(0, length).trim() + "...";
}

export function extractMentions(content: string): string[] {
  const mentionRegex = /\[\[(.*?)\]\]/g;
  const matches = [...content.matchAll(mentionRegex)];
  return matches.map((match) => match[1]);
}
