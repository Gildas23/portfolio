import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { linkCls, quietBtn, primaryBtn, outlineBtn } from "../lib/styles";

export const Tag = ({ children }) => (
  <span className="rounded-md border border-stone-200 bg-white px-2 py-0.5 text-xs text-stone-700 shadow-[0_1px_0_rgba(0,0,0,0.03)] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">{children}</span>
);

export const LinkOut = ({ href, children }) =>
  href ? (
    <a href={href} target="_blank" rel="noreferrer" className={linkCls}>
      {children}
    </a>
  ) : null;

// "eyebrow" is an optional small label above the title, e.g. "01".
export const Section = ({ id, title, eyebrow, children }) => (
  <section id={id} className="scroll-mt-16 border-t border-stone-200 py-16 sm:py-20 dark:border-stone-800">
    {eyebrow && (
      <p className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">{title}</h2>
    <div className="mt-8">{children}</div>
  </section>
);

export const Field = ({ label, children, className = "" }) => (
  <label className={"block " + className}>
    <span className="mb-1 block text-sm text-stone-600 dark:text-stone-400">{label}</span>
    {children}
  </label>
);

// "Copy as code" + "Remove" for items the visitor added in this browser.
export function OwnerActions({ item, onRemove, strip }) {
  const editMode = useStore((s) => s.editMode);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    // Uploaded images are too large to paste as code, so they are left out.
    const out = strip ? strip(item) : item;
    try {
      await navigator.clipboard.writeText(JSON.stringify(out, null, 2) + ",");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      setCopied(false);
    }
  };
  if (!editMode) return null;
  return (
    <>
      <button onClick={copy} className={"ml-auto " + quietBtn}>
        {copied ? "Copied" : "Copy as code"}
      </button>
      <button onClick={() => onRemove(item.slug ?? item.id)} className="text-sm text-red-600 underline-offset-4 hover:underline dark:text-red-400">
        Remove
      </button>
    </>
  );
}

export const FormShell = ({ title, error, onSubmit, submitLabel, onCancel, note, children }) => (
  <div className="mt-6 rounded-lg border border-stone-300 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
    <h3 className="font-semibold">{title}</h3>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    {error && <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
    <div className="mt-4 flex gap-3">
      <button onClick={onSubmit} className={primaryBtn}>{submitLabel}</button>
      <button onClick={onCancel} className={outlineBtn}>Close</button>
    </div>
    <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">{note}</p>
  </div>
);
