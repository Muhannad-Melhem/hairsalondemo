"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, Scissors, Palette, Heart, Crown, Star } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animation";

const services = [
  {
    id: "precision-cut",
    name: "Precision Cut",
    description: "A meticulous cut tailored to your face shape, hair texture, and lifestyle. Includes consultation, wash, and blow-dry.",
    price: 25,
    duration: 60,
    category: "Haircuts",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
  },
  {
    id: "mens-grooming",
    name: "Men's Grooming",
    description: "Sharp, modern cuts crafted with clipper and scissor techniques. Includes wash, cut, and style.",
    price: 20,
    duration: 45,
    category: "Haircuts",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
  },
  {
    id: "childrens-cut",
    name: "Children's Cut",
    description: "Gentle, fun haircuts for kids in a comfortable environment. Our stylists make it an enjoyable experience.",
    price: 15,
    duration: 30,
    category: "Haircuts",
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&q=80",
  },
  {
    id: "full-color",
    name: "Full Color",
    description: "All-over permanent or demi-permanent color for vibrant, long-lasting results. Gray coverage available.",
    price: 35,
    duration: 90,
    category: "Color",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  },
  {
    id: "balayage",
    name: "Balayage",
    description: "Hand-painted highlights for a sun-kissed, dimensional look. Customized to complement your skin tone and style.",
    price: 45,
    duration: 120,
    category: "Color",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
  },
  {
    id: "highlights",
    name: "Highlights",
    description: "Comprehensive foiling technique for full-head brightness and dimension. Includes toner and gloss finish.",
    price: 40,
    duration: 100,
    category: "Color",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
  },
  {
    id: "color-correction",
    name: "Color Correction",
    description: "Expert corrective color to fix uneven, brassy, or unwanted tones. A transformative service that restores your ideal shade.",
    price: 55,
    duration: 150,
    category: "Color",
    image: "https://images.unsplash.com/photo-1717160675489-7779f2c91999?w=800&q=80",
  },
  {
    id: "keratin-smoothing",
    name: "Keratin Smoothing",
    description: "Smoothing treatment that eliminates frizz and adds incredible shine. Results last up to 3 months.",
    price: 65,
    duration: 150,
    category: "Treatments",
    image: "https://images.unsplash.com/photo-1717160675489-7779f2c91999?w=800&q=80",
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning",
    description: "Intensive moisture treatment that restores vitality and softness to dry or damaged hair.",
    price: 20,
    duration: 30,
    category: "Treatments",
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&q=80",
  },
  {
    id: "scalp-treatment",
    name: "Scalp Treatment",
    description: "Therapeutic scalp care addressing dryness, oiliness, or sensitivity. Includes massage and customized serum.",
    price: 25,
    duration: 45,
    category: "Treatments",
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
  },
  {
    id: "blowdry-style",
    name: "Blow-Dry & Style",
    description: "Professional blow-dry and styling for any occasion. Choose from sleek, voluminous, or textured finishes.",
    price: 18,
    duration: 45,
    category: "Styling",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  },
  {
    id: "updo-special",
    name: "Updo / Special Occasion",
    description: "Elegant updos for weddings, galas, or any special event. Consultation and trial included.",
    price: 30,
    duration: 60,
    category: "Styling",
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
  },
  {
    id: "bridal-hair",
    name: "Bridal Hair",
    description: "Exquisite bridal hair styling tailored to your vision. Includes trial and day-of styling for your perfect look.",
    price: 80,
    duration: 120,
    category: "Styling",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80",
  },
  {
    id: "bridal-package",
    name: "Bridal Package",
    description: "Comprehensive bridal hair service including consultation, trial, and day-of styling. Travel fee may apply.",
    price: 120,
    duration: 180,
    category: "Special Occasion",
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80",
  },
  {
    id: "party-styling",
    name: "Party Styling",
    description: "Glamorous styling for parties, events, and celebrations. Walk out feeling like the best version of you.",
    price: 35,
    duration: 60,
    category: "Special Occasion",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
  },
];

const categories = [
  { name: "Haircuts", icon: Scissors },
  { name: "Color", icon: Palette },
  { name: "Treatments", icon: Heart },
  { name: "Styling", icon: Sparkles },
  { name: "Special Occasion", icon: Crown },
];

const tabs = ["All", ...categories.map((c) => c.name)];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-64 overflow-hidden sm:h-auto sm:w-2/5">
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading={index < 3 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <h3 className="font-heading text-2xl text-foreground">{service.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-4 text-primary" />
                {formatDuration(service.duration)}
              </span>
            </div>
            <span className="font-heading text-2xl text-primary">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=85"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <motion.div
          className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-heading text-5xl text-white sm:text-6xl md:text-7xl">
            Our Services
          </h1>
          <p className="mt-6 text-lg text-white/70">
            Every service is crafted with precision, using premium products and
            techniques that honour the health and beauty of your hair.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => {
            const cat = categories.find((c) => c.name === tab);
            const Icon = cat?.icon;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {Icon && <Icon className="size-4" />}
                {tab}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Star className="mx-auto mb-4 size-8 text-primary" />
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              Not Sure Which Service Is Right for You?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Book a complimentary consultation and our expert stylists will guide you
              to the perfect service for your hair goals.
            </p>
            <a
              href="/booking"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30"
            >
              Book a Consultation
              <Sparkles className="size-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
