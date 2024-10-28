import Image from "next/image";
import postsData, { getPost, getRecentPosts } from "../lib/PostData";

export default function Home() {
  const recentPosts = getRecentPosts(3);
  console.log(">>> posts:", recentPosts);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center w-full">
          the future home of tsraveling.com
        </h1>
        <p className="text-lg text-center w-full">
          This site is currently under construction. But the posts we have are:
        </p>
        <h2>Recent posts:</h2>
        <ul>
          {recentPosts.map((post) => (
            <li>
              <a href={"/" + post.slug}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 text-sm text-gray-500">
        Thanks for stopping by
      </footer>
    </div>
  );
}
