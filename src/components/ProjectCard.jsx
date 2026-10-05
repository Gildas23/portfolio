import React, { useState } from "react";
import { focus, GRADIENTS } from "../lib/styles";
import { Tag, LinkOut, OwnerActions } from "./ui";

function Thumb({ project }) {
  const [broken, setBroken] = useState(false);
  const inner =
    project.thumb && !broken ? (
      <img
        src={project.thumb}
        alt={"Preview of " + project.title}
        loading="lazy"
        onError={() => setBroken(true)}
        className="aspect-video w-full bg-stone-100 object-cover dark:bg-stone-800"
      />
    ) : (
      <div
        aria-hidden="true"
        className={"flex aspect-video w-full items-center justify-center bg-gradient-to-br text-5xl text-white/80 " + (GRADIENTS[project.gradient] || GRADIENTS.g1)}
      >
        {project.glyph || "◈"}
      </div>
    );
  return project.link ? (
    <a href={project.link} target="_blank" rel="noreferrer" aria-label={"Open " + project.title} className={"block " + focus}>
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function ProjectCard({ project, onRemove, canRemove, full }) {
  return (
    <article className={"flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 " + (full ? "w-full" : "w-72 shrink-0 snap-start")}>
      <Thumb project={project} />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-stone-500 dark:text-stone-400">{project.category}</p>
        <h3 className="font-semibold text-stone-900 dark:text-stone-50">{project.title}</h3>
        <p className={"mt-2 flex-1 text-sm text-stone-600 dark:text-stone-400 " + (full ? "" : "line-clamp-4")}>{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        {(project.link || canRemove) && (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <LinkOut href={project.link}>View project</LinkOut>
            {canRemove && <OwnerActions item={project} onRemove={onRemove} strip={(p) => ({ ...p, thumb: p.thumb.startsWith("data:") ? "" : p.thumb })} />}
          </div>
        )}
      </div>
    </article>
  );
}
