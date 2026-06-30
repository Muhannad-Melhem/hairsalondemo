"use client";

import { useRef } from "react";
import {
  useReducedMotion,
  useInView,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const stats = [
  { value: 15000, label: "Happy Clients", suffix: "+" },
  { value: 10, label: "Years Excellence", suffix: "+" },
  { value: 12, label: "Master Stylists", suffix: "" },
  { value: 4.9, label: "Average Rating", suffix: "★", isDecimal: true },
];

function AnimatedCounter({
  value,
  suffix,
  isDecimal,
}: {
  value: number;
  suffix: string;
  isDecimal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  const rounded = useTransform(springValue, (latest) => {
    if (isDecimal) return latest.toFixed(1);
    return Math.floor(latest).toString();
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      aria-label="Statistics"
      className="border-y border-border/40 bg-muted/30 py-20 sm:py-24"
    >
      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={
                prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }
              }
              animate={
                prefersReduced || inView
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.7,
                delay: prefersReduced ? 0 : index * 0.15,
                ease: [0.25, 0.1, 0, 1],
              }}
              className="text-center"
            >
              <span className="font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
                {prefersReduced ? (
                  <span>
                    {stat.value}
                    {stat.suffix}
                  </span>
                ) : (
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                )}
              </span>
              <p className="mt-2 text-sm font-medium text-muted-foreground tracking-wider uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
