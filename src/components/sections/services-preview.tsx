"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  clipReveal,
} from "@/lib/animation";

const services = [
  {
    title: "Precision Cut",
    description:
      "Tailored to your face shape and lifestyle. Every cut is a work of art.",
    price: 25,
    duration: 60,
    image:
      "https://images.unsplash.com/photo-1707812343087-c9ff9e5abb43?w=600&q=85",
  },
  {
    title: "Color & Balayage",
    description:
      "From subtle highlights to bold transformations.",
    price: 45,
    duration: 120,
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=85",
  },
  {
    title: "Luxury Treatment",
    description:
      "Deeply restorative treatments that revive and strengthen.",
    price: 35,
    duration: 75,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=85",
  },
  {
    title: "Blow-Dry & Styling",
    description:
      "Perfect blowouts and elegant styling for any occasion.",
    price: 18,
    duration: 45,
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=85",
  },
];

export function ServicesPreview() {
  return (
    <section aria-label="Our Services" className="py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-border/20 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  variants={clipReveal}
                  className="absolute inset-0"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/30 pt-4">
                  <span className="font-heading text-xl text-primary">
                    {formatPrice(service.price)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="size-3.5" />
                    {formatDuration(service.duration)}
                  </span>
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
            href="/services"
            className="group inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:text-primary"
          >
            View All Services
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
