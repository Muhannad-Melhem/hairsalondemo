"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Award, ArrowRight } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animation";

const stylists = [
  {
    id: "isabella-rossi",
    name: "Isabella Rossi",
    title: "Master Colorist & Founder",
    specialties: ["Balayage", "Color Correction", "Transformations"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    title: "Senior Stylist",
    specialties: ["Precision Cuts", "Men's Grooming", "Texture"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: "sophie-laurent",
    name: "Sophie Laurent",
    title: "Texture Specialist",
    specialties: ["Curly Hair", "Treatments", "Braiding"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
  },
  {
    id: "nadia-hariri",
    name: "Nadia Hariri",
    title: "Bridal Expert",
    specialties: ["Bridal Styling", "Updos", "Editorial"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  },
  {
    id: "tariq-mansour",
    name: "Tariq Mansour",
    title: "Barber & Grooming",
    specialties: ["Fades", "Beard Sculpting", "Classic Cuts"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  },
  {
    id: "yasmine-khoury",
    name: "Yasmine Khoury",
    title: "Color Artist",
    specialties: ["Fashion Color", "Highlights", "Color Theory"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
  },
];

function StylistCard({ stylist }: { stylist: (typeof stylists)[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={stylist.image}
          alt={stylist.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-white"
          >
            View Profile
            <ArrowRight className="size-3.5" />
          </a>
        </div>
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Star className="size-3 text-primary" />
            {stylist.rating}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl text-foreground">{stylist.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary">{stylist.title}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stylist.specialties.map((s) => (
            <span
              key={s}
              className="inline-block rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function StylistsContent() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&q=80"
          alt="Our stylists"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Award className="mx-auto mb-4 size-8 text-primary" />
          <h1 className="font-heading text-5xl text-white sm:text-6xl md:text-7xl">
            Our Stylists
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Behind every great haircut is a great stylist. Our team brings
            together diverse expertise united by a shared passion for
            exceptional hair.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stylists.map((stylist) => (
            <StylistCard key={stylist.id} stylist={stylist} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
