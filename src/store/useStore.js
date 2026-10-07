import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      if (useStore.getState().saveError) useStore.setState({ saveError: false });
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
  typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const useStore = create(
  persist(
    (set) => ({
      // persisted
      theme: systemTheme(),
      projects: [],
      posts: [],
      // session only
      view: "home", // "home" | "blog" | "post"
      slug: null,
      skill: null,
      showAll: false,
      editMode: false, // owner tools (add/remove), toggled with Alt+N
      saveError: false,

      toggleEdit: () => set((s) => ({ editMode: !s.editMode })),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setRoute: (r) => set({ view: r.view, slug: r.slug, skill: r.skill }),
      toggleShowAll: () => set((s) => ({ showAll: !s.showAll })),
      addProject: (p) => set((s) => ({ projects: [...s.projects, p] })),
      removeProject: (id) => set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
      addPost: (p) => set((s) => ({ posts: [...s.posts, p] })),
      removePost: (id) => set((s) => ({ posts: s.posts.filter((p) => p.slug !== id) })),
    }),
    {
      name: "portfolio",
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ theme: s.theme, projects: s.projects, posts: s.posts }),
    }
  )
);
