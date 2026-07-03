"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { SITE } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Menu, User, Sparkles, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl tracking-[0.15em] text-foreground transition-opacity hover:opacity-80"
          aria-label={`${SITE.name} — Home`}
        >
          LUXE
          <span className="ml-0.5 text-primary text-xs">.</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {SITE.navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm transition-colors rounded-lg",
                  isActive
                    ? "font-semibold text-foreground"
                    : "font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="ml-2 pl-3 border-l border-border/40">
            {session?.user ? (
              <Link
                href="/profile"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
              >
                <User className="size-4" />
                Profile
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex size-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-[#25D366]/10 hover:text-[#25D366]"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="size-4.5" />
          </a>
          <Link
            href="/booking"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
          >
            <Sparkles className="size-3.5" />
            Book Now
          </Link>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-full flex-col bg-background">
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <Link
                href="/"
                className="font-heading text-xl tracking-[0.15em] text-foreground"
              >
                LUXE
                <span className="ml-0.5 text-primary text-xs">.</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <nav className="flex flex-col gap-1">
                {SITE.navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-xl px-4 py-3.5 text-xl font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="my-4 border-t border-border/40" />
                {session?.user ? (
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 text-xl font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                    onClick={() => setOpen(false)}
                  >
                    <User className="size-5" />
                    My Profile
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="rounded-xl px-4 py-3.5 text-xl font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                    onClick={() => setOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
            <div className="px-6 pb-8 pt-4">
              <Link
                href="/booking"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-lg font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                onClick={() => setOpen(false)}
              >
                <Sparkles className="size-4" />
                Book Now
              </Link>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/30 px-6 py-3 text-sm font-medium text-[#25D366] transition-all hover:bg-[#25D366]/10"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
