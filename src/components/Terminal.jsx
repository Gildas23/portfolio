import { useEffect, useState } from "react";

// A small terminal window that types out a few commands and their output, then loops.
// Each script entry is { cmd, out: [lines] }. Visitors who prefer reduced motion see it fully typed.
const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Terminal({ script, title = "gildas@ottawa: ~" }) {
  const still = reduceMotion();
  // step = index of the command being typed; chars = how much of it is typed; shown = output visible.
  const [state, setState] = useState(
    still ? { step: script.length, chars: 0, shown: true } : { step: 0, chars: 0, shown: false },
  );

  useEffect(() => {
    if (still) return;
    const { step, chars, shown } = state;
    let t;
    if (step >= script.length) {
      t = setTimeout(() => setState({ step: 0, chars: 0, shown: false }), 4000);
    } else if (chars < script[step].cmd.length) {
      t = setTimeout(() => setState({ step, chars: chars + 1, shown: false }), 45 + Math.random() * 45);
    } else if (!shown) {
      t = setTimeout(() => setState({ step, chars, shown: true }), 350);
    } else {
      t = setTimeout(() => setState({ step: step + 1, chars: 0, shown: false }), 1100);
    }
    return () => clearTimeout(t);
  }, [state, still, script]);

  const done = script.slice(0, state.step);
  const current = state.step < script.length ? script[state.step] : null;

  return (
    <figure
      className="overflow-hidden rounded-xl border border-stone-800 bg-stone-950 text-left shadow-xl shadow-stone-900/10 dark:border-stone-700 dark:shadow-black/40"
      aria-label="Terminal showing a few of the commands I use day to day"
    >
      <div className="flex items-center gap-1.5 border-b border-stone-800 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 truncate font-mono text-[11px] text-stone-500">{title}</span>
      </div>
      <pre className="h-56 overflow-hidden px-3 py-3 font-mono text-[11.5px] leading-relaxed text-stone-300">
        {done.map((s, i) => (
          <Block key={i} cmd={s.cmd} out={s.out} />
        ))}
        {current && (
          <Block cmd={current.cmd.slice(0, state.chars)} out={state.shown ? current.out : []} typing={!state.shown} />
        )}
        {!current && (
          <span>
            <span className="text-teal-400">$</span> <span className="caret">▋</span>
          </span>
        )}
      </pre>
    </figure>
  );
}

function Block({ cmd, out, typing }) {
  return (
    <>
      <span>
        <span className="text-teal-400">$</span> <span className="text-stone-100">{cmd}</span>
        {typing && <span className="caret">▋</span>}
      </span>
      {"\n"}
      {out.map((line, i) => (
        <span key={i} className={line.startsWith("✓") ? "text-emerald-400" : "text-stone-400"}>
          {line}
          {"\n"}
        </span>
      ))}
    </>
  );
}
