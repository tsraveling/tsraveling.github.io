"use client";

import { createContext, useContext } from "react";
import { PostsData } from "@/types/posts";

const PostsContext = createContext<PostsData | null>(null);

export function PostsProvider({
  value,
  children,
}: {
  value: PostsData;
  children: React.ReactNode;
}) {
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
