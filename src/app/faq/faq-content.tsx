"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { fadeUp, staggerContainerSlow } from "@/lib/animation";

const faqItems = [
  {
    id: "f1",
    question: "Do I need an appointment?",
    answer:
      "While walk-ins are welcome, we recommend booking in advance to secure your preferred stylist and time slot. You can book online, by phone, or via WhatsApp.",
  },
  {
    id: "f2",
    question: "What products do you use?",
    answer:
      "We exclusively use Kérastase, Olaplex, and Oribe — premium products trusted by top salons worldwide for exceptional results.",
  },
  {
    id: "f3",
    question: "Do you offer bridal services?",
    answer:
      "Yes! Our bridal packages include a trial session, day-of styling, and touch-ups. We recommend booking 4–6 weeks in advance for the best experience.",
  },
  {
    id: "f4",
    question: "Where are you located?",
    answer:
      "We are in Abdoun, Amman — one of the city's most prestigious districts. Free parking is available for all clients.",
  },
  {
    id: "f5",
    question: "What are your working hours?",
    answer:
      "We are open Sunday through Saturday. Sunday and Saturday from 10:00 AM to 8:00 PM, Monday–Wednesday 9:00 AM to 8:00 PM, Thursday 9:00 AM to 9:00 PM, and Friday from 2:00 PM to 9:00 PM.",
  },
  {
    id: "f6",
    question: "Do you accept walk-ins?",
    answer:
      "Yes, but appointments are highly recommended to ensure availability, especially during peak hours and weekends.",
  },
  {
    id: "f7",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, all major credit and debit cards, and mobile payments including Apple Pay and mada.",
  },
  {
    id: "f8",
    question: "Do you have parking?",
    answer:
      "Yes, we offer free parking for all clients in our dedicated lot, conveniently located next to the salon.",
  },
];

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div
        className={`rounded-xl border transition-all duration-300 ${
          isOpen
            ? "border-primary/30 bg-card shadow-sm"
            : "border-border/30 bg-card hover:border-border"
        }`}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
        >
          <span>{item.question}</span>
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQContent() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <>
      <FAQSchema />

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
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Everything you need to know before your visit.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqItems.map((faq) => (
            <AccordionItem
              key={faq.id}
              item={faq}
              isOpen={openItem === faq.id}
              onToggle={() =>
                setOpenItem(openItem === faq.id ? null : faq.id)
              }
            />
          ))}
        </motion.div>

        <div className="mt-16 rounded-2xl border border-border/30 bg-muted/30 p-8 text-center sm:p-10">
          <MessageCircle className="mx-auto size-7 text-primary" />
          <h3 className="mt-4 font-heading text-xl text-foreground">
            Still have questions?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re here to help. Our team typically responds within 2 hours
            during business hours.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
            >
              Contact Us
              <ArrowRight className="size-3.5" />
            </Link>
            <a
              href={SITE.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
