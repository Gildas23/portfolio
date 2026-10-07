import React, { useEffect, useMemo, useRef } from "react";
import { useStore } from "../store/useStore";
import { PROJECTS } from "../data/content";
import { focus, primaryBtn, outlineBtn } from "../lib/styles";
import { Tag } from "./ui";
import Thumb from "./Thumb";

const Block = ({ title, children }) => (
  <section className="mt-8">
    <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">{title}</h3>
    <div className="mt-2 text-stone-700 dark:text-stone-300">{children}</div>
  </section>
);

// Native <dialog>: the browser handles focus trapping, Escape to close, and focus return.
export default function ProjectModal() {
  const id = useStore((s) => s.openProject);
  const setOpen = useStore((s) => s.setOpenProject);
  const saved = useStore((s) => s.projects);
  const all = useMemo(() => [...PROJECTS, ...saved], [saved]);
  const i = all.findIndex((p) => p.id === id);
  const p = all[i];
  const ref = useRef(null);

  useEffect(() => {
    if (!p) return;
    const el = ref.current;
    if (el && !el.open) el.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [!!p]);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [id]);

  if (!p) return null;
  const prev = all[i - 1];
  const next = all[i + 1];
  const notes = p.techNotes || [];
  const paragraphs = (p.overview || p.description).split("\n\n");
  const nav = "rounded-lg border border-stone-200 p-4 text-left hover:border-teal-600 dark:border-stone-800 " + focus;

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-title"
      onClose={() => setOpen(null)}
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
      className="m-auto max-h-[88vh] w-[min(92vw,42rem)] overflow-y-auto overscroll-contain rounded-xl border border-stone-200 bg-white p-0 text-stone-800 shadow-xl backdrop:bg-black/50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
    >
      <div className="sticky top-0 z-10 flex h-0 justify-end">
        <button
          onClick={() => ref.current.close()}
          aria-label="Close"
          className={"mr-3 mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl leading-none text-stone-800 hover:bg-white dark:bg-stone-900/90 dark:text-stone-100 " + focus}
        >
          &times;
        </button>
      </div>
      <Thumb src={p.thumb} alt={"Screenshot of " + p.title} gradient={p.gradient} glyph={p.glyph} className="aspect-[2/1]" />
      <div className="p-6 sm:p-8">
        <p className="text-sm text-stone-500 dark:text-stone-400">{[p.category, p.status, p.role].filter(Boolean).join(" · ")}</p>
        <h2 id="project-title" className="mt-1 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{p.title}</h2>
        <p className="mt-3 text-stone-600 dark:text-stone-400">{p.description}</p>
        {(p.link || p.repo) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className={primaryBtn}>Visit live site</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className={outlineBtn}>View code</a>}
          </div>
        )}

        <Block title="Overview">
          <div className="space-y-3">{paragraphs.map((t, k) => <p key={k}>{t}</p>)}</div>
        </Block>
        {p.highlights?.length > 0 && (
          <Block title="What it does">
            <ul className="list-disc space-y-1.5 pl-5">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </Block>
        )}
        {(notes.length > 0 || p.stack.length > 0) && (
          <Block title="Tech stack">
            {notes.length > 0 ? (
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[8rem_1fr]">
                {notes.map(([name, note]) => (
                  <React.Fragment key={name}>
                    <dt className="font-medium text-stone-900 dark:text-stone-50">{name}</dt>
                    <dd className="text-stone-600 dark:text-stone-400">{note}</dd>
                  </React.Fragment>
                ))}
              </dl>
            ) : (
              <div className="flex flex-wrap gap-1.5">{p.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            )}
          </Block>
        )}
        {p.why && <Block title="Why it matters"><p>{p.why}</p></Block>}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {prev && (
            <button onClick={() => setOpen(prev.id)} className={nav}>
              <span className="block text-sm text-stone-500 dark:text-stone-400">Previous project</span>
              <span className="mt-1 block font-medium text-stone-900 dark:text-stone-50">{prev.title}</span>
            </button>
          )}
          {next && (
            <button onClick={() => setOpen(next.id)} className={nav + " sm:col-start-2"}>
              <span className="block text-sm text-stone-500 dark:text-stone-400">Next project</span>
              <span className="mt-1 block font-medium text-stone-900 dark:text-stone-50">{next.title}</span>
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}
