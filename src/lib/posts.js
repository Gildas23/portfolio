import { useMemo } from "react";
import { useStore } from "../store/useStore";
import { POSTS } from "../data/posts";

// Posts from posts.json plus any the visitor wrote in this browser, newest first.
export function useAllPosts() {
  const saved = useStore((s) => s.posts);
  return useMemo(() => [...POSTS, ...saved].sort((a, b) => (a.date < b.date ? 1 : -1)), [saved]);
}

export const skillHref = (skill) => "#/blog" + (skill ? "?skill=" + encodeURIComponent(skill) : "");
