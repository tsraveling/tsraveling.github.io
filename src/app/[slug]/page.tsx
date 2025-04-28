import Main from "@/components/Main";
import Nav from "@/components/Nav";
import Page from "@/components/Page";
import React, { ClassAttributes, HTMLAttributes, ReactElement } from "react";
import ReactMarkdown, { Components, ExtraProps } from "react-markdown";
import postsData, { getPost } from "../../lib/PostData";

interface ErrorBlockProps {
  type: string;
  children: React.ReactNode;
}

const ErrorBlock = ({ type, children }: ErrorBlockProps) => (
  <div className="bg-red-500">
    <em>Invalid {type} code for content:</em>
    <code>{JSON.stringify(children)}</code>
  </div>
);

export type PostProps = {
  params: Promise<{ slug: string }>;
};

export default async function Post({ params }: PostProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const thisPost = getPost(slug);

  // TODO: redirect to 404
  if (!thisPost) {
    return <div>Post not found</div>;
  }

  type CodeProps = ClassAttributes<HTMLElement> &
    HTMLAttributes<HTMLElement> &
    ExtraProps;

  const components: Partial<Components> = {
    pre: ({ children }: CodeProps) => {
      const { className, children: codeString } =
        (children as ReactElement)?.props ?? {};
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      // Check for custom inserts using the ```{code} format
      switch (language) {
        case "project":
          const projectCode = codeString as string;
          return projectCode ? (
            <iframe
              className="aspect-video w-full m-0 rounded-md shadow-inner mt-4"
              src={`https://tsraveling.github.io/${projectCode}`}
            />
          ) : (
            <ErrorBlock type="project">{children}</ErrorBlock>
          );
        case "youtube":
          const videoCode = codeString as string;
          return videoCode ? (
            <iframe
              className="aspect-video w-full m-0 rounded-md shadow-inner mt-4"
              src={"https://www.youtube.com/embed/" + videoCode}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              data-referrerpolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <ErrorBlock type="YouTube video">{children}</ErrorBlock>
          );
      }

      return <pre>{children}</pre>;
    },
  };

  const postDate = new Date(thisPost.date);

  return (
    <Main>
      <Page className="pt-11 md:pt-0" title={thisPost.title} date={postDate}>
        <ReactMarkdown components={components}>
          {thisPost?.content}
        </ReactMarkdown>
      </Page>
      <Nav />
    </Main>
  );
}

// Define possible parameter values
export async function generateStaticParams() {
  // This should return an array of all possible slug values
  // For example, if your slugs are blog post IDs:
  return Object.entries(postsData.posts).map(([slug]) => ({ slug }));
}

// App Router - Dynamic metadata
export async function generateMetadata({ params }: PostProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const thisPost = getPost(slug);
  return {
    title: thisPost?.title || "404",
    authors: [{ name: "Tim Raveling", url: "https://tsraveling.github.io" }],
  };
}
