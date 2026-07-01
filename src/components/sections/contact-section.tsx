"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  fadeUp,
  slideLeft,
  slideRight,
  staggerContainer,
  fadeScaleBlur,
} from "@/lib/animation";

export function ContactSection() {
  const prefersReduced = useReducedMotion();
  const mapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mapRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section aria-label="Contact us" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
            Visit Us
          </span>
          <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-3 text-muted-foreground">
            We would love to hear from you. Reach out with any questions.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeScaleBlur} className="flex items-start gap-4">
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
              </motion.div>

              <motion.div variants={fadeScaleBlur} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-foreground">Phone</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {SITE.phone}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeScaleBlur} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-foreground">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {SITE.email}
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeScaleBlur} className="flex items-start gap-4">
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
              </motion.div>
            </motion.div>

            <motion.div
              ref={mapRef}
              variants={fadeScaleBlur}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 overflow-hidden rounded-2xl border border-border/30"
              style={prefersReduced ? {} : { y: mapY }}
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-5 rounded-2xl border border-border/30 bg-card p-8">
              <h3 className="font-heading text-xl">Send Us a Message</h3>
              <p className="text-sm text-muted-foreground">
                Have a question or want to book? We&apos;d love to hear from you.
              </p>
              <Link href="/contact">
                <Button className="w-full" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <div className="border-t border-border/30 pt-4">
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
