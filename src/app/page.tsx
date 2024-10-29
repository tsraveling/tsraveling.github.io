import Image from "next/image";
import postsData, { getPost, getRecentPosts } from "../lib/PostData";
import Main from "@/components/Main";

export default function Home() {
  const recentPosts = getRecentPosts(3);
  console.log(">>> posts:", recentPosts);

  return (
    <Main>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <h1 className="text-4xl font-bold text-center w-full">
          the future home of tsraveling.com
        </h1>
        <p className="text-lg text-center w-full">
          This site is currently under construction. But the posts we have are:
        </p>
        <h2>Recent posts:</h2>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <a href={"/" + post.slug}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 text-sm text-gray-500">
        Thanks for stopping by
      </footer>
    </Main>
  );
}
