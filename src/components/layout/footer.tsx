import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg text-foreground">{SITE.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.description}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Hours</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {SITE.hours.map((item) => (
                <li key={item.day}>
                  <span className="text-foreground">{item.day}</span> — {item.hours}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
            <address className="space-y-1.5 text-sm not-italic text-muted-foreground">
              <p>{SITE.address.street}</p>
              <p>
                {SITE.address.city}, {SITE.address.region} {SITE.address.postcode}
              </p>
              <p>{SITE.phone}</p>
              <p>{SITE.email}</p>
            </address>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Links</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {SITE.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {currentYear} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
