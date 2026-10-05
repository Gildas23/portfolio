import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { formatDate } from "../lib/utils";
import { linkCls } from "../lib/styles";
import { Tag, OwnerActions } from "./ui";

export default function PostItem({ post, canRemove }) {
  const removePost = useStore((s) => s.removePost);
  const [open, setOpen] = useState(false);
  return (
    <article className="border-b border-stone-200 pb-6 last:border-0 dark:border-stone-800">
      <p className="text-sm text-stone-500 dark:text-stone-400">{formatDate(post.date)}</p>
      <h3 className="mt-1 text-lg font-semibold text-stone-900 dark:text-stone-50">{post.title}</h3>
      <p className="mt-2 text-stone-600 dark:text-stone-400">{post.summary}</p>
      {open && (
        <div className="mt-4 max-w-prose space-y-3 text-stone-700 dark:text-stone-300">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button onClick={() => setOpen(!open)} aria-expanded={open} className={linkCls}>
          {open ? "Close post" : "Read post"}
        </button>
        {canRemove && <OwnerActions item={post} onRemove={removePost} />}
      </div>
    </article>
  );
}
