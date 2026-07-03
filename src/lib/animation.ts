import type { Variants, Transition } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   LUXE HAIR STUDIO — CINEMATIC ANIMATION SYSTEM
   Inspired by Apple, Linear, and luxury fashion brands.
   All animations GPU-accelerated (transform + opacity only).
   ═══════════════════════════════════════════════════════════════════ */

// ── Easing Palette ────────────────────────────────────────────────
/** Luxury cinematic ease — feels like a camera dolly */
export const easeCinematic: Transition["ease"] = [0.12, 0.7, 0.3, 1];
/** Premium ease — smooth entrance with slight overshoot */
export const easePremium: Transition["ease"] = [0.16, 1, 0.3, 1];
/** Exit ease — quick departure */
export const easeExit: Transition["ease"] = [0.55, 0, 1, 0.45];
/** Luxury spring — gentle, weighted */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.5,
};
/** Snap spring — precise, editorial */
export const springSnap: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.4,
};

// ── Section Entrance Variants ────────────────────────────────────

/** Fade + translate up — default section entrance */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easePremium },
  },
};

/** Scale in from 0.97 + blur → clear — for benefits, cards */
export const fadeScaleBlur: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easePremium },
  },
};

/** Blur → sharp reveal — for headlines, hero text */
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(16px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1, ease: easeCinematic },
  },
};

/** Clip-path horizontal wipe (inset 100% → 0%) — for images */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: easePremium },
  },
};

/** Clip-path diagonal wipe — for portrait images */
export const clipDiagonal: Variants = {
  hidden: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 1, ease: easePremium },
  },
};

/** Scale + mask reveal — for transformation gallery */
export const scaleMaskReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9, clipPath: "inset(12%)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0%)",
    transition: { duration: 0.9, ease: easePremium },
  },
};

/** Cinematic reveal — scale from 1.1 + blur to sharp */
export const cinematicReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: easeCinematic },
  },
};

// ── Directional Entrance Variants ────────────────────────────────

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easePremium } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easePremium } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easePremium } },
};

// ── Stagger Containers ───────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.2 },
  },
};

/** For alternating left/right grid items */
export const staggerAlternate: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

// ── Text Animations ───────────────────────────────────────────────

/** Word-by-word entrance for headings */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: easeCinematic },
  },
};

/** Character-by-character entrance (e.g., quote marks) */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
};

/** Line reveal — for editorial headlines */
export const lineReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.8, ease: easePremium },
  },
};

// ── Micro-interactions ───────────────────────────────────────────

/** Card hover with elevation + rim light simulation */
export const cardHoverPremium = {
  rest: {
    y: 0,
    boxShadow:
      "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
    transition: { duration: 0.5, ease: easePremium },
  },
  hover: {
    y: -8,
    boxShadow:
      "0 32px 40px -12px rgb(0 0 0 / 0.12), 0 12px 16px -8px rgb(0 0 0 / 0.04)",
    transition: { duration: 0.5, ease: easePremium },
  },
};

/** 3D tilt card hover */
export const cardTilt = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.35, ease: easePremium },
  },
};

/** Button magnetic hover (slight scale + glow) */
export const buttonMagnetic = {
  rest: { scale: 1, boxShadow: "0 0 0 0 rgb(0 0 0 / 0)" },
  hover: {
    scale: 1.05,
    transition: { duration: 0.35, ease: easePremium },
  },
};

/** Gold glow pulse animation properties for popular pricing card */
export const goldGlowAnimate = {
  boxShadow: [
    "0 0 0 0 oklch(0.72 0.14 78 / 0.3)",
    "0 0 32px 6px oklch(0.72 0.14 78 / 0.12)",
    "0 0 0 0 oklch(0.72 0.14 78 / 0.3)",
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// ── Exit Animations ──────────────────────────────────────────────

export const fadeOutDown: Variants = {
  exit: {
    opacity: 0,
    y: 24,
    transition: { duration: 0.3, ease: easeExit },
  },
};

export const scaleOut: Variants = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: easeExit },
  },
};

// ── Page Transition ──────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easePremium },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: easeExit },
  },
};
