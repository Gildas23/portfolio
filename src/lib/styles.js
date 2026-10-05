export const focus = "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-teal-400 dark:focus-visible:ring-offset-stone-950";
export const linkCls = "text-sm font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-300 " + focus;
export const quietBtn = "text-sm text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-100 " + focus;
export const field = "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50 " + focus;
export const primaryBtn = "rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 " + focus;
export const outlineBtn = "rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900 " + focus;

// Fallback thumbnail backgrounds, keyed by a project's "gradient" value.
export const GRADIENTS = {
  g1: "from-teal-500 to-teal-700",
  g2: "from-sky-500 to-indigo-600",
  g3: "from-emerald-500 to-teal-700",
  g4: "from-amber-500 to-orange-600",
  g5: "from-slate-500 to-slate-700",
};
