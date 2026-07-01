"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { services, categories } from "@/lib/data";
import { cn, formatPrice, formatDuration } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animation";
import type { Service } from "@/types";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden sm:h-64">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-105"
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Clock className="size-3" />
            {formatDuration(service.duration)}
          </span>
          <span className="ml-auto inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            {formatPrice(service.price)}
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-heading text-xl text-foreground">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <Link
          href="/booking"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "mt-5 h-10 w-full rounded-full text-sm font-semibold",
          )}
        >
          Book Now
          <ArrowRight className="ml-1.5 size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export function ServicesContent() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Every service is crafted with precision, using premium products and
            techniques that honour the health and beauty of your hair.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Tabs.Root
          value={activeTab}
          onValueChange={setActiveTab}
          className="mx-auto max-w-5xl"
        >
          <Tabs.List className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Tabs.Trigger
                key={cat}
                value={cat}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/20",
                  "data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground hover:data-[state=inactive]:bg-muted/80 hover:data-[state=inactive]:text-foreground",
                )}
              >
                {cat}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value={activeTab} className="focus-visible:outline-none">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((service, i) => (
                <ServiceCard key={service.id} service={service} index={i} />
              ))}
            </motion.div>
          </Tabs.Content>
        </Tabs.Root>
      </section>
    </>
  );
}
