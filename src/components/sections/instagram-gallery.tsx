"use client";

import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Camera, ExternalLink } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80",
    alt: "Balayage hair color",
  },
  {
    src: "https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=400&q=80",
    alt: "Haircut styling",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80",
    alt: "Blowout styling",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    alt: "Hair treatment",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
    alt: "Salon interior",
  },
  {
    src: "https://images.unsplash.com/photo-1633681926026-84c23e8cb2d6?w=400&q=80",
    alt: "Hair styling session",
  },
];

const easeOut = [0.25, 0.1, 0, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function InstagramGallery() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      aria-label="Instagram gallery"
      className="bg-muted/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="text-center"
        >
          <Link
            href="https://instagram.com/luxehairstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-heading text-2xl text-foreground transition-colors hover:text-primary sm:text-3xl"
          >
            Follow Us @luxehairstudio
            <ExternalLink className="size-5 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
          variants={prefersReduced ? {} : containerVariants}
          initial={prefersReduced ? {} : "hidden"}
          whileInView={prefersReduced ? {} : "visible"}
          viewport={{ once: true }}
        >
          {images.map((img) => (
            <motion.div
              key={img.src}
              variants={prefersReduced ? {} : imageVariants}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                <Camera className="size-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
