"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Layla Mansour",
    role: "Regular Client",
    rating: 5,
    content:
      "Absolutely transformative experience. The team here understands hair like no one else. Every visit leaves me feeling like the best version of myself.",
  },
  {
    id: 2,
    name: "Dana Khalil",
    role: "Color Client",
    rating: 5,
    content:
      "The best balayage I have ever had. The attention to detail and colour matching is on another level. I get compliments every single day.",
  },
  {
    id: 3,
    name: "Rania Saadi",
    role: "Regular Client",
    rating: 5,
    content:
      "I drive from Zarqa just to come here. The experience, the products, the stylists — everything is worth the trip. No other salon compares.",
  },
  {
    id: 4,
    name: "Sawsan Hatem",
    role: "Bridal Client",
    rating: 5,
    content:
      "My bridal hair was absolutely perfect. From the trial to the big day, they made me feel like a queen. My photos turned out stunning.",
  },
  {
    id: 5,
    name: "Nour Abdelrahman",
    role: "Treatment Client",
    rating: 5,
    content:
      "The keratin treatment changed my life. My hair is smoother, shinier, and so much easier to manage. The results lasted months.",
  },
  {
    id: 6,
    name: "Hala Issa",
    role: "Regular Client",
    rating: 5,
    content:
      "Best salon experience in Amman. From the warm welcome to the impeccable styling, every detail is considered. This is true luxury.",
  },
];

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
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const prefersReduced = useReducedMotion();
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={
        prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0, 1],
      }}
      className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <Quote className="absolute right-6 top-6 size-8 text-primary/10" />
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {initials}
        </div>
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
    </motion.div>
  );
}

export default function TestimonialsContent() {
  const prefersReduced = useReducedMotion();

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
          initial={
            prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
        >
          <h1 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
            Client Stories
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Don&apos;t take our word for it — hear from the people who trust us
            with their hair. Every review is from a real client.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </section>
    </>
  );
}
