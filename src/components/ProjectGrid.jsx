import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { focus } from "../lib/styles";
import { OwnerActions } from "./ui";
import Thumb from "./Thumb";

// Which filter a project belongs to. A project can appear under more than one.
const CLOUD = ["Kubernetes", "Docker", "Proxmox", "AWS", "Linux", "CI/CD"];
const groupsOf = (p) => {
  const g = new Set();
  const cat = (p.category || "").toLowerCase();
  const stack = p.stack || [];
  if (cat.includes("ai")) g.add("AI");
  if (cat.includes("embedded")) g.add("Embedded");
  if (cat.includes("infrastructure") || cat === "automation" || stack.some((s) => CLOUD.some((c) => s.includes(c)))) g.add("Cloud & DevOps");
  if (!cat.includes("embedded") && !cat.includes("infrastructure") && !cat.includes("ai")) g.add("Full-stack");
  return g;
};

const FILTERS = ["All", "Full-stack", "Cloud & DevOps", "AI", "Embedded"];
const SHOWN = 6;

export default function ProjectGrid({ projects, onRemove }) {
  const [filter, setFilter] = useState("All");
  const [all, setAll] = useState(false);

  const counts = useMemo(() => {
    const c = { All: projects.length };
    for (const f of FILTERS.slice(1)) c[f] = projects.filter((p) => groupsOf(p).has(f)).length;
    return c;
  }, [projects]);

  const list = filter === "All" ? projects : projects.filter((p) => groupsOf(p).has(filter));
  const visible = all ? list : list.slice(0, SHOWN);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="mb-6 flex flex-wrap gap-2">
        {FILTERS.filter((f) => counts[f] > 0).map((f) => {
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setFilter(f);
                setAll(false);
              }}
              className={
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors " +
                (on
                  ? "border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900"
                  : "border-stone-300 bg-white text-stone-700 hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-stone-500") +
                " " +
                focus
              }
            >
              {f}
              <span className={"ml-1.5 font-mono text-xs " + (on ? "opacity-70" : "text-stone-400")}>{counts[f]}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li
            key={p.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-teal-600 hover:shadow-lg hover:shadow-stone-900/5 focus-within:border-teal-600 motion-reduce:transform-none dark:border-stone-800 dark:bg-stone-900 dark:hover:border-teal-400 dark:hover:shadow-black/30"
          >
            <Thumb
              src={p.thumb}
              gradient={p.gradient}
              glyph={p.glyph}
              className="aspect-[16/10] border-b border-stone-200 text-3xl transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none dark:border-stone-800"
            />
            <div className="relative flex flex-1 flex-col bg-white p-4 dark:bg-stone-900">
              <p className="truncate font-mono text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400">{p.category}</p>
              <h3 className="mt-1 flex items-start justify-between gap-2 font-semibold leading-snug text-stone-900 group-hover:text-teal-700 dark:text-stone-50 dark:group-hover:text-teal-300">
                <a href={"#/projects/" + p.id} className={"after:absolute after:inset-0 " + focus}>
                  {p.title}
                </a>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600" />
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{p.description}</p>
              {p.stack?.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-1">
                  {p.stack.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[10.5px] text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                      {t}
                    </span>
                  ))}
                </p>
              )}
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className={"relative z-10 text-sm font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-300 " + focus}
                  >
                    Live site
                  </a>
                )}
                {onRemove && p.id.startsWith("u") && (
                  <span className="relative z-10 ml-auto flex gap-3">
                    <OwnerActions item={p} onRemove={onRemove} strip={(x) => ({ ...x, thumb: x.thumb?.startsWith("data:") ? "" : x.thumb })} />
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {list.length > SHOWN && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setAll(!all)}
            aria-expanded={all}
            className={"rounded-full border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900 " + focus}
          >
            {all ? "Show fewer" : "Show all " + list.length + " projects"}
          </button>
        </div>
      )}
    </div>
  );
}
