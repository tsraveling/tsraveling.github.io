export interface PostFrontmatter {
  title: string;
  category: "games" | "politics" | "systems";
  date: string;
}

export interface Post {
  slug: string;
  title: string;
  category: "games" | "politics" | "systems";
  date: string;
  content: string;
  mentions: string[];
  mentionedBy: string[];
  wordCount: number;
  readingTime: number;
  excerpt: string;
}

export interface PostsData {
  posts: Record<string, Post>;
  categories: Record<string, string[]>;
  recent: string[];
}
