"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { fadeUp, slideLeft, slideRight } from "@/lib/animation";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function LocalBusinessSchema() {
  const dayMapping: Record<string, string> = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: SITE.hours.map((h) => {
      const [open, close] = h.hours.split(" — ");
      const days = h.day
        .split(" — ")
        .map((d) => dayMapping[d.trim()] || d.trim());
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: open?.trim(),
        closes: close?.trim(),
      };
    }),
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.tiktok,
    ],
    priceRange: "$$$",
    areaServed: "Amman",
    hasMap: SITE.address.googleMapsUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent successfully! We'll be in touch soon.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <LocalBusinessSchema />

      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-white/70">
            We&apos;d love to hear from you. Whether you&apos;re ready to book
            or just have a question, we&apos;re here.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl text-foreground">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 2
                hours during business hours.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+962 7 9000 1234"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      {...register("subject")}
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Tell us about what you're looking for..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-full text-base font-semibold sm:w-auto sm:px-10"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="size-4" />
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-heading text-2xl text-foreground">
                  Visit Us
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Located in the heart of Abdoun, Amman.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Address
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {SITE.address.street}
                      <br />
                      {SITE.address.city}, {SITE.address.region}{" "}
                      {SITE.address.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Phone
                    </p>
                    <a
                      href={`tel:${SITE.phoneInternational}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Hours
                    </p>
                    <div className="space-y-1">
                      {SITE.hours.map((h) => (
                        <p
                          key={h.day}
                          className="text-sm text-muted-foreground"
                        >
                          <span className="font-medium text-foreground">
                            {h.day}
                          </span>{" "}
                          — {h.hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-all hover:bg-[#20ba5a]"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>

              <div className="overflow-hidden rounded-2xl border border-border/30">
                <div className="aspect-[16/9] w-full bg-muted">
                  <iframe
                    src={SITE.address.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Salon Location"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
