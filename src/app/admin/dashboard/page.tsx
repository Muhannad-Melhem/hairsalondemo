"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApiQuery } from "@/hooks/use-api-query";
import type { Booking } from "@/types";
import {
  CalendarCheck,
  Clock,
  Scissors,
  Users,
  Plus,
  ArrowRight,
  Loader2,
} from "lucide-react";

const statusVariant: Record<string, "pending" | "confirmed" | "completed" | "cancelled"> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const [greeting] = useState(getGreeting);

  const { data: bookings, loading: bookingsLoading } = useApiQuery<Booking>(
    "/api/admin/bookings",
    "bookings",
  );

  const { data: services } = useApiQuery<Record<string, unknown>>(
    "/api/admin/services",
    "services",
  );

  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const activeServices = services.length;
  const totalStylists = 0; // fetched below

  const recentBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const stats = [
    { label: "Total Bookings", value: total, icon: CalendarCheck, color: "text-primary" },
    { label: "Pending", value: pending, icon: Clock, color: "text-warning" },
    { label: "Active Services", value: activeServices, icon: Scissors, color: "text-info" },
    { label: "Total Stylists", value: totalStylists, icon: Users, color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">{greeting}, Admin</h1>
        <p className="text-sm text-muted-foreground">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className={cn("rounded-lg bg-muted p-3", stat.color)}>
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">
                    {bookingsLoading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Bookings</CardTitle>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {bookingsLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 animate-pulse rounded bg-muted" />
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{booking.customerName}</p>
                      <p className="text-xs text-muted-foreground">{booking.date} at {booking.time}</p>
                    </div>
                    <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/services">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 size-4" /> Add Service
              </Button>
            </Link>
            <Link href="/admin/stylists">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 size-4" /> Add Stylist
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="outline" className="w-full justify-start">
                <CalendarCheck className="mr-2 size-4" /> View All Bookings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Booking Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48">
            <svg className="size-full" viewBox="0 0 400 160" preserveAspectRatio="none">
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="0" y1={40 + i * 30} x2="400" y2={40 + i * 30} stroke="var(--border)" strokeWidth="1" />
              ))}
              <polyline points="20,130 80,100 140,110 200,60 260,70 320,40 380,50" fill="none" stroke="var(--primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <polygon points="20,130 20,130 80,100 140,110 200,60 260,70 320,40 380,50 380,130" fill="url(#gradient)" opacity="0.15" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[[20, 130], [80, 100], [140, 110], [200, 60], [260, 70], [320, 40], [380, 50]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="var(--primary)" className="drop-shadow-sm" />
              ))}
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
