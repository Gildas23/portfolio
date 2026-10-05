export const fileToThumb = (file) =>
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

export const formatDate = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

// Hash routes: "#/blog", "#/blog/<slug>", "#/blog?skill=<name>". Anything else is the home page.
export const parseHash = () => {
  const m = window.location.hash.match(/^#\/blog(?:\/([^?/]+))?(?:\?skill=(.*))?$/);
  if (!m) return { view: "home", slug: null, skill: null };
  const dec = (v) => (v ? decodeURIComponent(v) : null);
  return { view: m[1] ? "post" : "blog", slug: dec(m[1]), skill: dec(m[2]) };
};

export const navigate = (hash) => {
  window.history.pushState(null, "", hash || window.location.pathname);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};
