import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { field } from "../lib/styles";
import { FormShell, Field } from "./ui";

export default function AddPostForm({ onCancel }) {
  const addPost = useStore((s) => s.addPost);
  const count = useStore((s) => s.posts.length);
  const [f, setF] = useState({ title: "", category: "", excerpt: "", body: "", skills: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = () => {
    if (!f.title.trim() || !f.body.trim()) return setError("Add a title and the text of the post.");
    const body = f.body.trim();
    const skills = f.skills.split(",").map((t) => t.trim()).filter(Boolean);
    addPost({
      slug: "u" + Date.now(),
      title: f.title.trim(),
      excerpt: f.excerpt.trim() || body.slice(0, 140) + (body.length > 140 ? "..." : ""),
      category: f.category.trim() || "Notes",
      date: new Date().toISOString().slice(0, 10),
      readTime: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
      featured: false,
      gradient: "g" + ((count % 8) + 1),
      glyph: "◈",
      skills,
      tags: skills.map((s) => s.toLowerCase()),
      toc: [],
      thumbnail: "",
      sections: body.split(/\n{2,}/).map((content) => ({ type: "paragraph", content })),
    });
    onCancel();
  };

  return (
    <FormShell title="Write a post" error={error} onSubmit={submit} submitLabel="Publish post" onCancel={onCancel}
      note={'Saved in this browser only. To show a post to every visitor, use "Copy as code" and add it to posts.json.'}>
      <Field label="Title" className="sm:col-span-2"><input className={field} value={f.title} onChange={set("title")} /></Field>
      <Field label="Category (for example, Docker)"><input className={field} value={f.category} onChange={set("category")} /></Field>
      <Field label="Skills, separated by commas"><input className={field} value={f.skills} onChange={set("skills")} placeholder="Docker, Linux" /></Field>
      <Field label="One-line summary (optional)" className="sm:col-span-2"><input className={field} value={f.excerpt} onChange={set("excerpt")} /></Field>
      <Field label="Post text. Leave a blank line between paragraphs." className="sm:col-span-2"><textarea className={field} rows={8} value={f.body} onChange={set("body")} /></Field>
    </FormShell>
  );
}
