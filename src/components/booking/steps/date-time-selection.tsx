import type { UseFormReturn } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";
import { CalendarView } from "./calendar-view";
import type { Service } from "@/types";

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
      const displayMin = minute.toString().padStart(2, "0");
      slots.push({
        value: `${hh}:${mm}`,
        label: `${displayHour}:${displayMin} ${period}`,
      });
    }
  }
  return slots;
})();

interface DateTimeSelectionProps {
  form: UseFormReturn<FormData>;
  selectedService: Service | undefined;
}

export function DateTimeSelection({ form, selectedService }: DateTimeSelectionProps) {
  const { watch, setValue } = form;
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
          Select Date & Time
        </h2>
        <p className="mt-2 text-muted-foreground">
          Choose your preferred appointment time
          {selectedService && ` (${formatDuration(selectedService.duration)})`}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <CalendarView
            selected={selectedDate}
            onSelect={(date) => {
              setValue("date", date, { shouldValidate: true });
              setValue("time", "", { shouldValidate: false });
            }}
          />
          {form.formState.errors.date && (
            <p className="mt-2 text-sm text-destructive">
              {form.formState.errors.date.message}
            </p>
          )}
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            Available Times
          </h4>
          {!selectedDate ? (
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border/50">
              <div className="text-center text-sm text-muted-foreground">
                <Calendar className="mx-auto mb-2 size-8 opacity-40" />
                Select a date to see available times
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map(({ value, label }) => {
                const isSelected = selectedTime === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setValue("time", value, { shouldValidate: true })}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/30 text-foreground hover:border-primary/50 hover:bg-muted/50"
                    )}
                    aria-pressed={isSelected}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
          {form.formState.errors.time && (
            <p className="mt-2 text-sm text-destructive">
              {form.formState.errors.time.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
