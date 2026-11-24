// Tailwind must use class-based dark mode (v3: darkMode: "class";
// v4: @custom-variant dark (&:where(.dark, .dark *));).
import React, { useState, useEffect } from "react";
import { useStore } from "./store/useStore";
import { PROFILE, SKILLS, PROJECTS, EXPERIENCE, FEATURED, SPOTLIGHT, SERVICES, STATS, TERMINAL } from "./data/content";
import FeaturedProject from "./components/FeaturedProject";
import { Code2, Cloud } from "lucide-react";
import { focus, linkCls, primaryBtn, outlineBtn } from "./lib/styles";
import { Tag, Section } from "./components/ui";
import ProjectGrid from "./components/ProjectGrid";
import Terminal from "./components/Terminal";
import Reveal from "./components/Reveal";
import ExperienceList from "./components/ExperienceList";
import AddProjectForm from "./components/AddProjectForm";
import BlogPage from "./components/BlogPage";
import PostPage from "./components/PostPage";
import ProjectPage from "./components/ProjectPage";
import { parseHash } from "./lib/utils";
import ThemeToggle from "./components/ThemeToggle";

// Split "a, b (c, d), e" on top-level commas only, so "AWS (EC2, VPC)" stays one tag.
const splitSkills = (s) => {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
};

const SERVICE_ICONS = [Code2, Cloud];

const NAV = [
  ["What I do", "services"],
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
  const spotlight = SPOTLIGHT.map((id) => all.find((p) => p.id === id)).filter(Boolean);
  const rest = all.filter((p) => !SPOTLIGHT.includes(p.id));

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
    <div className="flex min-h-screen flex-col overflow-x-clip bg-stone-50 font-sans text-base leading-relaxed text-stone-800 antialiased dark:bg-stone-950 dark:text-stone-300">
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
          <ul className="flex gap-3 whitespace-nowrap text-sm sm:gap-6">
            {NAV.map(([label, id]) => {
              // "What I do" sits right under the hero, so phones skip it to keep the bar on one line.
              const hideOnPhone = id === "services";
              const current =
                (id === "blog" && (view === "blog" || view === "post")) ||
                (id === "projects" && view === "project");
              return (
                <li key={id} className={hideOnPhone ? "hidden sm:block" : undefined}>
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
            <div className="relative isolate grid gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 md:grid-cols-[minmax(0,1fr)_19rem] md:items-center md:gap-10">
              {/* Decorative backdrop: a faint dot grid with teal (build) and sky (run) glows. */}
              <div aria-hidden="true" className="pointer-events-none absolute -inset-x-40 -top-16 bottom-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(120,113,108,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(168,162,158,0.12)_1px,transparent_1px)]" />
                <div className="absolute left-[18%] top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/15" />
                <div className="absolute right-[15%] top-40 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/15" />
              </div>
              <div>
                <h1 className="wordmark text-7xl font-extrabold text-stone-900 sm:text-8xl lg:text-[8.5rem] dark:text-stone-50">
                  {PROFILE.name.split(" ").map((w) => (
                    <span key={w} className="block">{w}</span>
                  ))}
                </h1>
                <p className="mt-6 text-2xl font-semibold tracking-tight text-teal-700 dark:text-teal-300">
                  {PROFILE.title}
                </p>
                {PROFILE.roles?.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                    {PROFILE.roles.map((r, i) => (
                      <li
                        key={r}
                        className={
                          "rounded-full border px-3 py-1 font-medium " +
                          (i === 0
                            ? "border-teal-600/40 bg-teal-50 text-teal-800 dark:border-teal-400/40 dark:bg-teal-950/60 dark:text-teal-200"
                            : "border-sky-600/40 bg-sky-50 text-sky-800 dark:border-sky-400/40 dark:bg-sky-950/60 dark:text-sky-200")
                        }
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
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

              <div className="space-y-6">
              {TERMINAL?.length > 0 && <Terminal script={TERMINAL} />}
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
            </div>

            {STATS.length > 0 && (
              <Reveal as="ul" className="-mt-4 mb-16 grid grid-cols-2 overflow-hidden rounded-xl border border-stone-200 bg-white sm:grid-cols-4 dark:border-stone-800 dark:bg-stone-900">
                {STATS.map(([value, label], i) => (
                  <li
                    key={label}
                    className={
                      "p-5 " +
                      (i % 2 === 1 ? "border-l " : "") +
                      (i >= 2 ? "border-t sm:border-t-0 " : "") +
                      (i === 2 ? "sm:border-l " : "") +
                      "border-stone-200 dark:border-stone-800"
                    }
                  >
                    <p className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">{value}</p>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{label}</p>
                  </li>
                ))}
              </Reveal>
            )}

            <Section id="services" title="What I do" eyebrow="01 · Services">
              <div className="grid gap-5 md:grid-cols-2">
                {SERVICES.map((s, i) => {
                  const Icon = SERVICE_ICONS[i] || Code2;
                  return (
                  <article
                    key={s.title}
                    className={
                      "rounded-xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-900/5 motion-reduce:transform-none dark:bg-stone-900 dark:hover:shadow-black/30 " +
                      (i === 0
                        ? "border-stone-200 border-t-4 border-t-teal-600 dark:border-stone-800 dark:border-t-teal-400"
                        : "border-stone-200 border-t-4 border-t-sky-600 dark:border-stone-800 dark:border-t-sky-400")
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={
                          "flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-bold " +
                          (i === 0
                            ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                            : "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300")
                        }
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{s.title}</h3>
                    </div>
                    <p className="mt-4 text-stone-600 dark:text-stone-400">{s.text}</p>
                    <ul className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex gap-2">
                          <span aria-hidden="true" className={i === 0 ? "text-teal-600 dark:text-teal-400" : "text-sky-600 dark:text-sky-400"}>
                            ▸
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </article>
                  );
                })}
              </div>
            </Section>

            <Section id="projects" title="Projects" eyebrow="02 · Work">
              {spotlight.length > 0 && (
                <div className="mb-14 grid gap-6 md:grid-cols-2">
                  {spotlight.map((p, i) => (
                    <div key={p.id} className={i === 0 ? "md:col-span-2" : "h-full"}>
                      <FeaturedProject project={p} lead={i === 0} />
                    </div>
                  ))}
                </div>
              )}
              <h3 className="mb-4 text-lg font-semibold text-stone-900 dark:text-stone-50">More projects</h3>
              <ProjectGrid projects={rest} onRemove={removeProject} />
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

            <Section id="experience" title="Experience" eyebrow="03 · Career">
              <ExperienceList jobs={EXPERIENCE} />
            </Section>

            <Section id="skills" title="Skills" eyebrow="04 · Toolbox">
              <dl className="grid gap-4 sm:grid-cols-[9.5rem_1fr] sm:gap-x-6">
                {SKILLS.map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt className="font-medium text-stone-900 sm:pt-0.5 dark:text-stone-50">
                      {k}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {splitSkills(v).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
              <dl className="mt-10 grid gap-4 border-t border-stone-200 pt-6 text-sm sm:grid-cols-2 dark:border-stone-800">
                <div>
                  <dt className="font-medium text-stone-900 dark:text-stone-50">Education</dt>
                  <dd className="mt-1 text-stone-600 dark:text-stone-400">{PROFILE.education}</dd>
                </div>
                <div>
                  <dt className="font-medium text-stone-900 dark:text-stone-50">Languages</dt>
                  <dd className="mt-1 text-stone-600 dark:text-stone-400">{PROFILE.languages}</dd>
                </div>
              </dl>
            </Section>

            <Section id="contact" title="Contact" eyebrow="05 · Say hello">
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
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={"mailto:" + PROFILE.email} className={primaryBtn}>
                  Email me
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={outlineBtn}>
                  LinkedIn
                </a>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className={outlineBtn}>
                  GitHub
                </a>
              </div>
            </Section>
          </>
        )}
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-800">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-stone-500 lg:max-w-4xl dark:text-stone-500">
          <p>
            {PROFILE.name} · {PROFILE.title}
            {PROFILE.location ? " · " + PROFILE.location : ""}
          </p>
          <p className="flex gap-4">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className={"hover:text-teal-700 dark:hover:text-teal-300 " + focus}>GitHub</a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={"hover:text-teal-700 dark:hover:text-teal-300 " + focus}>LinkedIn</a>
            <a href={"mailto:" + PROFILE.email} className={"hover:text-teal-700 dark:hover:text-teal-300 " + focus}>Email</a>
          </p>
        </div>
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
