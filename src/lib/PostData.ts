import postsJson from "../generated/posts.json";
import { Post, PostsData, PostFrontmatter } from "../types/posts"; // adjust import path as needed

// Helper function to ensure type safety when loading the JSON data
function validatePost(post: any): Post {
  // Basic validation to ensure the post has all required fields
  if (
    !post.slug ||
    !post.title ||
    !post.category ||
    !post.date ||
    !post.content ||
    !Array.isArray(post.mentions) ||
    !Array.isArray(post.mentionedBy) ||
    typeof post.wordCount !== "number" ||
    typeof post.readingTime !== "number" ||
    !post.excerpt
  ) {
    throw new Error(`Invalid post data for ${post.slug || "unknown post"}`);
  }

  // Ensure category is one of the allowed values
  if (!["games", "politics", "systems"].includes(post.category)) {
    throw new Error(`Invalid category ${post.category} for post ${post.slug}`);
  }

  return {
    slug: post.slug,
    title: post.title,
    category: post.category as PostFrontmatter["category"],
    date: post.date,
    content: post.content,
    mentions: post.mentions,
    mentionedBy: post.mentionedBy,
    wordCount: post.wordCount,
    readingTime: post.readingTime,
    excerpt: post.excerpt,
  };
}

// Load and validate the data
const rawData = postsJson as any;
const posts: Record<string, Post> = {};

// Validate each post
Object.entries(rawData.posts).forEach(([slug, post]) => {
  posts[slug] = validatePost(post as any);
});

// Create a sorted array of recent posts
const recent = Object.values(posts)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((post) => post.slug);

// Create the final data object
export const postsData: PostsData = {
  posts,
  categories: rawData.categories,
  recent,
};

// Helper functions
export function getPost(slug: string): Post | undefined {
  return postsData.posts[slug];
}

export function getPostsByCategory(
  category: PostFrontmatter["category"]
): Post[] {
  return (
    postsData.categories[category]?.map((slug) => postsData.posts[slug]) ?? []
  );
}

export function getRecentPosts(count?: number): Post[] {
  const slugs = count ? recent.slice(0, count) : recent;
  return slugs.map((slug) => posts[slug]);
}

export function getRelatedPosts(post: Post, count: number = 3): Post[] {
  // Get posts from the same category, excluding the current post
  const categoryPosts = getPostsByCategory(post.category).filter(
    (p) => p.slug !== post.slug
  );

  // Sort by the number of shared mentions
  return categoryPosts
    .sort((a, b) => {
      const aShared = a.mentions.filter((m) =>
        post.mentions.includes(m)
      ).length;
      const bShared = b.mentions.filter((m) =>
        post.mentions.includes(m)
      ).length;
      return bShared - aShared;
    })
    .slice(0, count);
}

// Export a default object with all the functions
export default {
  ...postsData,
  getPost,
  getPostsByCategory,
  getRecentPosts,
  getRelatedPosts,
};
