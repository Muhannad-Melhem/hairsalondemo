"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Camera, Award, Sparkles, ArrowRight, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { stylists } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Stylist } from "@/types";

function StylistCard({ stylist, index }: { stylist: Stylist; index: number }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative h-80 overflow-hidden sm:h-96">
        <Image
          src={stylist.image}
          alt={stylist.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-1.5">
            {stylist.specialties.map((s) => (
              <span
                key={s}
                className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {stylist.instagram && (
          <a
            href={stylist.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 group-hover:opacity-100"
            aria-label={`${stylist.name}'s Instagram`}
          >
            <Camera className="size-4" />
          </a>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-xl text-foreground">{stylist.name}</h3>
            <p className="text-sm text-primary font-medium">{stylist.title}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Star className="size-3 text-primary" />
            {stylist.experience} yrs
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {stylist.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5 max-sm:hidden">
          {stylist.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="inline-block rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
          {stylist.specialties.length > 3 && (
            <span className="inline-block rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
              +{stylist.specialties.length - 3}
            </span>
          )}
        </div>
        <Link
          href="/booking"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "mt-5 h-10 w-full rounded-full text-sm font-semibold",
          )}
        >
          Book with {stylist.name.split(" ")[0]}
          <ArrowRight className="ml-1.5 size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export function StylistsContent() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&q=80"
          alt="Our stylists"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
        >
          <Award className="mx-auto mb-4 size-8 text-primary" />
          <h1 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
            Meet Our Team
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Behind every great haircut is a great stylist. Our team brings
            together diverse expertise united by a shared passion for
            exceptional hair.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stylists.map((stylist, i) => (
            <StylistCard key={stylist.id} stylist={stylist} index={i} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
