"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  CalendarCheck,
  Scissors,
  Users,
  Images,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  ScissorsIcon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Services", href: "/admin/services", icon: Scissors },
  { label: "Stylists", href: "/admin/stylists", icon: Users },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function NavContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <ScissorsIcon className="size-4 text-primary-foreground" />
        </div>
        <span className="font-heading text-lg font-semibold">Luxe Admin</span>
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-3 text-muted-foreground"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
      Sign Out
    </Button>
  );
}

export function Sidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-1 flex-col border-r bg-card">
          <NavContent />
        </div>
      </aside>

      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-40 lg:hidden"
        onClick={() => setSheetOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <NavContent onNavClick={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
