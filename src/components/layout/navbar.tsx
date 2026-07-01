"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Menu, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
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
          ? "bg-background/85 backdrop-blur-xl border-b border-border/30 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl tracking-[0.02em] text-foreground transition-opacity hover:opacity-80"
          aria-label={`${SITE.name} — Home`}
        >
          {SITE.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {SITE.navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            );
          })}
          <div className="ml-3 pl-3 border-l border-border/40">
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

        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
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
        <SheetContent side="right" className="w-72 p-6">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex items-center justify-between mb-8">
            <span className="font-heading text-lg">{SITE.name}</span>
          </div>
          <nav className="flex flex-col gap-2">
            {SITE.navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-base font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <hr className="border-border my-2" />
            <Link
              href="/booking"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20"
              onClick={() => setOpen(false)}
            >
              <Sparkles className="size-4" />
              Book Now
            </Link>
            {session?.user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                onClick={() => setOpen(false)}
              >
                <User className="size-4" />
                My Profile
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-lg px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
