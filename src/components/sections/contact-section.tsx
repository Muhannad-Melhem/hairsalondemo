"use client";

import Link from "next/link";
import { useReducedMotion, motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export function ContactSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section aria-label="Contact us" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0, 1] }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-muted-foreground">
            We would love to hear from you. Reach out with any questions.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-foreground">Address</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.region}{" "}
                  {SITE.address.postcode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-foreground">Phone</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {SITE.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Mail className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-foreground">Email</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {SITE.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-foreground">Hours</h3>
                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  {SITE.hours.map((item) => (
                    <p key={item.day}>
                      <span className="text-foreground">{item.day}</span> —{" "}
                      {item.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.3!2d-79.3!3d43.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM2JzAwLjAiTiA3OcKwMTgnMDAuMCJX!5e0!3m2!1sen!2sca!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon Location"
                className="rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, x: 30 }}
            whileInView={prefersReduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.1, 0, 1],
            }}
          >
            <div className="space-y-5 rounded-2xl border border-border/50 bg-card p-8">
              <h3 className="font-heading text-xl">Send Us a Message</h3>
              <p className="text-sm text-muted-foreground">
                Have a question or want to book? We&apos;d love to hear from you.
              </p>
              <Link href="/contact">
                <Button className="w-full" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <div className="border-t border-border/50 pt-4">
                <p className="mb-3 text-sm text-muted-foreground">
                  Or reach us directly:
                </p>
                <div className="space-y-2 text-sm">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="block text-foreground transition-colors hover:text-primary"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="block text-foreground transition-colors hover:text-primary"
                  >
                    {SITE.email}
                  </a>
                  <p className="text-muted-foreground">
                    {SITE.address.street}, {SITE.address.city}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
