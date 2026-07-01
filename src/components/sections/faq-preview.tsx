"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { ArrowRight, Plus } from "lucide-react";
import { fadeUp, staggerContainer, easePremium } from "@/lib/animation";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book online through our website, call us directly, or visit the salon in person. We recommend booking at least a week in advance to secure your preferred time slot.",
  },
  {
    question: "What products do you use?",
    answer:
      "We exclusively use premium, professional-grade products from Oribe, Kérastase, and Olaplex. Our commitment to quality means your hair receives the very best care possible.",
  },
  {
    question: "How should I prepare for my appointment?",
    answer:
      "Arrive with clean, dry hair for color services. For cuts, we prefer to work with your natural texture. Bring photos for inspiration, and arrive 10 minutes early to complete any paperwork.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require 24 hours notice for cancellations or rescheduling. Late cancellations may incur a 50% fee. We understand life happens, so please just let us know as soon as possible.",
  },
  {
    question: "Do you offer consultations?",
    answer:
      "Absolutely. We offer complimentary consultations for all new clients. This allows us to understand your goals, assess your hair, and create a personalized plan before your appointment.",
  },
];

export function FAQPreview() {
  return (
    <section aria-label="Frequently asked questions" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-heading text-xs font-semibold tracking-[0.25em] text-primary uppercase">
            FAQ
          </span>
          <h2 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to know before your visit.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 space-y-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={faq.question} variants={fadeUp}>
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-xl border border-border/30 bg-card transition-shadow data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="group flex w-full items-center justify-between px-6 py-4 text-left font-heading text-base transition-colors data-[state=open]:text-primary text-foreground hover:text-primary">
                    <motion.span
                      layout
                      transition={{ duration: 0.3, ease: easePremium }}
                    >
                      {faq.question}
                    </motion.span>
                    <Plus className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden data-[state=closed]:animate-[accordion-up_250ms_ease] data-[state=open]:animate-[accordion-down_250ms_ease]">
                    <div className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.2em] text-foreground uppercase transition-colors hover:text-primary"
          >
            View All FAQs
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
