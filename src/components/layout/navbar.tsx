"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { SITE } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, User } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-heading text-xl tracking-wide text-foreground"
          onClick={() => setOpen(false)}
        >
          {SITE.name}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {SITE.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <User className="size-4" />
              Profile
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="size-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            {SITE.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-border" />
            {session?.user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                <User className="size-4" />
                My Profile
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
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
