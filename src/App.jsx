// Tailwind must use class-based dark mode (v3: darkMode: "class";
// v4: @custom-variant dark (&:where(.dark, .dark *));).
import React, { useState, useEffect, useRef } from "react";
import { useStore } from "./store/useStore";
import { PROFILE, SKILLS, PROJECTS, POSTS, EXPERIENCE } from "./data/content";
import { focus, linkCls, primaryBtn, outlineBtn } from "./lib/styles";
import { Tag, Section } from "./components/ui";
import ProjectCard from "./components/ProjectCard";
import AddProjectForm from "./components/AddProjectForm";
import PostItem from "./components/PostItem";
import AddPostForm from "./components/AddPostForm";
import ThemeToggle from "./components/ThemeToggle";

const NAV = [["Projects", "projects"], ["Experience", "experience"], ["Blog", "blog"], ["Skills", "skills"], ["Contact", "contact"]];

export default function App() {
  const { theme, view, setView, showAll, toggleShowAll, saveError } = useStore();
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
  const posts = [...POSTS, ...savedPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const slide = (dir) => scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

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
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const arrow = "h-9 w-9 rounded-md border border-stone-300 text-lg hover:bg-stone-100 dark:border-stone-700 dark:hover:bg-stone-900 " + focus;

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-base leading-relaxed text-stone-800 antialiased dark:bg-stone-950 dark:text-stone-300">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
        <nav className="mx-auto flex max-w-3xl lg:max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <a href="#top" onClick={(e) => { e.preventDefault(); goHome(); }} className={"hidden font-semibold text-stone-900 dark:text-stone-50 sm:block " + focus}>
            Gildas C.S.
          </a>
          <ul className="flex gap-4 text-sm sm:gap-6">
            {NAV.map(([label, id]) => {
              const current = id === "blog" && view === "blog";
              return (
                <li key={id}>
                  <a
                    href={"#" + id}
                    onClick={(e) => { e.preventDefault(); goTo(id); }}
                    aria-current={current ? "page" : undefined}
                    className={"hover:text-teal-700 dark:hover:text-teal-300 " + focus + (current ? " font-semibold text-teal-700 dark:text-teal-300" : "")}
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

      <main id="top" className="mx-auto w-full max-w-3xl flex-1 px-5 lg:max-w-4xl">
        {view === "blog" ? (
          <div className="pt-8">
            <button onClick={goHome} className={linkCls}>Back to portfolio</button>
            <Section id="blog" title="Blog">
              <div className="space-y-6">
                {posts.map((p) => (
                  <PostItem key={p.id} post={p} canRemove={p.id.startsWith("u")} />
                ))}
              </div>
              {writing ? (
                <AddPostForm onCancel={() => setWriting(false)} />
              ) : (
                <button onClick={() => setWriting(true)} className={"mt-6 " + outlineBtn}>Write a post</button>
              )}
            </Section>
          </div>
        ) : (
          <>
            <div className="py-16 sm:py-24">
              <p className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {PROFILE.title} in {PROFILE.location}, open to roles
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl dark:text-stone-50">{PROFILE.name}</h1>
              <p className="mt-6 max-w-xl text-lg text-stone-600 dark:text-stone-400">{PROFILE.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={"mailto:" + PROFILE.email} className={primaryBtn}>Email me</a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className={outlineBtn}>GitHub</a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={outlineBtn}>LinkedIn</a>
              </div>
            </div>

            <Section id="projects" title="Projects">
              <div className="mb-4 flex items-center justify-between gap-3">
                <button onClick={toggleShowAll} aria-expanded={showAll} className={outlineBtn}>
                  {showAll ? "Show fewer projects" : "See all projects (" + all.length + ")"}
                </button>
                {!showAll && (
                  <div className="flex gap-2">
                    <button onClick={() => slide(-1)} aria-label="Previous projects" className={arrow}>&lsaquo;</button>
                    <button onClick={() => slide(1)} aria-label="Next projects" className={arrow}>&rsaquo;</button>
                  </div>
                )}
              </div>
              {showAll ? (
                <div className="grid gap-5 sm:grid-cols-2">
                  {all.map((p) => (
                    <ProjectCard key={p.id} full project={p} canRemove={p.id.startsWith("u")} onRemove={removeProject} />
                  ))}
                </div>
              ) : (
                <div
                  ref={scroller}
                  tabIndex={0}
                  aria-label="Projects"
                  className={"-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " + focus}
                >
                  {all.map((p) => (
                    <ProjectCard key={p.id} project={p} canRemove={p.id.startsWith("u")} onRemove={removeProject} />
                  ))}
                </div>
              )}
              {saveError && (
                <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
                  This browser could not save your changes, so they will disappear when you leave the page. Try a smaller image.
                </p>
              )}
              {adding ? (
                <AddProjectForm onCancel={() => setAdding(false)} />
              ) : (
                <button onClick={() => setAdding(true)} className={"mt-6 " + outlineBtn}>Add a project</button>
              )}
            </Section>

            <Section id="experience" title="Experience">
              <ol className="space-y-8">
                {EXPERIENCE.map((job) => (
                  <li key={job.org + job.dates} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                    <p className="text-sm text-stone-500 dark:text-stone-400 sm:pt-0.5">{job.dates}</p>
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-stone-50">{job.role}, {job.org}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-600 dark:text-stone-400">
                        {job.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                      <h4 className="mt-5 text-sm font-medium text-stone-900 dark:text-stone-50">Achievements</h4>
                      <ul className="mt-2 space-y-2.5 text-stone-600 dark:text-stone-400">
                        {job.achievements.map((a) => (
                          <li key={a.text} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                            <span className="text-sm text-teal-700 sm:w-28 sm:shrink-0 sm:pt-0.5 dark:text-teal-300">{a.area}</span>
                            <span>{a.text}</span>
                          </li>
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
                    <dt className="font-medium text-stone-900 sm:pt-0.5 dark:text-stone-50">{k}</dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {v.split(", ").map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
              <p className="mt-8 text-stone-600 dark:text-stone-400">
                Education: Bachelor of Science in Software Engineering, The ICT University (2023). Languages: English and French (C1).
              </p>
            </Section>

            <Section id="contact" title="Contact">
              <p className="text-stone-600 dark:text-stone-400">
                I am based in {PROFILE.location} and open to full-stack and back-end roles. Write to me at{" "}
                <a className={linkCls.replace("text-sm ", "")} href={"mailto:" + PROFILE.email}>{PROFILE.email}</a>.
              </p>
            </Section>
          </>
        )}
      </main>

      <footer className="mx-auto w-full max-w-3xl px-5 lg:max-w-4xl py-10 text-sm text-stone-500 dark:text-stone-500">{PROFILE.name}</footer>
    </div>
  );
}
