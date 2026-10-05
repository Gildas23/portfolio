import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { field } from "../lib/styles";
import { FormShell, Field } from "./ui";

export default function AddPostForm({ onCancel }) {
  const addPost = useStore((s) => s.addPost);
  const [f, setF] = useState({ title: "", summary: "", body: "", tags: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = () => {
    if (!f.title.trim() || !f.body.trim()) return setError("Add a title and the text of the post.");
    const body = f.body.trim();
    addPost({
      id: "u" + Date.now(),
      title: f.title.trim(),
      date: new Date().toISOString().slice(0, 10),
      summary: f.summary.trim() || body.slice(0, 140) + (body.length > 140 ? "..." : ""),
      body,
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    onCancel();
  };
  return (
    <FormShell title="Write a post" error={error} onSubmit={submit} submitLabel="Publish post" onCancel={onCancel}
      note={'Saved in this browser only. To show a post to every visitor, use "Copy as code" and paste it into the POSTS list.'}>
      <Field label="Title" className="sm:col-span-2"><input className={field} value={f.title} onChange={set("title")} /></Field>
      <Field label="One-line summary (optional)" className="sm:col-span-2"><input className={field} value={f.summary} onChange={set("summary")} /></Field>
      <Field label="Post text. Leave a blank line between paragraphs." className="sm:col-span-2"><textarea className={field} rows={8} value={f.body} onChange={set("body")} /></Field>
      <Field label="Tags, separated by commas" className="sm:col-span-2"><input className={field} value={f.tags} onChange={set("tags")} placeholder="React, APIs" /></Field>
    </FormShell>
  );
}
