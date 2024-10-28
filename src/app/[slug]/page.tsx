import React from "react";
import postsData, { getPost } from "../../lib/PostData";
import ReactMarkdown from "react-markdown";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const thisPost = getPost(slug);
  console.log(">>> post:", thisPost);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center w-full">
          {thisPost?.title}
        </h1>
        <ReactMarkdown>{thisPost?.content}</ReactMarkdown>
      </main>
      <footer className="row-start-3 text-sm text-gray-500">
        Thanks for stopping by
      </footer>
    </div>
  );
}

// Define possible parameter values
export async function generateStaticParams() {
  // This should return an array of all possible slug values
  // For example, if your slugs are blog post IDs:
  return Object.entries(postsData.posts).map(([slug]) => ({ slug }));

  //[{ slug: "first-post" }, { slug: "second-post" }, { slug: "third-post" }];
}
