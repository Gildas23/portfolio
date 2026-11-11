import { useState } from "react";
import { quietBtn } from "../lib/styles";

const SHOWN = 4; // achievements visible before "Show more"

function Job({ job }) {
  const [all, setAll] = useState(false);
  const list = all ? job.achievements : job.achievements.slice(0, SHOWN);
  const hidden = job.achievements.length - SHOWN;
  return (
    <li className="relative grid gap-2 pb-12 pl-6 last:pb-0 sm:grid-cols-[10.5rem_1fr] sm:gap-8 sm:pl-0">
      {/* Timeline dot and line (mobile: left edge; desktop: between columns). */}
      <span aria-hidden="true" className="absolute left-0 top-2 h-2 w-2 rounded-full bg-teal-600 sm:left-[calc(10.5rem+1rem-3px)] dark:bg-teal-400" />
      <span aria-hidden="true" className="absolute bottom-0 left-[3px] top-5 w-px bg-stone-200 sm:left-[calc(10.5rem+1rem)] dark:bg-stone-800" />

      <p className="whitespace-nowrap text-sm tabular-nums text-stone-500 sm:pt-0.5 sm:text-right dark:text-stone-400">{job.dates}</p>
      <div className="sm:pl-4">
        <h3 className="text-lg font-semibold leading-snug text-stone-900 dark:text-stone-50">{job.role}</h3>
        <p className="text-teal-700 dark:text-teal-300">{job.org}</p>
        {job.points?.length > 0 && (
          <p className="mt-3 max-w-prose text-stone-600 dark:text-stone-400">{job.points.join(" ")}</p>
        )}
        {list.length > 0 && (
          <ul className="mt-4 max-w-prose space-y-3">
            {list.map((a) => (
              <li key={a.text} className="text-stone-700 dark:text-stone-300">
                <span className="mr-2 text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">{a.area}</span>
                {a.text}
              </li>
            ))}
          </ul>
        )}
        {hidden > 0 && (
          <button onClick={() => setAll(!all)} aria-expanded={all} className={"mt-4 " + quietBtn}>
            {all ? "Show less" : "Show " + hidden + " more"}
          </button>
        )}
      </div>
    </li>
  );
}

export default function ExperienceList({ jobs }) {
  return (
    <ol>
      {jobs.map((job) => (
        <Job key={job.org + job.dates} job={job} />
      ))}
    </ol>
  );
}
