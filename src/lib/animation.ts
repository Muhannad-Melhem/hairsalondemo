import type { Variants, Transition } from "framer-motion";

// ── Easing Palette ────────────────────────────────────────────────────
// Emotional variety per the cinematic animation plan
export const easeCinematic: Transition["ease"] = [0.12, 0.7, 0.3, 1];
export const easePremium: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeExit: Transition["ease"] = [0.55, 0, 1, 0.45];
export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.5,
};
export const springSnap: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.4,
};

// ── Section Entrance Variants ────────────────────────────────────────

/** Fade + translate up — default section entrance */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easePremium },
  },
};

/** Scale in from 0.97 + blur → clear — for benefits, cards */
export const fadeScaleBlur: Variants = {
  hidden: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easePremium },
  },
};

/** Blur → sharp reveal — for headlines, hero text */
export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: easeCinematic },
  },
};

/** Clip-path horizontal wipe (inset 100% → 0%) — for images */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, ease: easePremium },
  },
};

/** Clip-path diagonal wipe — for portrait images */
export const clipDiagonal: Variants = {
  hidden: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.9, ease: easePremium },
  },
};

/** Scale + mask reveal — for transformation gallery */
export const scaleMaskReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, clipPath: "inset(10%)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0%)",
    transition: { duration: 0.8, ease: easePremium },
  },
};

// ── Directional Entrance Variants ────────────────────────────────────

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easePremium } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easePremium } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

// ── Stagger Containers ───────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

/** For alternating left/right grid items */
export const staggerAlternate: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ── Text Animations ───────────────────────────────────────────────────

/** Word-by-word entrance for headings */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: easeCinematic },
  },
};

/** Character-by-character entrance (e.g., quote marks) */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easePremium },
  },
};

// ── Micro-interactions ───────────────────────────────────────────────

/** Card hover with elevation + rim light simulation */
export const cardHoverPremium = {
  rest: {
    y: 0,
    boxShadow:
      "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
    transition: { duration: 0.4, ease: easePremium },
  },
  hover: {
    y: -6,
    boxShadow:
      "0 25px 30px -12px rgb(0 0 0 / 0.12), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
    transition: { duration: 0.4, ease: easePremium },
  },
};

/** 3D tilt card hover */
export const cardTilt = {
  rest: { rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: easePremium },
  },
};

/** Button magnetic hover (slight scale + glow) */
export const buttonMagnetic = {
  rest: { scale: 1, boxShadow: "0 0 0 0 rgb(0 0 0 / 0)" },
  hover: {
    scale: 1.04,
    transition: { duration: 0.3, ease: easePremium },
  },
};

/** Gold glow pulse animation properties for popular pricing card */
export const goldGlowAnimate = {
  boxShadow: [
    "0 0 0 0 oklch(0.72 0.18 78 / 0.3)",
    "0 0 20px 4px oklch(0.72 0.18 78 / 0.15)",
    "0 0 0 0 oklch(0.72 0.18 78 / 0.3)",
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// ── Exit Animations ──────────────────────────────────────────────────

export const fadeOutDown: Variants = {
  exit: {
    opacity: 0,
    y: 20,
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

// ── Page Transition ──────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easePremium },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: easeExit },
  },
};
