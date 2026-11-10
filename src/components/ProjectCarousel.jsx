import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { focus } from "../lib/styles";
import { LinkOut, OwnerActions } from "./ui";
import Thumb from "./Thumb";

// Small project cards in a horizontal row, moved with the left/right buttons
// (or by swiping / trackpad scrolling). Each card opens the project's detail page.
export default function ProjectCarousel({ projects, onRemove, label = "Projects" }) {
  const track = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = () => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const sync = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [projects.length]);

  const move = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition hover:border-teal-600 hover:text-teal-700 disabled:pointer-events-none disabled:opacity-30 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-teal-400 dark:hover:text-teal-300 " +
    focus;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous projects" className={arrow}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next projects" className={arrow}>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <ul
        ref={track}
        onScroll={update}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <li
            key={p.id}
            className="group relative flex w-60 shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-teal-600 focus-within:border-teal-600 sm:w-64 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-teal-400"
          >
            <Thumb src={p.thumb} gradient={p.gradient} glyph={p.glyph} className="aspect-[16/10] border-b border-stone-200 text-3xl dark:border-stone-800" />
            <div className="flex flex-1 flex-col p-4">
              <p className="truncate text-xs text-stone-500 dark:text-stone-400">{p.category}</p>
              <h3 className="mt-0.5 font-semibold leading-snug text-stone-900 group-hover:text-teal-700 dark:text-stone-50 dark:group-hover:text-teal-300">
                <a href={"#/projects/" + p.id} className={"after:absolute after:inset-0 " + focus}>
                  {p.title}
                </a>
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{p.description}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                {p.link && (
                  <span className="relative z-10">
                    <LinkOut href={p.link}>Live site</LinkOut>
                  </span>
                )}
                {onRemove && p.id.startsWith("u") && (
                  <span className="relative z-10 ml-auto flex gap-3">
                    <OwnerActions
                      item={p}
                      onRemove={onRemove}
                      strip={(x) => ({ ...x, thumb: x.thumb?.startsWith("data:") ? "" : x.thumb })}
                    />
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
