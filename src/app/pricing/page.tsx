import { createMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/lib/data";
import { cn, formatPrice, formatDuration } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for our full range of luxury hair services. Invest in hair that looks and feels extraordinary.",
  path: "/pricing",
});

const tierLabels = [
  { key: "Cuts", title: "Cut & Style", subtitle: "Precision shapes tailored to you" },
  { key: "Color", title: "Colour", subtitle: "Vibrant, dimensional, long-lasting" },
  { key: "Styling", title: "Styling", subtitle: "Occasion-perfect finishes" },
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
          <h1 className="font-heading text-4xl text-white sm:text-5xl md:text-6xl">
            Investment in Excellence
          </h1>
          <p className="mt-4 text-lg text-white/80">
            We believe in transparent pricing that reflects the skill, time, and
            premium products behind every service.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {tierLabels.map((tier) => {
            const tierServices = services.filter(
              (s) =>
                s.category === tier.key &&
                (tier.key !== "Styling" || s.category === "Styling"),
            );
            const allTierServices = services.filter(
              (s) => s.category === tier.key,
            );
            return (
              <div key={tier.key}>
                <div className="mb-8">
                  <h2 className="font-heading text-3xl text-foreground">
                    {tier.title}
                  </h2>
                  <p className="mt-1 text-muted-foreground">{tier.subtitle}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-border/50">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                          Service
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-foreground max-sm:hidden">
                          Description
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                          Duration
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                          Price
                        </th>
                        <th className="px-6 py-4 text-right max-sm:hidden" />
                      </tr>
                    </thead>
                    <tbody>
                      {allTierServices.map((service) => (
                        <tr
                          key={service.id}
                          className="border-b border-border/20 last:border-0 transition-colors hover:bg-muted/20"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-foreground">
                              {service.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-sm:hidden">
                            <span className="text-sm text-muted-foreground line-clamp-1">
                              {service.description}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm text-muted-foreground whitespace-nowrap">
                            {formatDuration(service.duration)}
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-foreground whitespace-nowrap">
                            {formatPrice(service.price)}
                          </td>
                          <td className="px-6 py-4 text-right max-sm:hidden">
                            <Link
                              href="/booking"
                              className={cn(
                                buttonVariants({ variant: "default", size: "sm" }),
                                "rounded-full text-xs",
                              )}
                            >
                              Book
                              <ArrowRight className="ml-1 size-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="border-t border-border/50 bg-muted/30 px-6 py-4 sm:hidden">
                    <Link
                      href="/booking"
                      className={cn(
                        buttonVariants({ variant: "default", size: "default" }),
                        "w-full rounded-full",
                      )}
                    >
                      Book Now
                      <ArrowRight className="ml-1.5 size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-border/50 bg-muted/30 p-8 sm:p-10">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-heading text-lg text-foreground">
                Have questions about pricing?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prices may vary based on stylist seniority, hair length, and
                density. We provide a precise quote during your consultation
                before any service begins. No surprises — ever.
              </p>
              <Link
                href="/faq"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "mt-4 rounded-full inline-flex items-center gap-1.5",
                )}
              >
                View FAQ
                <ArrowRight className="ml-1 size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
