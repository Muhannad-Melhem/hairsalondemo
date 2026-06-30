"use client";

import { useState } from "react";
import { useApiQuery } from "@/hooks/use-api-query";
import { api } from "@/lib/api-client";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import type { Booking } from "@/types";
import { Eye } from "lucide-react";
import { toast } from "sonner";

const statusVariant: Record<string, "pending" | "confirmed" | "completed" | "cancelled"> = {
  pending: "pending",
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
};

const statusTabs = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: bookings, loading, error, refetch } = useApiQuery<Booking>(
    "/api/admin/bookings",
    "bookings",
  );

  const filtered =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    try {
      await api.patch(`/api/bookings/${id}`, { status });
      toast.success("Booking status updated");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const columns: Column<Booking>[] = [
    { key: "date", label: "Date", sortable: true },
    { key: "time", label: "Time", sortable: true, hideOnMobile: true },
    { key: "customerName", label: "Customer", sortable: true },
    { key: "serviceId", label: "Service", hideOnMobile: true },
    { key: "stylistId", label: "Stylist", hideOnMobile: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (booking) => (
        <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
      ),
    },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-destructive">Failed to load bookings: {error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage customer appointments</p>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          {statusTabs.map((tab) => (
            <TabsTab key={tab} value={tab} className="capitalize">{tab}</TabsTab>
          ))}
        </TabsList>
      </Tabs>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(b) => b.id}
        searchable
        searchKeys={["customerName", "customerEmail"]}
        loading={loading}
        emptyMessage={statusFilter === "all" ? "No bookings found." : `No ${statusFilter} bookings.`}
        actions={(booking) => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setSelectedBooking(booking);
                setDialogOpen(true);
              }}
            >
              <Eye className="size-4" />
            </Button>
          </div>
        )}
        mobileCard={(booking) => (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{booking.customerName}</span>
                <Badge variant={statusVariant[booking.status]}>{booking.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{booking.date} at {booking.time}</p>
            </CardContent>
          </Card>
        )}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Full information about this appointment</DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Customer</span>
                  <p className="font-medium">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Email</span>
                  <p className="font-medium">{selectedBooking.customerEmail}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone</span>
                  <p className="font-medium">{selectedBooking.customerPhone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date</span>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time</span>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status</span>
                  <p className="font-medium">
                    <Badge variant={statusVariant[selectedBooking.status]}>{selectedBooking.status}</Badge>
                  </p>
                </div>
              </div>
              {selectedBooking.notes && (
                <div>
                  <span className="text-sm text-muted-foreground">Notes</span>
                  <p className="mt-1 text-sm">{selectedBooking.notes}</p>
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-sm text-muted-foreground">Update status:</span>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(val) => updateStatus(selectedBooking.id, val as Booking["status"])}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectPopup>
                    {["pending", "confirmed", "completed", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectPopup>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
