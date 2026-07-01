import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Sparkles, Camera, Globe, Music2, Globe2 } from "lucide-react";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/30 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.72_0.18_78_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.72_0.18_78_/_0.05)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="font-heading text-xl tracking-[0.02em] text-background">
              {SITE.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-background/60 max-w-xs">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-background/10 text-background/60 transition-all hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30"
                aria-label="Instagram"
              >
                <Camera className="size-4" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-background/10 text-background/60 transition-all hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30"
                aria-label="Facebook"
              >
                <Globe className="size-4" />
              </a>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-background/10 text-background/60 transition-all hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30"
                aria-label="TikTok"
              >
                <Music2 className="size-4" />
              </a>
              <a
                href={SITE.social.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-full bg-background/10 text-background/60 transition-all hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30"
                aria-label="Pinterest"
              >
                <Globe2 className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-background/80">
              Hours
            </h4>
            <ul className="space-y-2.5 text-sm text-background/60">
              {SITE.hours.map((item) => (
                <li key={item.day} className="flex justify-between">
                  <span className="text-background/80">{item.day}</span>
                  <span>{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-background/80">
              Contact
            </h4>
            <address className="space-y-2.5 text-sm not-italic text-background/60">
              <p>{SITE.address.street}</p>
              <p>
                {SITE.address.city}, {SITE.address.region} {SITE.address.postcode}
              </p>
              <a href={`tel:${SITE.phone}`} className="block transition-colors hover:text-background">
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="block transition-colors hover:text-background">
                {SITE.email}
              </a>
            </address>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wider uppercase text-background/80">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-background/60">
              {SITE.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-background">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-xs text-background/40">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              <Sparkles className="size-3" />
              Book Your Visit
            </Link>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
