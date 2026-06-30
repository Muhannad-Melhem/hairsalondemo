"use client";

import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Clock } from "lucide-react";

const trustItems = [
  { icon: CalendarCheck, text: "Free consultation" },
  { icon: ShieldCheck, text: "Satisfaction guaranteed" },
  { icon: Clock, text: "Flexible scheduling" },
];

export function BookingCTA() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-label="Book an appointment"
      className="relative overflow-hidden bg-foreground py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-primary)_0%,_transparent_50%)] opacity-10" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
        >
          <h2 className="font-heading text-4xl leading-tight text-background sm:text-5xl lg:text-6xl">
            Ready for Your
            <br />
            Transformation?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-background/70">
            Step into a world where every detail is curated for your
            indulgence. Your journey to extraordinary hair begins with a
            single appointment.
          </p>

          <div className="mt-10">
            <Link
              href="/booking"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
            >
              Book Your Appointment
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-background/60"
                >
                  <Icon className="size-4 text-primary" />
                  {item.text}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
