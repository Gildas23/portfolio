import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import { useAllPosts, skillHref } from "../lib/posts";
import { formatDate, navigate } from "../lib/utils";
import { focus, linkCls } from "../lib/styles";
import { Tag, OwnerActions } from "./ui";
import Thumb from "./Thumb";
import PostBody from "./PostBody";

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Toc({ toc, className = "" }) {
  const [active, setActive] = useState(toc[0]?.id);
  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => {
        const hit = es.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [toc]);
  return (
    <ul className={"space-y-2 text-sm " + className}>
      {toc.map((t) => (
        <li key={t.id}>
          <button
            onClick={() => jump(t.id)}
            aria-current={active === t.id ? "location" : undefined}
            className={"text-left hover:text-teal-700 dark:hover:text-teal-300 " + focus + (active === t.id ? " font-medium text-teal-700 dark:text-teal-300" : " text-stone-500 dark:text-stone-400")}
          >
            {t.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function PostPage({ slug }) {
  const posts = useAllPosts();
  const removePost = useStore((s) => s.removePost);
  const i = posts.findIndex((p) => p.slug === slug);
  const post = posts[i];

  if (!post)
    return (
      <div className="py-16">
        <p className="text-stone-600 dark:text-stone-400">This post does not exist or was removed.</p>
        <a href="#/blog" className={"mt-4 inline-block " + linkCls}>Back to all posts</a>
      </div>
    );

  const newer = posts[i - 1];
  const older = posts[i + 1];
  const hasToc = post.toc?.length > 0;

  return (
    <div className="pb-16 pt-8">
      <a href="#/blog" className={linkCls}>All posts</a>
      <header className="mt-6 max-w-2xl">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {post.category} · {formatDate(post.date)} · {post.readTime} min read
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">{post.title}</h1>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">{post.excerpt}</p>
      </header>
      <Thumb src={post.thumbnail} alt={"Cover image for " + post.title} gradient={post.gradient} glyph={post.glyph} className="mt-8 aspect-[2/1] rounded-lg" />

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_13rem]">
        <article className="min-w-0 max-w-2xl">
          {hasToc && (
            <details className="mb-6 rounded-lg border border-stone-200 p-4 dark:border-stone-800 lg:hidden">
              <summary className={"cursor-pointer text-sm font-medium " + focus}>On this page</summary>
              <Toc toc={post.toc} className="mt-3" />
            </details>
          )}
          <PostBody sections={post.sections} />
          <div className="mt-10 flex flex-wrap items-center gap-1.5 border-t border-stone-200 pt-6 dark:border-stone-800">
            {post.skills.map((s) => (
              <a key={s} href={skillHref(s)} className={"rounded " + focus}><Tag>{s}</Tag></a>
            ))}
            {post.slug.startsWith("u") && (
              <OwnerActions item={post} onRemove={(id) => { removePost(id); navigate("#/blog"); }} />
            )}
          </div>
          <nav aria-label="More posts" className="mt-8 grid gap-4 sm:grid-cols-2">
            {newer && (
              <a href={"#/blog/" + newer.slug} className={"rounded-lg border border-stone-200 p-4 hover:border-teal-600 dark:border-stone-800 " + focus}>
                <span className="text-sm text-stone-500 dark:text-stone-400">Newer post</span>
                <span className="mt-1 block font-medium text-stone-900 dark:text-stone-50">{newer.title}</span>
              </a>
            )}
            {older && (
              <a href={"#/blog/" + older.slug} className={"rounded-lg border border-stone-200 p-4 hover:border-teal-600 dark:border-stone-800 sm:col-start-2 " + focus}>
                <span className="text-sm text-stone-500 dark:text-stone-400">Older post</span>
                <span className="mt-1 block font-medium text-stone-900 dark:text-stone-50">{older.title}</span>
              </a>
            )}
          </nav>
        </article>
        {hasToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <p className="mb-3 text-sm font-medium text-stone-900 dark:text-stone-50">On this page</p>
              <Toc toc={post.toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
