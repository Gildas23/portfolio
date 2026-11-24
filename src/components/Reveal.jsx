import { useEffect, useRef, useState } from "react";

// Fades its children up into place the first time they scroll into view.
// Without IntersectionObserver (very old browsers) the content is simply shown.
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      className={"reveal " + (visible ? "is-visible " : "") + className}
      style={delay ? { transitionDelay: delay + "ms" } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
