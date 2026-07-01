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
  ZoomIn,
  Check,
} from "lucide-react";
import {
  fadeUp,
  fadeScaleBlur,
  staggerContainer,
  staggerContainerSlow,
  staggerAlternate,
  clipDiagonal,
  scaleMaskReveal,
  cardHoverPremium,
  goldGlowAnimate,
} from "@/lib/animation";

const stylists = [
  {
    name: "Isabella Rossi",
    title: "Master Colorist & Founder",
    specialties: ["Balayage", "Color Correction", "Transformations"],
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=85",
    rating: 4.9,
  },
  {
    name: "Marcus Chen",
    title: "Senior Stylist",
    specialties: ["Precision Cuts", "Men's Grooming", "Texture"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    rating: 4.8,
  },
  {
    name: "Sophie Laurent",
    title: "Texture Specialist",
    specialties: ["Curly Hair", "Treatments", "Braiding"],
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=85",
    rating: 4.9,
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
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=85",
    alt: "Color transformation",
  },
  {
    src: "https://images.unsplash.com/photo-1707812343087-c9ff9e5abb43?w=600&q=85",
    alt: "Cut transformation",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=85",
    alt: "Blowout styling",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85",
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
  return (
    <>
      <Hero />

      <section aria-label="Our stylists" className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Meet the Team
            </span>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Your Stylists
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Artists dedicated to the craft of exceptional hair.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stylists.map((stylist) => (
              <motion.article
                key={stylist.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/30"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.div
                    variants={clipDiagonal}
                    className="absolute inset-0"
                  >
                    <Image
                      src={stylist.image}
                      alt={stylist.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Link
                      href="/stylists"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      View Profile
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-base text-foreground">
                        {stylist.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {stylist.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-500">
                      <Star className="size-3.5 fill-amber-500" />
                      {stylist.rating}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stylist.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-primary/8 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/stylists"
              className="group inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:text-primary"
            >
              Meet the Full Team
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

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
                  className="group rounded-2xl border border-border/30 bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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

      <StatsSection />

      <ServicesPreview />

      <section aria-label="Transformations" className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Portfolio
            </span>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Transformations
            </h2>
            <p className="mt-3 text-muted-foreground">
              Real results from real clients.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-4 sm:grid-cols-2"
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {transformations.map((img) => (
              <motion.div
                key={img.src}
                variants={scaleMaskReveal}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/40">
                  <ZoomIn className="size-7 text-white opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:text-primary"
            >
              View Full Gallery
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section aria-label="Pricing" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Investment
            </span>
            <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Transparent Pricing
            </h2>
            <p className="mt-3 text-muted-foreground">
              Exceptional value, no surprises.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                className={`relative rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-primary bg-card shadow-xl shadow-primary/10"
                    : "border-border/30 bg-card"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    animate={goldGlowAnimate}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground"
                  >
                    Most Popular
                  </motion.div>
                )}
                <motion.div
                  variants={cardHoverPremium}
                  style={{ borderRadius: "inherit" }}
                >
                  <h3 className="font-heading text-xl text-foreground">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-0.5">
                    <span className="font-heading text-4xl text-foreground">
                      ${plan.price}
                    </span>
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
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-all ${
                      plan.popular
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                        : "border border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    Book Now
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TestimonialsCarousel />

      <InstagramGallery />

      <FAQPreview />

      <BookingCTA />

      <ContactSection />
    </>
  );
}
