"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    content:
      "Absolutely transformative experience. From the moment I walked in, I felt like royalty. My stylist listened to exactly what I wanted and delivered beyond my expectations.",
    name: "Sarah Mitchell",
    role: "Regular Client",
    rating: 5,
  },
  {
    content:
      "The best balayage I have ever had. The color is dimensional, natural, and exactly what I envisioned. I have never received so many compliments on my hair.",
    name: "Jessica Chen",
    role: "Color Client",
    rating: 5,
  },
  {
    content:
      "I drive from Oakville just to come here. The attention to detail, the atmosphere, the professionalism — it is unmatched. Worth every penny.",
    name: "Amanda Foster",
    role: "Loyal Client since 2019",
    rating: 5,
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
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
      intervalRef.current = setInterval(() => {
        paginate(1);
      }, 5000);
    }
  }, [paginate, prefersReduced, isPaused]);

  useEffect(() => {
    if (prefersReduced) return;
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paginate, prefersReduced]);

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
    <section aria-label="Testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real stories from real people who trust us with their hair.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
          className="relative mx-auto mt-16 max-w-3xl"
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
            className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border/50 bg-card p-8 sm:p-12"
            aria-live="polite"
            aria-atomic="true"
          >
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
                    : { duration: 0.4, ease: [0.25, 0.1, 0, 1] }
                }
                className="text-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
              >
                <div className="flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <cite className="not-italic">
                    <span className="font-heading text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      — {testimonial.role}
                    </span>
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => handlePaginate(-1)}
            className="absolute top-1/2 -left-4 -translate-y-1/2 rounded-full border border-border/50 bg-background p-2 text-foreground shadow-sm transition-colors hover:bg-muted"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => handlePaginate(1)}
            className="absolute top-1/2 -right-4 -translate-y-1/2 rounded-full border border-border/50 bg-background p-2 text-foreground shadow-sm transition-colors hover:bg-muted"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground/40"
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
