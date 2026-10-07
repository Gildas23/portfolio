import React from "react";
import { focus } from "../lib/styles";
import { Tag, LinkOut, OwnerActions } from "./ui";
import Thumb from "./Thumb";

// The whole card opens the project's detail page (the title link is stretched over the card).
// "Live site" and the owner buttons sit above it with z-10 so they still work on their own.
export default function ProjectCard({ project, onRemove, canRemove, full }) {
  return (
    <article className={"group relative flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-stone-400 focus-within:border-teal-600 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600 " + (full ? "w-full" : "w-72 shrink-0 snap-start")}>
      <Thumb src={project.thumb} gradient={project.gradient} glyph={project.glyph} className="aspect-video" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-stone-500 dark:text-stone-400">{project.category}</p>
        <h3 className="font-semibold text-stone-900 group-hover:text-teal-700 dark:text-stone-50 dark:group-hover:text-teal-300">
          <a href={"#/projects/" + project.id} className={"after:absolute after:inset-0 " + focus}>{project.title}</a>
        </h3>
        <p className={"mt-2 flex-1 text-sm text-stone-600 dark:text-stone-400 " + (full ? "" : "line-clamp-4")}>{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {/* Same destination as the title link above; shown so the card clearly reads as clickable. */}
          <span aria-hidden="true" className="text-sm font-medium text-teal-700 underline-offset-4 group-hover:underline dark:text-teal-300">View details</span>
          {project.link && <span className="relative z-10"><LinkOut href={project.link}>Live site</LinkOut></span>}
          {canRemove && (
            <div className="relative z-10 ml-auto flex gap-4">
              <OwnerActions item={project} onRemove={onRemove} strip={(p) => ({ ...p, thumb: p.thumb.startsWith("data:") ? "" : p.thumb })} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
