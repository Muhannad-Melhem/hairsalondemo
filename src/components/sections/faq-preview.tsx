"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer, easePremium } from "@/lib/animation";

const faqs = [
  {
    question: "Do I need an appointment?",
    answer:
      "While walk-ins are welcome, we recommend booking in advance to ensure availability with your preferred stylist.",
  },
  {
    question: "What products do you use?",
    answer:
      "We exclusively use premium professional products from Kérastase, Olaplex, and Oribe.",
  },
  {
    question: "Do you offer bridal services?",
    answer:
      "Yes! Our bridal packages include a trial session, day-of styling, and touch-ups.",
  },
  {
    question: "Where are you located?",
    answer:
      "We are located in Abdoun, Amman. Free parking available for all clients.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-xl border transition-colors duration-300 ${
        isOpen
          ? "border-primary/30 bg-card shadow-md"
          : "border-border/30 bg-card"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`font-heading text-base transition-colors ${
            isOpen ? "text-primary" : "text-foreground"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easePremium }}
        >
          <ChevronDown
            className={`size-4 shrink-0 transition-colors ${
              isOpen ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easePremium }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-sm leading-relaxed text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Frequently asked questions" className="py-32 sm:py-40">
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
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
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
            <ChevronDown className="size-3.5 -rotate-90 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
