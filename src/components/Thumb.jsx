import React, { useState } from "react";
import { GRADIENTS } from "../lib/styles";
import { asset } from "../lib/utils";

// Image with a gradient + glyph fallback when the image is missing or fails to load.
export default function Thumb({ src, alt = "", gradient, glyph, className = "" }) {
  const [broken, setBroken] = useState(false);
  return src && !broken ? (
    <img src={asset(src)} alt={alt} loading="lazy" onError={() => setBroken(true)} className={"w-full bg-stone-100 object-cover dark:bg-stone-800 " + className} />
  ) : (
    <div aria-hidden="true" className={"flex w-full items-center justify-center bg-gradient-to-br text-5xl text-white/80 " + (GRADIENTS[gradient] || GRADIENTS.g1) + " " + className}>
      {glyph || "◈"}
    </div>
  );
}
