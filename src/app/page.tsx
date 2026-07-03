"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { StatsSection } from "@/components/sections/stats-section";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { BookingCTA } from "@/components/sections/booking-cta";
import { FAQPreview } from "@/components/sections/faq-preview";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { ContactSection } from "@/components/sections/contact-section";
import {
  ArrowRight,
  Star,
  Scissors,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  fadeUp,
  fadeScaleBlur,
  staggerContainer,
  staggerContainerSlow,
} from "@/lib/animation";

const benefits = [
  {
    icon: Scissors,
    title: "Master Stylists",
    description: "Our award-winning stylists bring years of experience.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description: "We use Kérastase, Olaplex, and Oribe.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Experience",
    description: "Every consultation tailored to you.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="section-divider" />

      <StatsSection />

      <div className="section-divider" />

      <ServicesPreview />

      <div className="section-divider" />

      <section aria-label="Why choose us" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Why Luxe?
            </span>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              The Luxe Difference
            </h2>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={fadeScaleBlur}
                  className="group rounded-2xl border border-border/20 bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      <TestimonialsCarousel />

      <div className="section-divider" />

      <InstagramGallery />

      <div className="section-divider" />

      <FAQPreview />

      <div className="section-divider" />

      <BookingCTA />

      <div className="section-divider" />

      <ContactSection />
    </>
  );
}
