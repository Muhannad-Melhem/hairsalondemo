"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Star, MessageSquare, ArrowRight, Sparkles, Quote } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const prefersReduced = useReducedMotion();
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0, 1] }}
      className="relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <Quote className="absolute right-6 top-6 size-8 text-primary/10" />
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </div>
        )}
        <div>
          <div className="text-sm font-medium text-foreground">
            {testimonial.name}
          </div>
          {testimonial.role && (
            <div className="text-xs text-muted-foreground">
              {testimonial.role}
            </div>
          )}
        </div>
      </div>
      {testimonial.featured && (
        <div className="mt-3 flex items-center gap-1">
          <Sparkles className="size-3 text-primary" />
          <span className="text-xs font-medium text-primary">
            Featured Review
          </span>
        </div>
      )}
    </motion.div>
  );
}

export function TestimonialsContent() {
  const [sort, setSort] = useState<"newest" | "highest" | "lowest">("newest");
  const prefersReduced = useReducedMotion();

  const sorted = useMemo(() => {
    const arr = [...testimonials];
    switch (sort) {
      case "newest":
        return arr.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "highest":
        return arr.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return arr.sort((a, b) => a.rating - b.rating);
      default:
        return arr;
    }
  }, [sort]);

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          alt="Testimonials"
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
          <MessageSquare className="mx-auto mb-4 size-8 text-primary" />
          <h1 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
            Client Reviews
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Don&apos;t take our word for it — hear from the people who trust us
            with their hair. Every review is from a real client.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            Showing {sorted.length} review{sorted.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-1">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                    sort === opt.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={sort}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sorted.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-border/50 bg-muted/30 p-8">
            <h3 className="font-heading text-xl text-foreground">
              Share Your Experience
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Loved your visit? We&apos;d be honoured if you left a review.
              Your feedback helps us keep raising the bar.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  "rounded-full",
                )}
              >
                Leave a Google Review
                <ArrowRight className="ml-1.5 size-3.5" />
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "rounded-full",
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
