"use client";

import { useReducedMotion, motion } from "framer-motion";
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
  ZoomIn,
  Check,
} from "lucide-react";

const brands = ["VOGUE", "ELLE", "BAZAAR", "GQ", "MARIE CLAIRE"];

const stylists = [
  {
    name: "Isabella Rossi",
    title: "Master Colorist & Founder",
    specialties: ["Balayage", "Color Correction", "Transformations"],
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80",
  },
  {
    name: "Marcus Chen",
    title: "Senior Stylist",
    specialties: ["Precision Cuts", "Men's Grooming", "Texture"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Sophie Laurent",
    title: "Texture Specialist",
    specialties: ["Curly Hair", "Treatments", "Braiding"],
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
  },
];

const benefits = [
  {
    icon: Scissors,
    title: "Master Stylists",
    description:
      "Our team of award-winning stylists brings years of experience and continuous education to every appointment.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description:
      "We use only the finest professional products from Oribe, Kérastase, and Olaplex for exceptional results.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Experience",
    description:
      "Every consultation is tailored to your unique hair type, lifestyle, and aesthetic goals.",
  },
  {
    icon: ShieldCheck,
    title: "Satisfaction Guaranteed",
    description:
      "We stand behind our work. If you are not delighted, we will make it right — no questions asked.",
  },
];

const transformations = [
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
    alt: "Color transformation before",
  },
  {
    src: "https://images.unsplash.com/photo-1707812343087-c9ff9e5abb43?w=600&q=80",
    alt: "Cut transformation before",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
    alt: "Blowout transformation",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    alt: "Treatment transformation",
  },
];

const pricingPlans = [
  {
    name: "Signature Cut",
    price: 85,
    features: [
      "Complimentary consultation",
      "Precision haircut",
      "Blow-dry & style",
      "Style tips & product samples",
    ],
    popular: false,
  },
  {
    name: "Color & Balayage",
    price: 150,
    features: [
      "Full consultation & color analysis",
      "Custom balayage or all-over color",
      "Olaplex bond treatment",
      "Blow-dry & finish",
      "Follow-up toner visit",
    ],
    popular: true,
  },
  {
    name: "Luxury Package",
    price: 275,
    features: [
      "Signature cut + custom color",
      "Olaplex bond treatment",
      "Luxury hair mask treatment",
      "Blow-dry & styling",
      "Premium product take-home kit",
      "Complimentary glass of champagne",
    ],
    popular: false,
  },
];

export default function HomePage() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <Hero />

      {/* Social Proof */}
      <section aria-label="Featured in" className="border-y border-border/40 bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase"
          >
            Featured In
          </motion.p>
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            whileInView={prefersReduced ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
          >
            {brands.map((brand) => (
              <span
                key={brand}
                className="font-heading text-lg tracking-[0.15em] text-muted-foreground/40 transition-colors hover:text-muted-foreground/70 sm:text-xl"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Stylists */}
      <section aria-label="Our stylists" className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Meet Your Stylists
            </h2>
            <p className="mt-4 text-muted-foreground">
              Artists dedicated to the craft of exceptional hair.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stylists.map((stylist, i) => (
              <motion.article
                key={stylist.name}
                initial={
                  prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }
                }
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: prefersReduced ? 0 : i * 0.15,
                  ease: [0.25, 0.1, 0, 1],
                }}
                className="group relative overflow-hidden rounded-2xl bg-card"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="rounded-full border border-white/40 bg-white/10 px-6 py-2 text-sm text-white backdrop-blur-sm">
                      View Profile
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-foreground">
                    {stylist.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {stylist.title}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stylist.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="mt-12 text-center"
          >
            <Link
              href="/stylists"
              className="group inline-flex items-center gap-2 font-heading text-sm font-medium tracking-wider text-foreground uppercase transition-colors hover:text-primary"
            >
              Meet the Full Team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section aria-label="Why choose us" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="text-center"
          >
            <span className="font-heading text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Why Luxe?
            </span>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              The Luxe Difference
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={
                    prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }
                  }
                  whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: prefersReduced ? 0 : i * 0.12,
                    ease: [0.25, 0.1, 0, 1],
                  }}
                  className="group rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
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
          </div>
        </div>
      </section>

      {/* Statistics */}
      <StatsSection />

      {/* Services Preview */}
      <ServicesPreview />

      {/* Before/After Gallery */}
      <section aria-label="Transformations" className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Transformations
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real results from real clients.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {transformations.map((img, i) => (
              <motion.div
                key={img.src}
                initial={
                  prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.95 }
                }
                whileInView={prefersReduced ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: prefersReduced ? 0 : i * 0.1,
                  ease: [0.25, 0.1, 0, 1],
                }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                  <ZoomIn className="size-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="mt-12 text-center"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 font-heading text-sm font-medium tracking-wider text-foreground uppercase transition-colors hover:text-primary"
            >
              View Full Gallery
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section aria-label="Pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Investment in Excellence
            </h2>
            <p className="mt-4 text-muted-foreground">
              Transparent pricing, exceptional value.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={
                  prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }
                }
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: prefersReduced ? 0 : i * 0.15,
                  ease: [0.25, 0.1, 0, 1],
                }}
                className={`relative rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-primary bg-card shadow-xl shadow-primary/10"
                    : "border-border/50 bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading text-xl text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-4xl text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">+</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Instagram Gallery */}
      <InstagramGallery />

      {/* FAQ */}
      <FAQPreview />

      {/* Booking CTA */}
      <BookingCTA />

      {/* Contact */}
      <ContactSection />
    </>
  );
}
