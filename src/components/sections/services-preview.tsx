"use client";

import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";

const services = [
  {
    title: "Precision Cut",
    description:
      "Tailored to your face shape and lifestyle. Every cut is a work of art, executed with surgical precision.",
    price: 85,
    duration: 60,
    image:
      "https://images.unsplash.com/photo-1707812343087-c9ff9e5abb43?w=600&q=80",
  },
  {
    title: "Color & Balayage",
    description:
      "From subtle highlights to bold transformations. Our colorists create dimensional, luminous results.",
    price: 150,
    duration: 120,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
  },
  {
    title: "Luxury Treatments",
    description:
      "Deeply restorative treatments that revive, strengthen, and transform your hair from root to tip.",
    price: 120,
    duration: 75,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
  {
    title: "Blow-Dry & Styling",
    description:
      "Perfect blowouts and elegant styling for any occasion. Walk out feeling like the best version of you.",
    price: 65,
    duration: 45,
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
  },
];

const easeOut = [0.25, 0.1, 0, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export function ServicesPreview() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-label="Our Services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={
            prefersReduced ? {} : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="text-center"
        >
          <span className="font-heading text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Our Services
          </span>
          <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Crafting Beauty, One
            <br />
            Strand at a Time
          </h2>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={prefersReduced ? {} : containerVariants}
          initial={prefersReduced ? {} : "hidden"}
          whileInView={prefersReduced ? {} : "visible"}
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={prefersReduced ? {} : cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-shadow duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                  <span className="font-heading text-xl text-primary">
                    {formatPrice(service.price)}+
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDuration(service.duration)}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0, 1] }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-heading text-sm font-medium tracking-wider text-foreground uppercase transition-colors hover:text-primary"
          >
            View All Services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
