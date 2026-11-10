// Tailwind must use class-based dark mode (v3: darkMode: "class";
// v4: @custom-variant dark (&:where(.dark, .dark *));).
import React, { useState, useEffect } from "react";
import { useStore } from "./store/useStore";
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE, FEATURED } from "./data/content";
import { focus, linkCls, primaryBtn, outlineBtn } from "./lib/styles";
import { Tag, Section } from "./components/ui";
import ProjectList from "./components/ProjectList";
import ExperienceList from "./components/ExperienceList";
import AddProjectForm from "./components/AddProjectForm";
import BlogPage from "./components/BlogPage";
import PostPage from "./components/PostPage";
import ProjectPage from "./components/ProjectPage";
import { parseHash } from "./lib/utils";
import ThemeToggle from "./components/ThemeToggle";

const NAV = [
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Blog", "blog"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

export default function App() {
  const {
    theme,
    view,
    slug,
    editMode,
    toggleEdit,
    showAll,
    toggleShowAll,
    saveError,
  } = useStore();
  const saved = useStore((s) => s.projects);
  const setRoute = useStore((s) => s.setRoute);
  const removeProject = useStore((s) => s.removeProject);
  const [adding, setAdding] = useState(false);

  // Apply the theme to <html>. The store persists it, so it survives reloads.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  const all = [...PROJECTS, ...saved];
  const featured = FEATURED.map((id) => all.find((p) => p.id === id)).filter(Boolean);
  const rest = all.filter((p) => !FEATURED.includes(p.id));
  const PREVIEW = 6; // "More projects" shown before "Show all"
  const shownRest = showAll ? rest : rest.slice(0, PREVIEW);

  // Alt+N shows or hides the owner tools (add project, add post, remove, copy as code).
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && e.code === "KeyN") {
        e.preventDefault();
        toggleEdit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleEdit]);
  useEffect(() => {
    if (!editMode) setAdding(false);
  }, [editMode]);

  // Keep the page in step with the URL hash (#/blog, #/blog/<slug>, #/blog?skill=<name>).
  useEffect(() => {
    const sync = () => {
      const route = parseHash();
      setRoute(route);
      if (route.view !== "home") window.scrollTo({ top: 0 });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [setRoute]);

  const toHome = () => {
    window.history.pushState(null, "", window.location.pathname);
    setRoute({ view: "home", slug: null, skill: null });
  };
  const goHome = () => {
    toHome();
    window.scrollTo({ top: 0 });
  };
  const goTo = (id) => {
    if (id === "blog") {
      window.location.hash = "#/blog";
      return;
    }
    toHome();
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-base leading-relaxed text-stone-800 antialiased dark:bg-stone-950 dark:text-stone-300">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur dark:border-stone-800 dark:bg-stone-950/90">
        <nav className="mx-auto flex max-w-3xl lg:max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className={
              "hidden font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:block " +
              focus
            }
          >
            Gildas Chatue
          </a>
          <ul className="flex gap-4 text-sm sm:gap-6">
            {NAV.map(([label, id]) => {
              const current =
                (id === "blog" && (view === "blog" || view === "post")) ||
                (id === "projects" && view === "project");
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
                        ? " font-semibold text-teal-700 underline decoration-2 underline-offset-[6px] dark:text-teal-300"
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

      <main
        id="top"
        className="mx-auto w-full max-w-3xl flex-1 px-5 lg:max-w-4xl"
      >
        {view === "blog" ? (
          <BlogPage />
        ) : view === "post" ? (
          <PostPage slug={slug} />
        ) : view === "project" ? (
          <ProjectPage id={slug} />
        ) : (
          <>
            <div className="grid gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end md:gap-10">
              <div>
                {PROFILE.location && (
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    Based in {PROFILE.location}
                  </p>
                )}
                <h1 className="wordmark mt-6 text-7xl font-extrabold text-stone-900 sm:text-8xl lg:text-[8.5rem] dark:text-stone-50">
                  {PROFILE.name.split(" ").map((w) => (
                    <span key={w} className="block">{w}</span>
                  ))}
                </h1>
                <p className="mt-6 text-2xl font-semibold tracking-tight text-teal-700 dark:text-teal-300">
                  {PROFILE.title}
                </p>
                <p className="mt-3 max-w-lg text-lg text-stone-600 dark:text-stone-400">
                  {PROFILE.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={"mailto:" + PROFILE.email} className={primaryBtn}>
                    Email me
                  </a>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer" className={outlineBtn}>
                    GitHub
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={outlineBtn}>
                    LinkedIn
                  </a>
                </div>
              </div>

              <dl className="border-t-2 border-teal-600 text-sm dark:border-teal-400">
                {PROFILE.facts.map(([k, v]) => (
                  <div key={k} className="border-b border-stone-200 py-3 dark:border-stone-800">
                    <dt className="text-stone-500 dark:text-stone-400">{k}</dt>
                    <dd className="mt-0.5 font-medium text-stone-900 dark:text-stone-50">{v}</dd>
                  </div>
                ))}
                <div className="py-3">
                  <dt className="text-stone-500 dark:text-stone-400">Shipped and live</dt>
                  <dd className="mt-0.5 font-medium text-stone-900 dark:text-stone-50">
                    {featured.map((p, i) => (
                      <React.Fragment key={p.id}>
                        {i > 0 && (i === featured.length - 1 ? " and " : ", ")}
                        <a href={"#/projects/" + p.id} className={"underline decoration-stone-300 underline-offset-4 hover:text-teal-700 hover:decoration-teal-600 dark:decoration-stone-600 dark:hover:text-teal-300 " + focus}>
                          {p.title}
                        </a>
                      </React.Fragment>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <Section id="projects" title="Projects">
              <h3 className="text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                Selected work
              </h3>
              <div className="mt-4">
                <ProjectList projects={featured} />
              </div>

              <h3 className="mt-14 text-sm font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                More projects
              </h3>
              <div className="mt-4">
                <ProjectList projects={shownRest} thumbs={false} onRemove={removeProject} />
              </div>
              {rest.length > PREVIEW && (
                <button onClick={toggleShowAll} aria-expanded={showAll} className={"mt-6 " + outlineBtn}>
                  {showAll ? "Show fewer projects" : "Show " + (rest.length - PREVIEW) + " more projects"}
                </button>
              )}
              {saveError && (
                <p role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
                  This browser could not save your changes, so they will
                  disappear when you leave the page. Try a smaller image.
                </p>
              )}
              {editMode &&
                (adding ? (
                  <AddProjectForm onCancel={() => setAdding(false)} />
                ) : (
                  <button onClick={() => setAdding(true)} className={"mt-6 " + outlineBtn}>
                    Add a project
                  </button>
                ))}
            </Section>

            <Section id="experience" title="Experience">
              <ExperienceList jobs={EXPERIENCE} />
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
                {PROFILE.location ? "I am based in " + PROFILE.location + ". " : ""}
                Write to me at{" "}
                <a
                  className={linkCls.replace("text-sm ", "")}
                  href={"mailto:" + PROFILE.email}
                >
                  {PROFILE.email}
                </a>
                . {PROFILE.contactNote}
              </p>
            </Section>
          </>
        )}
      </main>

      <footer className="mx-auto w-full max-w-3xl px-5 lg:max-w-4xl py-10 text-sm text-stone-500 dark:text-stone-500">
        {PROFILE.name}
      </footer>
      {editMode && (
        <p
          role="status"
          className="fixed bottom-4 right-4 rounded-md bg-stone-900 px-3 py-2 text-xs text-white shadow dark:bg-stone-100 dark:text-stone-900"
        >
          Edit mode on. Press Alt+N to hide.
        </p>
      )}
    </div>
  );
}
