"use client";

import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blurReveal, staggerContainerSlow, easePremium } from "@/lib/animation";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      aria-label="Hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={prefersReduced ? {} : { scale: bgScale, opacity: bgOpacity }}
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/50 to-black/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      <motion.div
        className="pointer-events-none absolute -z-10 size-[500px] rounded-full bg-primary/10 blur-3xl"
        style={{
          left: useTransform(glowX, (v) => `${v * 100}%`),
          top: useTransform(glowY, (v) => `${v * 100}%`),
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"
        style={prefersReduced ? {} : { y: contentY }}
        variants={prefersReduced ? {} : staggerContainerSlow}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={blurReveal}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-1.5 text-xs font-medium tracking-[0.15em] text-white/70 uppercase backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          Toronto&apos;s Premier Salon
        </motion.div>

        <motion.h1
          variants={blurReveal}
          className="font-heading text-5xl leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Where Style
          <br />
          <span className="text-primary">Meets Precision</span>
        </motion.h1>

        <motion.p
          variants={blurReveal}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Experience the art of exceptional hair care in an atmosphere of
          refined luxury. Your journey begins here.
        </motion.p>

        <motion.div
          variants={blurReveal}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/booking"
            className="group inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35"
          >
            Book Your Appointment
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            Explore Services
          </Link>
        </motion.div>

        <motion.div
          variants={blurReveal}
          className="mt-16 flex items-center justify-center gap-2 text-xs text-white/40"
        >
          <span className="size-4 rounded-full border border-white/20 flex items-center justify-center">
            <span className="size-1.5 rounded-full bg-white/40" />
          </span>
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
}
