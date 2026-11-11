import { focus } from "../lib/styles";
import { LinkOut } from "./ui";
import Thumb from "./Thumb";

// A large project card for the strongest work. "lead" lays the card out side by side on wide screens.
// The whole card opens the project page (stretched title link); "Live site" sits above it with z-10.
export default function FeaturedProject({ project: p, lead }) {
  const live = p.status === "Live product";
  return (
    <article
      className={
        "group relative overflow-hidden rounded-xl border border-stone-200 bg-white transition-colors hover:border-teal-600 focus-within:border-teal-600 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-teal-400 " +
        (lead ? "md:grid md:grid-cols-[3fr_2fr]" : "flex flex-col")
      }
    >
      <Thumb
        src={p.thumb}
        video={p.video}
        gradient={p.gradient}
        glyph={p.glyph}
        className={"aspect-[2/1] border-stone-200 dark:border-stone-800 " + (lead ? "md:h-full md:border-r" : "border-b")}
      />
      <div className={"flex flex-1 flex-col " + (lead ? "p-6 md:p-8" : "p-6")}>
        {(live || p.metric) && (
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            {live && (
              <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Live
              </span>
            )}
            {p.metric && <span className="text-stone-600 dark:text-stone-400">{p.metric}</span>}
          </p>
        )}
        <h3
          className={
            "mt-3 font-bold tracking-tight text-stone-900 group-hover:text-teal-700 dark:text-stone-50 dark:group-hover:text-teal-300 " +
            (lead ? "text-3xl" : "text-2xl")
          }
        >
          <a href={"#/projects/" + p.id} className={"after:absolute after:inset-0 " + focus}>
            {p.title}
          </a>
        </h3>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{p.category}</p>
        <p className="mt-4 text-stone-600 dark:text-stone-400">{p.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
          <span aria-hidden="true" className="text-sm font-medium text-teal-700 underline-offset-4 group-hover:underline dark:text-teal-300">
            View project
          </span>
          {p.link && (
            <span className="relative z-10">
              <LinkOut href={p.link}>Visit live site</LinkOut>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
