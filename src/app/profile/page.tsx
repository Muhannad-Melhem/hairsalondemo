"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { api } from "@/lib/api-client";
import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut, User as UserIcon, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

const statusVariant: Record<string, "pending" | "confirmed" | "completed" | "cancelled"> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoadingBookings(true);
      api.get<{ bookings: Booking[] }>("/api/bookings")
        .then((data) => {
          setBookings(
            data.bookings.filter((b) => b.customerEmail === session.user!.email),
          );
        })
        .catch(() => {
          // silently fail
        })
        .finally(() => setLoadingBookings(false));
    }
  }, [session]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut({ redirect: false });
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            <UserIcon className="size-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold">
              {session.user.name ?? session.user.email ?? "My Profile"}
            </h1>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="outline" size="sm">
              Back to Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? (
              <Loader2 className="mr-1 size-3 animate-spin" />
            ) : (
              <LogOut className="mr-1 size-3" />
            )}
            Sign Out
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarCheck className="size-4" />
            My Bookings
          </CardTitle>
          <Link href="/booking">
            <Button size="sm">Book New Appointment</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loadingBookings ? (
            <div className="flex justify-center py-12">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <CalendarCheck className="size-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
              <Link href="/booking">
                <Button variant="outline" size="sm">
                  Book Your First Appointment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {booking.date}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        at {booking.time}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Service: {booking.serviceId}
                      {booking.stylistId && ` · Stylist: ${booking.stylistId}`}
                    </p>
                    {booking.notes && (
                      <p className="mt-1 text-xs text-muted-foreground italic">
                        &quot;{booking.notes}&quot;
                      </p>
                    )}
                  </div>
                  <Badge variant={statusVariant[booking.status]}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
