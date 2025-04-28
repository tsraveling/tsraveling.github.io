import Image from "next/image";
import postsData, { getPost, getRecentPosts } from "../lib/PostData";
import Main from "@/components/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "T. S. Raveling",
};

export default function Home() {
  const recentPosts = getRecentPosts(3);

  return (
    <Main>
      <div className="max-w-2xl mx-auto flex flex-col align-middle justify-center prose prose-stone dark:prose-invert">
        <img
          src="/profile.png"
          alt="Tim Raveling"
          className="rounded-full size-96 mx-auto"
        />
        <h1 className="mb-2">Welcome.</h1>
        <p className="text-lg">
          This is the personal site of Tim Raveling. I'm a game designer,
          artist, systems architect, and co-host of the{" "}
          <a href="https://serialudo.libsyn.com/" target="_blank">
            Seria Ludo podcast.
          </a>{" "}
          You can find some of my writing below -- if you like it (or hate it!)
          feel free to reach out to me on{" "}
          <a
            href="https://bsky.app/profile/tsraveling.bsky.social"
            target="_blank"
          >
            Bluesky
          </a>
          .
        </p>
        <h2>Essays and Posts:</h2>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <a href={"/" + post.slug}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </Main>
  );
}
