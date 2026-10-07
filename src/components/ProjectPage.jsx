import React, { useMemo } from "react";
import { useStore } from "../store/useStore";
import { PROJECTS } from "../data/content";
import { navigate } from "../lib/utils";
import { linkCls, primaryBtn, outlineBtn } from "../lib/styles";
import { Tag } from "./ui";
import Thumb from "./Thumb";

const Block = ({ title, children }) => (
  <section className="mt-10">
    <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">{title}</h2>
    <div className="mt-3 text-stone-700 dark:text-stone-300">{children}</div>
  </section>
);

const backToProjects = (e) => {
  e.preventDefault();
  navigate("");
  setTimeout(() => document.getElementById("projects")?.scrollIntoView(), 50);
};

export default function ProjectPage({ id }) {
  const saved = useStore((s) => s.projects);
  const all = useMemo(() => [...PROJECTS, ...saved], [saved]);
  const i = all.findIndex((p) => p.id === id);
  const p = all[i];

  if (!p)
    return (
      <div className="py-16">
        <p className="text-stone-600 dark:text-stone-400">This project does not exist or was removed.</p>
        <a href="#" onClick={backToProjects} className={"mt-4 inline-block " + linkCls}>Back to projects</a>
      </div>
    );

  const prev = all[i - 1];
  const next = all[i + 1];
  const paragraphs = (p.overview || p.description).split("\n\n");
  const notes = p.techNotes || [];
  const cardLink = "rounded-lg border border-stone-200 p-4 hover:border-teal-600 dark:border-stone-800 ";

  return (
    <div className="pb-16 pt-8">
      <a href="#" onClick={backToProjects} className={linkCls}>All projects</a>
      <header className="mt-6 max-w-2xl">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          {[p.category, p.status, p.role].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">{p.title}</h1>
        <p className="mt-4 text-lg text-stone-600 dark:text-stone-400">{p.description}</p>
        {(p.link || p.repo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className={primaryBtn}>Visit live site</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className={outlineBtn}>View code</a>}
          </div>
        )}
      </header>

      <Thumb src={p.thumb} alt={"Screenshot of " + p.title} gradient={p.gradient} glyph={p.glyph} className="mt-8 aspect-[2/1] rounded-lg" />

      <div className="max-w-2xl">
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
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[9rem_1fr]">
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

        <nav aria-label="More projects" className="mt-12 grid gap-4 sm:grid-cols-2">
          {prev && (
            <a href={"#/projects/" + prev.id} className={cardLink}>
              <span className="text-sm text-stone-500 dark:text-stone-400">Previous project</span>
              <span className="mt-1 block font-medium text-stone-900 dark:text-stone-50">{prev.title}</span>
            </a>
          )}
          {next && (
            <a href={"#/projects/" + next.id} className={cardLink + "sm:col-start-2"}>
              <span className="text-sm text-stone-500 dark:text-stone-400">Next project</span>
              <span className="mt-1 block font-medium text-stone-900 dark:text-stone-50">{next.title}</span>
            </a>
          )}
        </nav>
      </div>
    </div>
  );
}
