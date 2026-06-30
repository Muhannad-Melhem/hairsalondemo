"use client";

import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const easeOut = [0.25, 0.1, 0, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const animProps = prefersReduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {};

  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -z-10 will-change-transform"
        style={prefersReduced ? {} : { scale }}
      >
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      <motion.div
        className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        {...animProps}
      >
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              animate={prefersReduced ? {} : { scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative inline-flex size-2 rounded-full bg-green-400" />
          </span>
          Now Accepting New Clients
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Where Style
          <br />
          Meets Precision
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          Experience the art of exceptional hair care in an atmosphere of
          refined luxury. Your journey to extraordinary style begins here.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/booking"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
          >
            Book Your Appointment
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-8 text-base font-semibold text-white transition-all hover:bg-white/10"
          >
            Explore Services
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8"
        >
          <div className="flex items-center gap-2 text-white/90">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium">4.9</span>
            <span className="text-sm text-white/60">(287 reviews)</span>
          </div>
          <div className="hidden h-4 w-px bg-white/20 sm:block" />
          <div className="flex items-center gap-2 text-sm text-white/80">
            <CheckCircle className="size-4 text-primary" />
            Toronto&apos;s Top-Rated Salon 2024
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
