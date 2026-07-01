"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainerSlow } from "@/lib/animation";

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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

export function FAQContent() {
  const [search, setSearch] = useState("");
  const [openItem, setOpenItem] = useState<string>("");

  const filtered = useMemo(
    () =>
      faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

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
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenItem("");
            }}
            className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="space-y-3"
        >
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <HelpCircle className="mx-auto size-8 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                No questions found for &ldquo;{search}&rdquo;
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filtered.map((faq) => (
                <motion.div key={faq.id} variants={fadeUp}>
                  <Accordion.Item
                    value={faq.id}
                    className="group rounded-xl border border-border/30 bg-card transition-all hover:border-border data-[state=open]:border-primary/30 data-[state=open]:shadow-sm"
                  >
                    <Accordion.Header className="flex">
                      <Accordion.Trigger className="flex flex-1 items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-primary data-[state=open]:text-primary">
                        <span>{faq.question}</span>
                        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Accordion.Root>

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
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "rounded-full",
              )}
            >
              Contact Us
              <ArrowRight className="ml-1.5 size-3.5" />
            </Link>
            <a
              href="https://wa.me/15555550123"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "rounded-full",
              )}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
