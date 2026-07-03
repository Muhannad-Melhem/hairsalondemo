import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import AboutAnimations from "./about-animations";
import { Heart, Scissors, Users, Award, ArrowRight, Quote, Leaf, Crown, Gem } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "Discover the story behind Luxe Hair Studio — our philosophy, our values, and the artistry that sets us apart in Amman.",
  path: "/about",
});

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "15K+", label: "Happy Clients" },
  { value: "6", label: "Master Stylists" },
  { value: "4.9", label: "Average Rating" },
];

const milestones = [
  { year: "2015", title: "Founded in Abdoun", description: "Luxe Hair Studio opens its doors in the heart of Amman's prestigious Abdoun district." },
  { year: "2018", title: "Spa Services Launch", description: "Expanded our offerings to include luxury spa treatments and holistic hair wellness." },
  { year: "2020", title: "Best Luxury Salon", description: "Awarded Best Luxury Salon in Jordan by the Jordan Beauty Awards." },
  { year: "2023", title: "Sustainable Beauty", description: "Launched our sustainable beauty initiative, partnering with eco-conscious brands." },
  { year: "2025", title: "Second Location", description: "Opened our second location, bringing Luxe's signature experience to a new neighbourhood." },
];

const values = [
  { icon: Scissors, title: "Artistry First", description: "Every cut, colour, and style is treated as a work of art. We invest in continuous education to stay ahead of the craft." },
  { icon: Heart, title: "Warm Hospitality", description: "From the moment you walk in, you're family. We believe exceptional hair begins with feeling truly seen and cared for." },
  { icon: Gem, title: "Premium Products", description: "We partner with the world's finest hair care houses — Oribe, Kérastase, and Olaplex — to deliver unparalleled results." },
  { icon: Users, title: "Inclusivity", description: "All hair types, textures, and identities are celebrated here. Our team is trained across diverse hair needs." },
  { icon: Leaf, title: "Sustainability", description: "We are committed to eco-conscious practices, from product selection to waste reduction, for a greener future." },
  { icon: Crown, title: "Jordanian Excellence", description: "Proudly rooted in Amman, we bring world-class standards to the Jordanian beauty landscape." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-274c79729583?w=1920&q=80"
          alt="Salon interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-heading text-5xl text-white sm:text-6xl md:text-7xl">
            Our Story
          </h1>
          <p className="mt-6 text-lg text-white/70">
            A sanctuary where artistry meets warmth, and every guest leaves
            feeling more beautiful than they arrived.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <AboutAnimations>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                alt="Salon interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Award className="size-3" />
                Our Story
              </span>
              <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
                Where Style Meets Precision
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {SITE.name} was born from a simple belief: that a great salon
                  experience should feel less like an appointment and more like an
                  escape. Founded in 2015 by master stylist Isabella Rossi in the
                  heart of Abdoun, Amman, our studio was designed as a sanctuary
                  where the art of hair meets the ritual of self-care.
                </p>
                <p>
                  What started as an intimate four-chair studio has grown into one
                  of Amman&apos;s most celebrated salons — but we&apos;ve never lost the
                  personal touch that made us who we are. Every client who walks
                  through our doors is greeted by name, offered an espresso, and
                  treated to a consultation that is as thorough as it is warm.
                </p>
                <p>
                  Our team travels the world for inspiration and training — from
                  the editorial salons of Paris to the avant-garde studios of
                  Tokyo — bringing global techniques back to our Amman atelier.
                  We&apos;re as committed to your hair&apos;s long-term health as we are
                  to the immediate result.
                </p>
              </div>
            </div>
          </div>
        </AboutAnimations>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-2 text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            Our Journey
          </h2>
          <p className="mt-2 text-muted-foreground">
            A decade of milestones in Amman&apos;s beauty scene.
          </p>
        </div>
        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col items-center gap-6 md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="font-heading text-4xl text-primary sm:text-5xl">
                    {m.year}
                  </span>
                  <h3 className="mt-2 font-heading text-xl text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {m.description}
                  </p>
                </div>
                <div className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <div className="size-3 rounded-full bg-primary" />
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl text-foreground sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              The Salon Experience
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Step into our Abdoun atelier and immediately feel the difference.
              Soaring ceilings, curated art, and a calming palette of warm
              neutrals create an atmosphere that is both luxurious and inviting.
              Every detail — from the Italian marble floors to the custom scent
              diffused through the space — has been chosen to make you feel at
              ease.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Enjoy a complimentary beverage from our espresso bar while you
              consult with your stylist. Our open-concept space buzzes with
              creative energy, yet somehow still feels intimate. We believe the
              environment is an essential part of the transformation — when you
              feel good in your surroundings, it shows in your hair.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80"
              alt="Salon experience"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 sm:p-12">
          <Quote className="absolute right-8 top-8 size-24 text-primary/5" />
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              Ready to Experience the Difference?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Book your appointment today and discover why {SITE.name} is
              Amman&apos;s most beloved luxury salon.
            </p>
            <Link
              href="/booking"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "mt-8 h-12 rounded-full px-8 text-base font-semibold",
              )}
            >
              Book Your Appointment
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
