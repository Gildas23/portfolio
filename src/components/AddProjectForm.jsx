import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { fileToThumb } from "../lib/utils";
import { field } from "../lib/styles";
import { FormShell, Field } from "./ui";

export default function AddProjectForm({ onCancel }) {
  const addProject = useStore((s) => s.addProject);
  const count = useStore((s) => s.projects.length);
  const empty = { title: "", category: "", description: "", stack: "", link: "", thumb: "" };
  const [f, setF] = useState(empty);
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const pickImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setF({ ...f, thumb: await fileToThumb(file) });
      setError("");
    } catch (err) {
      setError("That file could not be read as an image. Try a PNG or JPG screenshot.");
    }
  };
  const submit = () => {
    if (!f.title.trim() || !f.description.trim()) return setError("Add a title and a short description.");
    addProject({
      id: "u" + Date.now(),
      category: f.category.trim(),
      title: f.title.trim(),
      description: f.description.trim(),
      gradient: "g" + ((count % 5) + 1),
      glyph: "◈",
      stack: f.stack.split(",").map((t) => t.trim()).filter(Boolean),
      link: f.link.trim() || null,
      thumb: f.thumb,
    });
    onCancel();
  };

  return (
    <FormShell title="Add a project" error={error} onSubmit={submit} submitLabel="Add project" onCancel={onCancel}
      note={'Saved in this browser only. To show a project to every visitor, use "Copy as code" and paste it into the PROJECTS list.'}>
      <Field label="Title"><input className={field} value={f.title} onChange={set("title")} /></Field>
      <Field label="Category (for example, Automation)"><input className={field} value={f.category} onChange={set("category")} /></Field>
      <Field label="What it does and what you built" className="sm:col-span-2"><textarea className={field} rows={3} value={f.description} onChange={set("description")} /></Field>
      <Field label="Technologies, separated by commas" className="sm:col-span-2"><input className={field} value={f.stack} onChange={set("stack")} placeholder="React, Node.js, MySQL" /></Field>
      <div className="sm:col-span-2">
        <span className="mb-1 block text-sm text-stone-600 dark:text-stone-400">Thumbnail (a screenshot of the project)</span>
        <input type="file" accept="image/*" onChange={pickImage} className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-stone-200 file:px-3 file:py-2 file:text-stone-800 dark:text-stone-300 dark:file:bg-stone-700 dark:file:text-stone-100" />
        {f.thumb && (
          <div className="mt-3 flex items-start gap-3">
            <img src={f.thumb} alt="Selected thumbnail" className="aspect-video w-40 rounded-md border border-stone-300 object-cover dark:border-stone-700" />
            <button type="button" onClick={() => setF({ ...f, thumb: "" })} className="text-sm text-red-600 underline-offset-4 hover:underline dark:text-red-400">Remove image</button>
          </div>
        )}
      </div>
      <Field label="Link to the project (optional)" className="sm:col-span-2"><input className={field} value={f.link} onChange={set("link")} placeholder="https://" /></Field>
    </FormShell>
  );
}
