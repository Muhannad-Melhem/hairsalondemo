"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/lib/supabase/actions";
import { StepIndicator } from "./steps/step-indicator";
import { ServiceSelection } from "./steps/service-selection";
import { DateTimeSelection } from "./steps/date-time-selection";
import { ContactDetails } from "./steps/contact-details";
import { BookingSummary } from "./steps/booking-summary";
import { SuccessScreen } from "./steps/success-screen";
import type { Service, Stylist } from "@/types";

const formSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  stylistId: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  customerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(7, "Phone number is too short").max(20),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface BookingFormProps {
  services: Service[];
  stylists: Stylist[];
}

const STEPS_COUNT = 4;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export function BookingForm({ services, stylists }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState("");
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stepRef.current?.focus();
  }, [step]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: "",
      stylistId: "",
      date: "",
      time: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      notes: "",
    },
    mode: "onBlur",
  });

  const { watch } = form;
  const selectedServiceId = watch("serviceId");
  const selectedStylistId = watch("stylistId") ?? "";
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const goToStep = useCallback(
    (target: number) => {
      setDirection(target > step ? 1 : -1);
      setStep(target);
    },
    [step]
  );

  async function handleNext() {
    let fields: (keyof FormData)[] = [];
    if (step === 0) fields = ["serviceId"];
    else if (step === 1) fields = ["date", "time"];
    else if (step === 2) fields = ["customerName", "customerEmail", "customerPhone"];

    const valid = await form.trigger(fields);
    if (!valid) {
      toast.error("Please fix the errors before continuing");
      return;
    }
    goToStep(step + 1);
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const result = await createBooking({
        serviceId: data.serviceId,
        stylistId: data.stylistId || undefined,
        date: data.date,
        time: data.time,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        notes: data.notes || undefined,
      });

      if (result.success) {
        setConfirmedEmail(data.customerEmail);
        setIsSuccess(true);
        toast.success("Booking confirmed!", {
          description: "We've sent a confirmation to your email. See you soon!",
        });
        form.reset();
      } else {
        toast.error(result.error || "Something went wrong", {
          description: "Please try again or contact us directly.",
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <SuccessScreen
        customerEmail={confirmedEmail}
        selectedService={selectedService}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onReset={() => {
          setIsSuccess(false);
          setStep(0);
          setDirection(0);
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <StepIndicator currentStep={step} />

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            ref={stepRef}
            tabIndex={-1}
            className="outline-none"
          >
            {step === 0 && <ServiceSelection form={form} services={services} stylists={stylists} />}
            {step === 1 && <DateTimeSelection form={form} selectedService={selectedService} />}
            {step === 2 && <ContactDetails form={form} />}
            {step === 3 && (
              <BookingSummary
                form={form}
                selectedService={selectedService}
                selectedStylistId={selectedStylistId}
                stylists={stylists}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-border/30 pt-6">
          <div>
            {step > 0 && (
              <Button type="button" variant="ghost" onClick={() => goToStep(step - 1)} disabled={isSubmitting}>
                <ChevronLeft className="mr-1.5 size-4" />
                Back
              </Button>
            )}
          </div>
          <div>
            {step < STEPS_COUNT - 1 ? (
              <Button type="button" onClick={handleNext}>
                Continue
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1.5 size-4 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 size-4" />
                    Confirm Booking
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
