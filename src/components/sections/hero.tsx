"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  blurReveal,
  staggerContainerSlow,
  easePremium,
} from "@/lib/animation";

const headline = "Where Artistry Meets Elegance";

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 15, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easePremium,
      delay: 0.4 + i * 0.12,
    },
  }),
};

const scrollIndicator: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.8, duration: 0.8, ease: easePremium },
  },
};

export function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero"
      className="grain relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={
          prefersReduced
            ? { opacity: bgOpacity }
            : { scale: bgScale, opacity: bgOpacity }
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Gradient overlay 1: dark from top ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

      {/* ── Gradient overlay 2: side vignette ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* ── Gradient overlay 3: subtle warm gradient ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

      {/* ── Animated light beam ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={
          prefersReduced
            ? {}
            : {
                background: [
                  "linear-gradient(90deg, transparent 0%, transparent 40%, oklch(0.72 0.12 78 / 0.04) 50%, transparent 60%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, transparent 60%, oklch(0.72 0.12 78 / 0.06) 70%, transparent 80%, transparent 100%)",
                  "linear-gradient(90deg, transparent 0%, transparent 40%, oklch(0.72 0.12 78 / 0.04) 50%, transparent 60%, transparent 100%)",
                ],
              }
        }
        transition={
          prefersReduced
            ? {}
            : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* ── Mouse-reactive glow ── */}
      <motion.div
        className="pointer-events-none absolute -z-10 size-[500px] rounded-full bg-primary/10 blur-3xl"
        style={{
          left: useTransform(glowX, (v) => `${v * 100}%`),
          top: useTransform(glowY, (v) => `${v * 100}%`),
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        style={prefersReduced ? {} : { y: contentY }}
        variants={prefersReduced ? {} : staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        {/* ── Badge ── */}
        <motion.div
          variants={blurReveal}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-2 text-xs font-medium tracking-[0.15em] text-white/70 uppercase backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Amman&apos;s Premier Salon
        </motion.div>

        {/* ── Headline with word-by-word reveal ── */}
        <h1 className="font-heading text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              custom={i}
              variants={prefersReduced ? blurReveal : wordReveal}
              initial="hidden"
              animate="visible"
              className="mr-[0.25em] inline-block"
              style={{ perspective: "600px" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* ── Subtitle ── */}
        <motion.p
          variants={blurReveal}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Experience the art of exceptional hair care in an atmosphere of
          refined luxury. Your journey begins in the heart of Amman.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          variants={blurReveal}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/booking"
            className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-primary px-9 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35"
          >
            Book Your Appointment
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-14 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          variants={scrollIndicator}
          initial="hidden"
          animate="visible"
          className="mt-20 flex flex-col items-center gap-3 text-xs text-white/30"
        >
          <span className="tracking-[0.2em] uppercase">Scroll to explore</span>
          <motion.span
            animate={prefersReduced ? {} : { y: [0, 6, 0] }}
            transition={
              prefersReduced
                ? {}
                : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
