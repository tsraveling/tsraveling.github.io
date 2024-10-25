import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostFrontmatter, PostsData } from "@/types/posts";
import {
  calculateReadingTime,
  generateExcerpt,
  extractMentions,
} from "./utils";

export function generatePostsData(): PostsData {
  const postsDirectory = path.join(process.cwd(), "posts");
  const posts: Record<string, Post> = {};
  const categories: Record<string, string[]> = {
    games: [],
    politics: [],
    systems: [],
  };

  // First pass: Create base post objects
  const filenames = fs.readdirSync(postsDirectory);
  filenames.forEach((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    posts[slug] = {
      slug,
      title: frontmatter.title,
      category: frontmatter.category,
      date: frontmatter.date,
      content,
      mentions: extractMentions(content),
      mentionedBy: [],
      wordCount: content.trim().split(/\s+/).length,
      readingTime: calculateReadingTime(content),
      excerpt: generateExcerpt(content),
    };

    categories[frontmatter.category].push(slug);
  });

  // Second pass: Process mentionedBy relationships
  Object.values(posts).forEach((post) => {
    post.mentions.forEach((mentionedSlug) => {
      if (posts[mentionedSlug]) {
        posts[mentionedSlug].mentionedBy.push(post.slug);
      }
    });
  });

  const recent = Object.keys(posts).sort(
    (a, b) =>
      new Date(posts[b].date).getTime() - new Date(posts[a].date).getTime()
  );

  return { posts, categories, recent };
}
