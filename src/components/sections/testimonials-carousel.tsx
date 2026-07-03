"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { fadeUp, easePremium } from "@/lib/animation";

const testimonials = [
  {
    content:
      "Absolutely transformative experience. From the moment I walked in, I felt like royalty. My stylist listened to exactly what I wanted and delivered beyond my expectations.",
    name: "Layla Mansour",
    role: "Regular Client",
    rating: 5,
    avatar: "LM",
  },
  {
    content:
      "The best balayage I have ever had. The color is dimensional, natural, and exactly what I envisioned. I have never received so many compliments on my hair.",
    name: "Dana Khalil",
    role: "Color Client",
    rating: 5,
    avatar: "DK",
  },
  {
    content:
      "I drive from Zarqa just to come here. The attention to detail, the atmosphere, the professionalism — it is unmatched. Worth every penny.",
    name: "Rania Saadi",
    role: "Loyal Client since 2020",
    rating: 5,
    avatar: "RS",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

export function TestimonialsCarousel() {
  const prefersReduced = useReducedMotion();
  const [[index, direction], setIndex] = useState([0, 0]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((newDirection: number) => {
    setIndex((prev) => {
      const next =
        (prev[0] + newDirection + testimonials.length) %
        testimonials.length;
      return [next, newDirection];
    });
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!prefersReduced && !isPaused) {
      intervalRef.current = setInterval(() => paginate(1), 6000);
    }
  }, [paginate, prefersReduced, isPaused]);

  useEffect(() => {
    if (prefersReduced) return;
    intervalRef.current = setInterval(() => paginate(1), 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [prefersReduced, paginate]);

  const handlePaginate = useCallback(
    (dir: number) => {
      paginate(dir);
      resetTimer();
    },
    [paginate, resetTimer],
  );

  const handleDotClick = useCallback(
    (i: number) => {
      setIndex((prev) => [i, i > prev[0] ? 1 : -1]);
      resetTimer();
    },
    [resetTimer],
  );

  const testimonial = testimonials[index];

  return (
    <section aria-label="Testimonials" className="py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
            Testimonials
          </span>
          <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real stories from real people who trust us with their hair.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto mt-16 max-w-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            resetTimer();
          }}
          onFocus={() => setIsPaused(true)}
          onBlur={() => {
            setIsPaused(false);
            resetTimer();
          }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-border/30 bg-card p-10 sm:p-14"
            aria-live="polite"
            aria-atomic="true"
          >
            <motion.div
              initial={prefersReduced ? {} : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: easePremium }}
              className="absolute top-6 left-6"
            >
              <Quote className="size-8 text-primary/10" />
            </motion.div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={prefersReduced ? {} : slideVariants}
                initial={prefersReduced ? { opacity: 1 } : "enter"}
                animate="center"
                exit={prefersReduced ? { opacity: 1 } : "exit"}
                transition={
                  prefersReduced
                    ? {}
                    : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                }
                className="text-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
              >
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground/80 sm:text-xl">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div className="text-left">
                    <cite className="not-italic font-heading text-sm text-foreground">
                      {testimonial.name}
                    </cite>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => handlePaginate(-1)}
            className="absolute top-1/2 -left-3 -translate-y-1/2 rounded-full border border-border/30 bg-background p-2 text-foreground shadow-sm transition-all hover:bg-muted hover:shadow-md"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => handlePaginate(1)}
            className="absolute top-1/2 -right-3 -translate-y-1/2 rounded-full border border-border/30 bg-background p-2 text-foreground shadow-sm transition-all hover:bg-muted hover:shadow-md"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-4" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`rounded-full transition-all ${
                  i === index
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
