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
    let { data, content } = matter(fileContents);
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

  return posts;
}

function generateStatus(posts) {
  const mapFile = path.join(process.cwd(), "src/generated/map.excalidraw.json");
  const mapData = JSON.parse(fs.readFileSync(mapFile, "utf8"));

  // Collect all local links from map ellipses
  const mappedSlugs = new Set();
  for (const el of mapData.elements) {
    if (el.isDeleted || el.type !== "ellipse" || !el.link) continue;
    // Local links look like /slug
    const match = el.link.match(/^\/([a-z0-9_-]+)$/i);
    if (match) mappedSlugs.add(match[1]);
  }

  const mapped = [];
  const unmapped = [];

  for (const slug of Object.keys(posts).sort()) {
    const title = posts[slug].title || slug;
    if (mappedSlugs.has(slug)) {
      mapped.push(`- [x] ${title}: [/${slug}]`);
    } else {
      unmapped.push(`- [ ] ${title}: [/${slug}]`);
    }
  }

  const lines = [
    "# MAPPED:",
    "",
    ...(mapped.length ? mapped : ["(none)"]),
    "",
    "# UNMAPPED:",
    "",
    ...(unmapped.length ? unmapped : ["(none)"]),
    "",
  ];

  const outputFile = path.join(process.cwd(), "src/generated/STATUS.md");
  fs.writeFileSync(outputFile, lines.join("\n"));
}

const posts = generatePosts();
generateStatus(posts);
