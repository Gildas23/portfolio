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
      view: "home", // "home" | "blog"
      showAll: false,
      saveError: false,

      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setView: (view) => set({ view }),
      toggleShowAll: () => set((s) => ({ showAll: !s.showAll })),
      addProject: (p) => set((s) => ({ projects: [...s.projects, p] })),
      removeProject: (id) => set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
      addPost: (p) => set((s) => ({ posts: [...s.posts, p] })),
      removePost: (id) => set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
    }),
    {
      name: "portfolio",
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ theme: s.theme, projects: s.projects, posts: s.posts }),
    }
  )
);
