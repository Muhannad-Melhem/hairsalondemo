"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex size-8 items-center justify-center rounded-full bg-background/10 text-background/50 transition-all hover:bg-primary hover:text-background"
      aria-label="Back to top"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
