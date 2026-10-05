// Setup: npm i zustand
// Tailwind must use class-based dark mode (v3: darkMode: "class";
// v4: @custom-variant dark (&:where(.dark, .dark *));).
import React, { useState, useEffect, useRef } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* ============ EDIT YOUR CONTENT HERE ============ */
const PROFILE = {
  name: "Gildas Gamaliel Chatue Sobgoui",
  title: "Full-stack software engineer",
  location: "Ottawa, Ontario",
  email: "gildassob@gmail.com",
  linkedin: "https://www.linkedin.com/in/gildas-chatue",
  github: "https://github.com/Gildas23",
  summary:
    "I build and support production web applications and APIs. Over 4 years I have worked across React, Node.js, Java and PHP, deployed on AWS, and kept those systems running. I work well with support, sales and operations teams, and I am fluent in English and French.",
};

const SKILLS = [
  ["Front-end", "React, Next.js, TypeScript, JavaScript, Angular, HTML5, CSS3"],
  ["Back-end", "Node.js, Express, Java/Spring Boot, PHP, Python, REST APIs"],
  ["Data", "MySQL, SQL, MongoDB"],
  [
    "Cloud and tools",
    "AWS, OVH Cloud, Docker, GitHub Actions CI/CD, Git, Linux",
  ],
  ["AI", "OpenAI and Gemini API integration"],
];

// Permanent projects. Use "Copy as code" on a project added in the browser, then paste it here.
const PROJECTS = [
  {
    id: "p1",
    title: "Customer management API platform",
    description:
      "REST API platform for customer workflows, with third-party integrations and an Angular front end. Designed, tested, deployed and supported in production.",
    tech: ["Node.js", "PHP", "Java", "Spring Boot", "MySQL"],
    image: "", // a data: image or a URL to a preview image
    live: "",
    repo: "",
  },
  {
    id: "p2",
    title: "Real-time customer service chatbot",
    description:
      "Chatbot built on the OpenAI and Gemini APIs that helps a support team answer customers faster.",
    tech: ["OpenAI API", "Gemini API", "JavaScript"],
    image: "",
    live: "",
    repo: "",
  },
  {
    id: "p3",
    title: "Real-time vehicle tracking API",
    description:
      "Contributed to the development and testing of a real-time vehicle tracking web API.",
    tech: ["Node.js", "REST"],
    image: "",
    live: "",
    repo: "",
  },
];

// Permanent posts. Separate paragraphs in "body" with a blank line.
const POSTS = [
  {
    id: "b1",
    title: "Welcome to my blog",
    date: "2026-10-05",
    summary: "What I plan to write about here, and why.",
    body: "I am a full-stack developer, and this is where I will share what I learn while building and running web applications.\n\nExpect short, practical notes on APIs, deployments, debugging production problems, and working with AI tools.",
    tags: ["Introduction"],
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Bloosat SA",
    dates: "10/2023 – 09/2026",
    points: [
      "Built and supported a customer management API platform used in production workflows.",
      "Set up GitHub Actions pipelines for builds, tests and deployments, and deployed to AWS and OVH Cloud.",
      "Fixed production issues across services and databases, and added logging and monitoring.",
      "Reviewed code and mentored junior developers.",
    ],
  },
  {
    role: "Software Engineer",
    org: "A2I Sarl",
    dates: "06/2022 – 08/2023",
    points: [
      "Cut a data query module's response time from 10 seconds to 3 seconds.",
      "Upgraded a legacy Node.js API from Node 8 to 17.2 with Docker, improving responsiveness by up to 30%.",
      "Built reusable React components and integrated third-party APIs.",
    ],
  },
  {
    role: "Software Developer Intern",
    org: "A2I Sarl",
    dates: "06/2021 – 09/2021",
    points: [
      "Automated stock data extraction from an SQL database and built Excel export with email alerts.",
    ],
  },
];
/* ================================================ */

/* ---------------- Zustand store ---------------- */
// Storage wrapper: never throws (private mode, quota), and flags failures so the UI can say so.
const safeStorage = {
  getItem: (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v);
      if (useStore.getState().saveError)
        useStore.setState({ saveError: false });
    } catch (e) {
      useStore.setState({ saveError: true });
    }
  },
  removeItem: (k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  },
};

const systemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const useStore = create(
  persist(
    (set) => ({
      // persisted
      theme: systemTheme(),
      projects: [],
      posts: [],
      // session only
      view: "home", // "home" | "blog"
      showAll: false,
      saveError: false,

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setView: (view) => set({ view }),
      toggleShowAll: () => set((s) => ({ showAll: !s.showAll })),
      addProject: (p) => set((s) => ({ projects: [...s.projects, p] })),
      removeProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
      addPost: (p) => set((s) => ({ posts: [...s.posts, p] })),
      removePost: (id) =>
        set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
    }),
    {
      name: "portfolio",
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({
        theme: s.theme,
        projects: s.projects,
        posts: s.posts,
      }),
    },
  ),
);

/* ---------------- helpers ---------------- */
const fileToThumb = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode"));
      img.onload = () => {
        const w = Math.min(800, img.width);
        const c = document.createElement("canvas");
        c.width = w;
        c.height = Math.round((img.height * w) / img.width);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

const formatDate = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/* ---------------- shared UI ---------------- */
const focus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-teal-400 dark:focus-visible:ring-offset-stone-950";
const linkCls =
  "text-sm font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-300 " +
  focus;
const quietBtn =
  "text-sm text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-100 " +
  focus;
const field =
  "w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-900 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-50 " +
  focus;
const primaryBtn =
  "rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 " +
  focus;
const outlineBtn =
  "rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900 " +
  focus;

const Tag = ({ children }) => (
  <span className="rounded bg-stone-200/70 px-2 py-0.5 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300">
    {children}
  </span>
);

const LinkOut = ({ href, children }) =>
  href ? (
    <a href={href} target="_blank" rel="noreferrer" className={linkCls}>
      {children}
    </a>
  ) : null;

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="scroll-mt-16 border-t border-stone-200 py-12 dark:border-stone-800"
  >
    <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
      {title}
    </h2>
    <div className="mt-6">{children}</div>
  </section>
);

const Field = ({ label, children, className = "" }) => (
  <label className={"block " + className}>
    <span className="mb-1 block text-sm text-stone-600 dark:text-stone-400">
      {label}
    </span>
    {children}
  </label>
);

// "Copy as code" + "Remove" for items the visitor added in this browser.
function OwnerActions({ item, onRemove, strip }) {
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
  return (
    <>
      <button onClick={copy} className={"ml-auto " + quietBtn}>
        {copied ? "Copied" : "Copy as code"}
      </button>
      <button
        onClick={() => onRemove(item.id)}
        className="text-sm text-red-600 underline-offset-4 hover:underline dark:text-red-400"
      >
        Remove
      </button>
    </>
  );
}

/* ---------------- projects ---------------- */
function Thumb({ project }) {
  const [broken, setBroken] = useState(false);
  const target = project.live || project.repo;
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const inner =
    project.image && !broken ? (
      <img
        src={project.image}
        alt={"Preview of " + project.title}
        loading="lazy"
        onError={() => setBroken(true)}
        className="aspect-video w-full object-cover"
      />
    ) : (
      <div className="flex aspect-video w-full items-center justify-center bg-stone-100 text-3xl font-semibold text-stone-400 dark:bg-stone-800 dark:text-stone-600">
        {initials}
      </div>
    );
  return target ? (
    <a
      href={target}
      target="_blank"
      rel="noreferrer"
      aria-label={"Open " + project.title}
      className={"block " + focus}
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

function ProjectCard({ project, onRemove, canRemove, full }) {
  return (
    <article
      className={
        "flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900 " +
        (full ? "w-full" : "w-72 shrink-0 snap-start")
      }
    >
      <Thumb project={project} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-stone-900 dark:text-stone-50">
          {project.title}
        </h3>
        <p
          className={
            "mt-2 flex-1 text-sm text-stone-600 dark:text-stone-400 " +
            (full ? "" : "line-clamp-3")
          }
        >
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <LinkOut href={project.live}>View live</LinkOut>
          <LinkOut href={project.repo}>View code</LinkOut>
          {canRemove && (
            <OwnerActions
              item={project}
              onRemove={onRemove}
              strip={(p) => ({
                ...p,
                image: p.image.startsWith("data:") ? "" : p.image,
              })}
            />
          )}
        </div>
      </div>
    </article>
  );
}

const FormShell = ({
  title,
  error,
  onSubmit,
  submitLabel,
  onCancel,
  note,
  children,
}) => (
  <div className="mt-6 rounded-lg border border-stone-300 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
    <h3 className="font-semibold">{title}</h3>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    {error && (
      <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
        {error}
      </p>
    )}
    <div className="mt-4 flex gap-3">
      <button onClick={onSubmit} className={primaryBtn}>
        {submitLabel}
      </button>
      <button onClick={onCancel} className={outlineBtn}>
        Close
      </button>
    </div>
    <p className="mt-3 text-sm text-stone-500 dark:text-stone-400">{note}</p>
  </div>
);

function AddProjectForm({ onCancel }) {
  const addProject = useStore((s) => s.addProject);
  const empty = {
    title: "",
    description: "",
    tech: "",
    live: "",
    repo: "",
    image: "",
  };
  const [f, setF] = useState(empty);
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const pickImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setF({ ...f, image: await fileToThumb(file) });
      setError("");
    } catch (err) {
      setError(
        "That file could not be read as an image. Try a PNG or JPG screenshot.",
      );
    }
  };
  const submit = () => {
    if (!f.title.trim() || !f.description.trim())
      return setError("Add a title and a short description.");
    addProject({
      id: "u" + Date.now(),
      title: f.title.trim(),
      description: f.description.trim(),
      tech: f.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      live: f.live.trim(),
      repo: f.repo.trim(),
      image: f.image,
    });
    onCancel();
  };

  return (
    <FormShell
      title="Add a project"
      error={error}
      onSubmit={submit}
      submitLabel="Add project"
      onCancel={onCancel}
      note={
        'Saved in this browser only. To show a project to every visitor, use "Copy as code" and paste it into the PROJECTS list.'
      }
    >
      <Field label="Title" className="sm:col-span-2">
        <input className={field} value={f.title} onChange={set("title")} />
      </Field>
      <Field label="What it does and what you built" className="sm:col-span-2">
        <textarea
          className={field}
          rows={3}
          value={f.description}
          onChange={set("description")}
        />
      </Field>
      <Field
        label="Technologies, separated by commas"
        className="sm:col-span-2"
      >
        <input
          className={field}
          value={f.tech}
          onChange={set("tech")}
          placeholder="React, Node.js, MySQL"
        />
      </Field>
      <div className="sm:col-span-2">
        <span className="mb-1 block text-sm text-stone-600 dark:text-stone-400">
          Preview image (a screenshot of the app)
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={pickImage}
          className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-md file:border-0 file:bg-stone-200 file:px-3 file:py-2 file:text-stone-800 dark:text-stone-300 dark:file:bg-stone-700 dark:file:text-stone-100"
        />
        {f.image && (
          <div className="mt-3 flex items-start gap-3">
            <img
              src={f.image}
              alt="Selected preview"
              className="aspect-video w-40 rounded-md border border-stone-300 object-cover dark:border-stone-700"
            />
            <button
              type="button"
              onClick={() => setF({ ...f, image: "" })}
              className="text-sm text-red-600 underline-offset-4 hover:underline dark:text-red-400"
            >
              Remove image
            </button>
          </div>
        )}
      </div>
      <Field label="Link to the app (the preview opens it)">
        <input
          className={field}
          value={f.live}
          onChange={set("live")}
          placeholder="https://"
        />
      </Field>
      <Field label="GitHub link (optional)">
        <input
          className={field}
          value={f.repo}
          onChange={set("repo")}
          placeholder="https://github.com/"
        />
      </Field>
    </FormShell>
  );
}

/* ---------------- blog ---------------- */
function PostItem({ post, canRemove }) {
  const removePost = useStore((s) => s.removePost);
  const [open, setOpen] = useState(false);
  return (
    <article className="border-b border-stone-200 pb-6 last:border-0 dark:border-stone-800">
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {formatDate(post.date)}
      </p>
      <h3 className="mt-1 text-lg font-semibold text-stone-900 dark:text-stone-50">
        {post.title}
      </h3>
      <p className="mt-2 text-stone-600 dark:text-stone-400">{post.summary}</p>
      {open && (
        <div className="mt-4 max-w-prose space-y-3 text-stone-700 dark:text-stone-300">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className={linkCls}
        >
          {open ? "Close post" : "Read post"}
        </button>
        {canRemove && <OwnerActions item={post} onRemove={removePost} />}
      </div>
    </article>
  );
}

function AddPostForm({ onCancel }) {
  const addPost = useStore((s) => s.addPost);
  const [f, setF] = useState({ title: "", summary: "", body: "", tags: "" });
  const [error, setError] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = () => {
    if (!f.title.trim() || !f.body.trim())
      return setError("Add a title and the text of the post.");
    const body = f.body.trim();
    addPost({
      id: "u" + Date.now(),
      title: f.title.trim(),
      date: new Date().toISOString().slice(0, 10),
      summary:
        f.summary.trim() ||
        body.slice(0, 140) + (body.length > 140 ? "..." : ""),
      body,
      tags: f.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    onCancel();
  };
  return (
    <FormShell
      title="Write a post"
      error={error}
      onSubmit={submit}
      submitLabel="Publish post"
      onCancel={onCancel}
      note={
        'Saved in this browser only. To show a post to every visitor, use "Copy as code" and paste it into the POSTS list.'
      }
    >
      <Field label="Title" className="sm:col-span-2">
        <input className={field} value={f.title} onChange={set("title")} />
      </Field>
      <Field label="One-line summary (optional)" className="sm:col-span-2">
        <input className={field} value={f.summary} onChange={set("summary")} />
      </Field>
      <Field
        label="Post text. Leave a blank line between paragraphs."
        className="sm:col-span-2"
      >
        <textarea
          className={field}
          rows={8}
          value={f.body}
          onChange={set("body")}
        />
      </Field>
      <Field label="Tags, separated by commas" className="sm:col-span-2">
        <input
          className={field}
          value={f.tags}
          onChange={set("tags")}
          placeholder="React, APIs"
        />
      </Field>
    </FormShell>
  );
}

/* ---------------- page ---------------- */
const ThemeToggle = () => {
  const theme = useStore((s) => s.theme);
  const toggle = useStore((s) => s.toggleTheme);
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-stone-300 text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-900 " +
        focus
      }
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
};

const NAV = [
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Blog", "blog"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function App() {
  const { theme, view, setView, showAll, toggleShowAll, saveError } =
    useStore();
  const saved = useStore((s) => s.projects);
  const savedPosts = useStore((s) => s.posts);
  const removeProject = useStore((s) => s.removeProject);
  const [adding, setAdding] = useState(false);
  const [writing, setWriting] = useState(false);
  const scroller = useRef(null);

  // Apply the theme to <html>. The store persists it, so it survives reloads.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const all = [...PROJECTS, ...saved];
  const posts = [...POSTS, ...savedPosts].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
  const slide = (dir) =>
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  const goHome = () => {
    setView("home");
    window.scrollTo({ top: 0 });
  };
  const goTo = (id) => {
    if (id === "blog") {
      setView("blog");
      window.scrollTo({ top: 0 });
      return;
    }
    setView("home");
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  const arrow =
    "h-9 w-9 rounded-md border border-stone-300 text-lg hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900 " +
    focus;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-base leading-relaxed text-stone-800 antialiased dark:bg-stone-950 dark:text-stone-300">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
        <nav className="mx-auto flex max-w-3xl lg:max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className={
              "hidden font-semibold text-stone-900 dark:text-stone-50 sm:block " +
              focus
            }
          >
            Gildas C.S.
          </a>
          <ul className="flex gap-4 text-sm sm:gap-6">
            {NAV.map(([label, id]) => {
              const current = id === "blog" && view === "blog";
              return (
                <li key={id}>
                  <a
                    href={"#" + id}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(id);
                    }}
                    aria-current={current ? "page" : undefined}
                    className={
                      "hover:text-teal-700 dark:hover:text-teal-300 " +
                      focus +
                      (current
                        ? " font-semibold text-teal-700 dark:text-teal-300"
                        : "")
                    }
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-3xl lg:max-w-4xl px-5">
        {view === "blog" ? (
          <div className="pt-8">
            <button onClick={goHome} className={linkCls}>
              Back to portfolio
            </button>
            <Section id="blog" title="Blog">
              <div className="space-y-6">
                {posts.map((p) => (
                  <PostItem
                    key={p.id}
                    post={p}
                    canRemove={p.id.startsWith("u")}
                  />
                ))}
              </div>
              {writing ? (
                <AddPostForm onCancel={() => setWriting(false)} />
              ) : (
                <button
                  onClick={() => setWriting(true)}
                  className={"mt-6 " + outlineBtn}
                >
                  Write a post
                </button>
              )}
            </Section>
          </div>
        ) : (
          <>
            <div className="py-16 sm:py-24">
              <p className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                {PROFILE.title} in {PROFILE.location}, open to roles
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50">
                {PROFILE.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-stone-600 dark:text-stone-400">
                {PROFILE.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={"mailto:" + PROFILE.email} className={primaryBtn}>
                  Email me
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className={outlineBtn}
                >
                  GitHub
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={outlineBtn}
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <Section id="projects" title="Projects">
              <div className="mb-4 flex items-center justify-between gap-3">
                <button
                  onClick={toggleShowAll}
                  aria-expanded={showAll}
                  className={outlineBtn}
                >
                  {showAll
                    ? "Show fewer projects"
                    : "See all projects (" + all.length + ")"}
                </button>
                {!showAll && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => slide(-1)}
                      aria-label="Previous projects"
                      className={arrow}
                    >
                      &lsaquo;
                    </button>
                    <button
                      onClick={() => slide(1)}
                      aria-label="Next projects"
                      className={arrow}
                    >
                      &rsaquo;
                    </button>
                  </div>
                )}
              </div>
              {showAll ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {all.map((p) => (
                    <ProjectCard
                      key={p.id}
                      full
                      project={p}
                      canRemove={p.id.startsWith("u")}
                      onRemove={removeProject}
                    />
                  ))}
                </div>
              ) : (
                <div
                  ref={scroller}
                  tabIndex={0}
                  aria-label="Projects"
                  className={
                    "-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
                    focus
                  }
                >
                  {all.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      canRemove={p.id.startsWith("u")}
                      onRemove={removeProject}
                    />
                  ))}
                </div>
              )}
              {saveError && (
                <p
                  role="alert"
                  className="mt-4 text-sm text-red-600 dark:text-red-400"
                >
                  This browser could not save your changes, so they will
                  disappear when you leave the page. Try a smaller image.
                </p>
              )}
              {adding ? (
                <AddProjectForm onCancel={() => setAdding(false)} />
              ) :  (
                <button
                  onClick={() => setAdding(true)}
                  className={"mt-6 " + outlineBtn + }
                >
                  Add a project
                </button>
              )}
            </Section>

            <Section id="experience" title="Experience">
              <ol className="space-y-8">
                {EXPERIENCE.map((job) => (
                  <li
                    key={job.org + job.dates}
                    className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
                  >
                    <p className="text-sm text-stone-500 dark:text-stone-400 sm:pt-0.5">
                      {job.dates}
                    </p>
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-stone-50">
                        {job.role}, {job.org}
                      </h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-600 dark:text-stone-400">
                        {job.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="skills" title="Skills">
              <dl className="grid gap-4 sm:grid-cols-[9.5rem_1fr] sm:gap-x-6">
                {SKILLS.map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="font-medium text-stone-900 sm:pt-0.5 dark:text-stone-50">
                      {k}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {v.split(", ").map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
              <p className="mt-8 text-stone-600 dark:text-stone-400">
                Education: Bachelor of Science in Software Engineering, The ICT
                University (2023). Languages: English and French (C1).
              </p>
            </Section>

            <Section id="contact" title="Contact">
              <p className="text-stone-600 dark:text-stone-400">
                I am based in {PROFILE.location} and open to full-stack and
                back-end roles. Write to me at{" "}
                <a
                  className={linkCls.replace("text-sm ", "")}
                  href={"mailto:" + PROFILE.email}
                >
                  {PROFILE.email}
                </a>
                .
              </p>
            </Section>
          </>
        )}
      </main>

      <footer className="mx-auto max-w-3xl lg:max-w-4xl px-5 py-10 text-sm text-stone-500 dark:text-stone-500">
        {PROFILE.name}
      </footer>
    </div>
  );
}
