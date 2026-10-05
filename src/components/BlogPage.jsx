import React, { useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import { useAllPosts, skillHref } from "../lib/posts";
import { focus, linkCls, outlineBtn } from "../lib/styles";
import { navigate } from "../lib/utils";
import { Section } from "./ui";
import PostCard from "./PostCard";
import AddPostForm from "./AddPostForm";

export default function BlogPage() {
  const skill = useStore((s) => s.skill);
  const saveError = useStore((s) => s.saveError);
  const posts = useAllPosts();
  const [writing, setWriting] = useState(false);

  const skills = useMemo(() => {
    const n = {};
    posts.forEach((p) => p.skills.forEach((s) => (n[s] = (n[s] || 0) + 1)));
    return Object.entries(n).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
    );
  }, [posts]);

  const shown = skill ? posts.filter((p) => p.skills.includes(skill)) : posts;
  const lead = !skill && shown.find((p) => p.featured);
  const rest = lead ? shown.filter((p) => p !== lead) : shown;
  const chip = (on) =>
    "rounded-full border px-3 py-1 text-sm " +
    focus +
    (on
      ? " border-teal-700 bg-teal-700 text-white dark:border-teal-500 dark:bg-teal-600"
      : " border-stone-300 hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900");

  return (
    <div className="pt-8">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("");
        }}
        className={linkCls}
      >
        Back to portfolio
      </a>
      <Section id="blog" title="Blog">
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter posts by skill"
        >
          <a
            href={skillHref(null)}
            aria-current={!skill ? "true" : undefined}
            className={chip(!skill)}
          >
            All ({posts.length})
          </a>
          {skills.map(([s, n]) => (
            <a
              key={s}
              href={skillHref(s)}
              aria-current={skill === s ? "true" : undefined}
              className={chip(skill === s)}
            >
              {s} ({n})
            </a>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="text-stone-600 dark:text-stone-400">
            No posts cover {skill} yet.{" "}
            <a
              href={skillHref(null)}
              className={linkCls.replace("text-sm ", "")}
            >
              Show all posts
            </a>
            .
          </p>
        ) : (
          <div className="space-y-5">
            {lead && <PostCard post={lead} featured />}
            <div className="grid gap-5 sm:grid-cols-2">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}

        {saveError && (
          <p
            role="alert"
            className="mt-4 text-sm text-red-600 dark:text-red-400"
          >
            This browser could not save your changes, so they will disappear
            when you leave the page.
          </p>
        )}
        {writing ? (
          <AddPostForm onCancel={() => setWriting(false)} />
        ) : (
          false && (
            <button
              onClick={() => setWriting(true)}
              className={"mt-8 " + outlineBtn}
            >
              Write a post
            </button>
          )
        )}
      </Section>
    </div>
  );
}
