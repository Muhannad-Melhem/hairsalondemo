import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for our premium hair services in Amman.",
  path: "/pricing",
});

const tiers = [
  {
    name: "Signature Cut",
    price: 25,
    popular: false,
    features: [
      "Complimentary consultation",
      "Precision haircut",
      "Blow-dry & style",
      "Style tips & product samples",
    ],
  },
  {
    name: "Color & Balayage",
    price: 45,
    popular: true,
    features: [
      "Full consultation & color analysis",
      "Custom balayage or all-over color",
      "Olaplex bond treatment",
      "Blow-dry & finish",
      "Follow-up toner visit",
    ],
  },
  {
    name: "Luxury Package",
    price: 85,
    popular: false,
    features: [
      "Signature cut + custom color",
      "Olaplex bond treatment",
      "Luxury hair mask treatment",
      "Blow-dry & styling",
      "Premium product take-home kit",
      "Complimentary Arabic coffee",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          alt="Pricing"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-heading text-5xl text-white sm:text-6xl md:text-7xl">
            Investment in You
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Transparent pricing that reflects the artistry, premium products, and
            meticulous attention behind every service.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.popular
                    ? "border-primary bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                    : "border-border/30 bg-card"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading text-xl text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-0.5">
                  <span className="font-heading text-4xl text-foreground">
                    {formatPrice(tier.price)}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-all ${
                    tier.popular
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Book Now
                  <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-border/50 bg-muted/30 p-8 sm:p-10">
            <div className="flex items-start gap-3">
              <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-heading text-lg text-foreground">
                  A note about our pricing
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prices listed are starting points. Final pricing is determined
                  during your complimentary consultation based on hair length,
                  density, and the specific services you choose. We provide a
                  precise quote before any service begins — no surprises, ever.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Questions? Get in touch
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
