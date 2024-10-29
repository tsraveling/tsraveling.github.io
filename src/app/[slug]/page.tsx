import React from "react";
import postsData, { getPost } from "../../lib/PostData";
import ReactMarkdown from "react-markdown";
import Nav from "@/components/Nav";
import Page from "@/components/Page";
import Main from "@/components/Main";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const thisPost = getPost(slug);

  // TODO: redirect to 404
  if (!thisPost) {
    return <div>Post not found</div>;
  }

  console.log(">>> post:", thisPost);
  const postDate = new Date(thisPost.date);

  return (
    <Main>
      <Nav />
      <Page title={thisPost.title} date={postDate}>
        <ReactMarkdown>{thisPost?.content}</ReactMarkdown>
      </Page>
    </Main>
  );
}

// Define possible parameter values
export async function generateStaticParams() {
  // This should return an array of all possible slug values
  // For example, if your slugs are blog post IDs:
  return Object.entries(postsData.posts).map(([slug]) => ({ slug }));
}
