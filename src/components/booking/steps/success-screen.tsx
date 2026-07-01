import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDuration } from "@/lib/utils";
import { easePremium } from "@/lib/animation";
import type { Service } from "@/types";

interface SuccessScreenProps {
  customerEmail: string;
  selectedService: Service | undefined;
  selectedDate: string;
  selectedTime: string;
  onReset: () => void;
}

const TIME_SLOTS: { value: string; label: string }[] = (() => {
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

export function SuccessScreen({
  customerEmail,
  selectedService,
  selectedDate,
  selectedTime,
  onReset,
}: SuccessScreenProps) {
  return (
    <section className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: easePremium }}
      >
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-10 text-primary" />
        </div>

        <h2 className="font-heading text-3xl text-foreground">
          Your Appointment is Confirmed
        </h2>
        <p className="mt-4 text-muted-foreground">
          We&apos;ve sent a confirmation to{" "}
          <span className="font-medium text-foreground">{customerEmail}</span>.
          We look forward to welcoming you.
        </p>

        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          {selectedService && (
            <p>
              <span className="font-medium text-foreground">{selectedService.name}</span>
              {" — "}
              {formatDuration(selectedService.duration)}
            </p>
          )}
          {selectedDate && selectedTime && (
            <p>
              {format(new Date(selectedDate + "T12:00:00"), "EEEE, MMMM d, yyyy")} at{" "}
              {TIME_SLOTS.find((t) => t.value === selectedTime)?.label ?? selectedTime}
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="size-3 text-primary" />
          A confirmation email is on its way
        </div>

        <Button variant="outline" className="mt-8" onClick={onReset}>
          Book Another Appointment
        </Button>
      </motion.div>
    </section>
  );
}
