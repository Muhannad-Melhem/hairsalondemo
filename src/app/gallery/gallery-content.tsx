"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { easePremium } from "@/lib/animation";

const galleryImages = [
  { id: "g1", src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80", alt: "Balayage transformation", category: "Color" },
  { id: "g2", src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80", alt: "Blunt bob haircut", category: "Cuts" },
  { id: "g3", src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80", alt: "Bridal updo", category: "Styling" },
  { id: "g4", src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80", alt: "Full highlight and toner", category: "Color" },
  { id: "g5", src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80", alt: "Classic men's cut", category: "Cuts" },
  { id: "g6", src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80", alt: "Bridal party styling", category: "Styling" },
  { id: "g7", src: "https://images.unsplash.com/photo-1717160675489-7779f2c91999?w=800&q=80", alt: "Keratin smoothing treatment", category: "Treatments" },
  { id: "g8", src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80", alt: "Scalp treatment session", category: "Treatments" },
  { id: "g9", src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80", alt: "Salon glam blowout", category: "Styling" },
  { id: "g10", src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80", alt: "Elegant updo", category: "Styling" },
  { id: "g11", src: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&q=80", alt: "Deep conditioning treatment", category: "Treatments" },
  { id: "g12", src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80", alt: "Master stylist at work", category: "Styling" },
  { id: "g13", src: "https://images.unsplash.com/photo-1717160675489-7779f2c91999?w=800&q=80", alt: "Color consultation", category: "Color" },
  { id: "g14", src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80", alt: "Beach wave styling", category: "Styling" },
  { id: "g15", src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80", alt: "Wedding hairstyle", category: "Styling" },
  { id: "g16", src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80", alt: "Vivid color transformation", category: "Color" },
];

const filterTabs = ["All", "Color", "Cuts", "Styling", "Treatments"];

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const item = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <X className="size-6" />
      </button>
      <button
        onClick={onPrev}
        className="absolute left-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-16 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Next image"
      >
        <ChevronRight className="size-6" />
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: easePremium }}
          className="relative z-10 max-h-[85vh] max-w-[90vw]"
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={1000}
            height={800}
            className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
            priority
            unoptimized
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/60 to-transparent p-6">
            <p className="text-sm font-medium text-white">{item.alt}</p>
            <span className="mt-1 inline-block rounded-full bg-primary/80 px-2.5 py-0.5 text-xs text-primary-foreground">
              {item.category}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-sm text-white/50">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

export default function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((g) => g.category === activeFilter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1920&q=85"
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
            Our Gallery
          </h1>
          <p className="mt-6 text-lg text-white/70">
            A curated look at our craft — each image tells the story of a
            collaboration between artist and client.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === tab
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>div]:mb-4 [&>div]:break-inside-avoid"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.04,
                  ease: easePremium,
                }}
                className="group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLightbox(i);
                }}
                aria-label={`View ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={i % 3 === 0 ? 800 : 500}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
                    {item.category}
                  </span>
                  <p className="mt-1 text-sm font-medium text-white">{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {lightboxOpen && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
