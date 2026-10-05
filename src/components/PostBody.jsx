import React, { useState } from "react";
import { focus } from "../lib/styles";

// Posts may contain <strong>, <em> and <code> in text. Any other "<" is escaped.
const inline = (s) => ({ __html: s.replace(/<(?!\/?(?:strong|em|code)>)/g, "&lt;") });
const inl = "[&_code]:rounded [&_code]:bg-stone-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.9em] dark:[&_code]:bg-stone-800";

function CodeBlock({ content }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      setCopied(false);
    }
  };
  return (
    <div className="relative my-5">
      <pre tabIndex={0} className={"overflow-x-auto rounded-lg bg-stone-900 p-4 pr-20 text-sm leading-relaxed text-stone-100 " + focus}>
        <code>{content}</code>
      </pre>
      <button onClick={copy} className={"absolute right-2 top-2 rounded bg-stone-700 px-2 py-1 text-xs text-stone-100 hover:bg-stone-600 " + focus}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default function PostBody({ sections }) {
  return (
    <div className="text-stone-700 dark:text-stone-300">
      {sections.map((b, i) => {
        switch (b.type) {
          case "heading2":
            return <h2 key={i} id={b.id} className="mt-10 scroll-mt-20 text-xl font-semibold text-stone-900 dark:text-stone-50">{b.content}</h2>;
          case "blockquote":
            return <blockquote key={i} className={"my-5 border-l-2 border-teal-600 pl-4 text-stone-600 dark:border-teal-400 dark:text-stone-400 " + inl} dangerouslySetInnerHTML={inline(b.content)} />;
          case "code":
            return <CodeBlock key={i} content={b.content} />;
          case "orderedList":
          case "unorderedList": {
            const List = b.type === "orderedList" ? "ol" : "ul";
            return (
              <List key={i} className={"my-4 space-y-1.5 pl-6 " + (b.type === "orderedList" ? "list-decimal" : "list-disc") + " " + inl}>
                {b.items.map((it, j) => <li key={j} dangerouslySetInnerHTML={inline(it)} />)}
              </List>
            );
          }
          case "divider":
            return <hr key={i} className="my-8 border-stone-200 dark:border-stone-800" />;
          default:
            return b.content ? <p key={i} className={"my-4 " + inl} dangerouslySetInnerHTML={inline(b.content)} /> : null;
        }
      })}
    </div>
  );
}
