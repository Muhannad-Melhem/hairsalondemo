"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { fadeUp, buttonMagnetic, easePremium } from "@/lib/animation";

const trustItems = [
  { icon: Sparkles, text: "Free consultation" },
  { icon: ShieldCheck, text: "Satisfaction guaranteed" },
  { icon: Clock, text: "Flexible scheduling" },
];

export function BookingCTA() {
  return (
    <section
      aria-label="Book an appointment"
      className="relative overflow-hidden bg-foreground py-24 sm:py-32"
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, oklch(0.72 0.18 78) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 50%, oklch(0.72 0.18 78) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, oklch(0.72 0.18 78) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.72_0.18_78)_0%,_transparent_50%)] opacity-10" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
            Book Now
          </span>
          <h2 className="mt-4 font-heading text-4xl leading-tight text-background sm:text-5xl lg:text-6xl">
            Ready for Your
            <br />
            Transformation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-background/60">
            Step into a world where every detail is curated for your
            indulgence. Your journey begins with a single appointment.
          </p>

          <motion.div
            className="mt-8"
            whileHover="hover"
            initial="rest"
          >
            <motion.div variants={buttonMagnetic} style={{ display: "inline-block" }}>
              <Link
                href="/booking"
                className="group inline-flex h-13 items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35"
              >
                Book Your Appointment
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-background/50"
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
