import type { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";
import type { Service, Stylist } from "@/types";

interface FormData {
  serviceId: string;
  stylistId?: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

const TIME_SLOTS = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let hour = 9; hour < 19; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 18 && minute > 30) break;
      const hh = hour.toString().padStart(2, "0");
      const mm = minute.toString().padStart(2, "0");
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      slots.push({ value: `${hh}:${mm}`, label: `${displayHour}:${mm} ${period}` });
    }
  }
  return slots;
})();

interface BookingSummaryProps {
  form: UseFormReturn<FormData>;
  selectedService: Service | undefined;
  selectedStylistId: string;
  stylists: Stylist[];
}

export function BookingSummary({ form, selectedService, selectedStylistId, stylists }: BookingSummaryProps) {
  const { watch } = form;
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
          Review Your Booking
        </h2>
        <p className="mt-2 text-muted-foreground">
          Please confirm your appointment details
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-4">
        {selectedService && (
          <div className="rounded-xl border border-border/30 bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Service</p>
                <p className="mt-1 font-medium text-foreground">{selectedService.name}</p>
              </div>
              <span className="font-semibold text-foreground">{formatPrice(selectedService.price)}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="size-3.5" />
              {formatDuration(selectedService.duration)}
            </div>
          </div>
        )}

        {selectedStylistId && (
          <div className="rounded-xl border border-border/30 bg-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Stylist</p>
            <p className="mt-1 font-medium text-foreground">
              {stylists.find((s) => s.id === selectedStylistId)?.name ?? "Assigned"}
            </p>
          </div>
        )}

        {selectedDate && selectedTime && (
          <div className="rounded-xl border border-border/30 bg-card p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Date & Time</p>
            <p className="mt-1 font-medium text-foreground">
              {format(new Date(selectedDate + "T12:00:00"), "EEEE, MMMM d, yyyy")} at{" "}
              {TIME_SLOTS.find((t) => t.value === selectedTime)?.label ?? selectedTime}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-border/30 bg-card p-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Contact</p>
          <p className="mt-1 font-medium text-foreground">{form.getValues("customerName")}</p>
          <p className="text-sm text-muted-foreground">
            {form.getValues("customerEmail")} &middot; {form.getValues("customerPhone")}
          </p>
        </div>
      </div>
    </div>
  );
}
