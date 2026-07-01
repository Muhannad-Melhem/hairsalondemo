"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Camera, ExternalLink } from "lucide-react";
import { fadeUp, staggerContainer, slideLeft, slideRight } from "@/lib/animation";

const images = [
  {
    src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&q=85",
    alt: "Balayage hair color",
  },
  {
    src: "https://images.unsplash.com/photo-1707812343087-c9ff9e5abb43?w=500&q=85",
    alt: "Haircut styling",
  },
  {
    src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&q=85",
    alt: "Blowout styling",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=85",
    alt: "Hair treatment",
  },
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=85",
    alt: "Salon interior",
  },
  {
    src: "https://images.unsplash.com/photo-1722935408489-2bf93349c8cb?w=500&q=85",
    alt: "Hair styling session",
  },
];

export function InstagramGallery() {
  return (
    <section aria-label="Instagram gallery" className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="https://instagram.com/luxehairstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-heading text-2xl text-foreground transition-colors hover:text-primary sm:text-3xl"
          >
            Follow Us @luxehairstudio
            <ExternalLink className="size-4 opacity-50 transition-opacity group-hover:opacity-100" />
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Behind the scenes, transformations, and daily inspiration
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              variants={i % 2 === 0 ? slideLeft : slideRight}
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
                <Camera className="size-7 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
