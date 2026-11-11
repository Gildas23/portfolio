import { ArrowUpRight } from "lucide-react";
import { focus } from "../lib/styles";
import { LinkOut, OwnerActions } from "./ui";
import Thumb from "./Thumb";

// A quiet, scannable list of projects. Each row opens the project's detail page
// (the title link is stretched over the row); "Live site" and owner buttons sit above it.
export default function ProjectList({ projects, thumbs = true, onRemove }) {
  return (
    <ul className="divide-y divide-stone-200 border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
      {projects.map((p) => (
        <li key={p.id} className="group relative flex items-start gap-5 py-5 transition-colors">
          {thumbs && (
            <Thumb
              src={p.thumb}
              gradient={p.gradient}
              glyph={p.glyph}
              className="hidden aspect-[4/3] !w-28 shrink-0 rounded-md border border-stone-200 text-2xl opacity-90 transition-opacity group-hover:opacity-100 sm:block dark:border-stone-800"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h3 className="font-semibold text-stone-900 group-hover:text-teal-700 dark:text-stone-50 dark:group-hover:text-teal-300">
                <a href={"#/projects/" + p.id} className={"after:absolute after:inset-0 " + focus}>
                  {p.title}
                </a>
              </h3>
              <span className="text-sm text-stone-500 dark:text-stone-400">{p.category}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-stone-600 dark:text-stone-400">{p.description}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-500">
              {p.stack?.length > 0 && <span>{p.stack.join(" · ")}</span>}
              {p.metric && <span>{p.metric}</span>}
              {p.link && (
                <span className="relative z-10">
                  <LinkOut href={p.link}>Live site</LinkOut>
                </span>
              )}
              {onRemove && p.id.startsWith("u") && (
                <span className="relative z-10 flex gap-4">
                  <OwnerActions
                    item={p}
                    onRemove={onRemove}
                    strip={(x) => ({ ...x, thumb: x.thumb?.startsWith("data:") ? "" : x.thumb })}
                  />
                </span>
              )}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-700 dark:group-hover:text-teal-300"
          />
        </li>
      ))}
    </ul>
  );
}
