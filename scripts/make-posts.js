const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function generateExcerpt(content, length = 160) {
  const cleanContent = content
    .replace(/\[\[(.*?)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*`]/g, "");

  return cleanContent.slice(0, length).trim() + "...";
}

function extractMentions(content) {
  const mentionRegex = /\[\[(.*?)\]\]/g;
  const matches = [...content.matchAll(mentionRegex)];
  return matches.map((match) => match[1]);
}

function generatePosts() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const outputFile = path.join(process.cwd(), "src/generated/posts.json");
  const posts = {};
  const categories = {};

  // Create posts object
  const filenames = fs.readdirSync(postsDirectory);
  filenames.forEach((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data;

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

    // Initialize category array if it doesn't exist
    if (!categories[frontmatter.category]) {
      categories[frontmatter.category] = [];
    }
    categories[frontmatter.category].push(slug);
  });

  // Process mentions
  Object.entries(posts).forEach(([slug, post]) => {
    post.mentions.forEach((mentionedSlug) => {
      if (posts[mentionedSlug]) {
        posts[mentionedSlug].mentionedBy.push(slug);
      }
    });
  });

  // Ensure directory exists
  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the generated data
  fs.writeFileSync(outputFile, JSON.stringify({ posts, categories }, null, 2));
}

generatePosts();
