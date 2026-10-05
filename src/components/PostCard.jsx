import React from "react";
import { focus } from "../lib/styles";
import { formatDate } from "../lib/utils";
import { skillHref } from "../lib/posts";
import { Tag } from "./ui";
import Thumb from "./Thumb";

export default function PostCard({ post, featured }) {
  return (
    <article className={"group overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 " + (featured ? "md:grid md:grid-cols-2" : "")}>
      <a href={"#/blog/" + post.slug} tabIndex={-1} aria-hidden="true" className="block">
        <Thumb src={post.thumbnail} gradient={post.gradient} glyph={post.glyph} className={featured ? "aspect-video md:h-full" : "aspect-video"} />
      </a>
      <div className="flex flex-col p-5">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {post.category} · {formatDate(post.date)} · {post.readTime} min read
        </p>
        <h3 className={"mt-1 font-semibold text-stone-900 dark:text-stone-50 " + (featured ? "text-xl" : "text-lg")}>
          <a href={"#/blog/" + post.slug} className={"hover:text-teal-700 dark:hover:text-teal-300 " + focus}>{post.title}</a>
        </h3>
        <p className="mt-2 flex-1 text-sm text-stone-600 dark:text-stone-400">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.skills.map((s) => (
            <a key={s} href={skillHref(s)} className={"rounded " + focus}><Tag>{s}</Tag></a>
          ))}
        </div>
      </div>
    </article>
  );
}
