"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  format,
  addDays,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isBefore,
  startOfToday,
} from "date-fns";
import { toast } from "sonner";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Scissors,
  Clock,
  Sparkles,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { cn, formatPrice, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/lib/supabase/actions";
import type { Service, Stylist } from "@/types";

const formSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  stylistId: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z
    .string()
    .min(7, "Phone number is too short")
    .max(20),
  notes: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface BookingFormProps {
  services: Service[];
  stylists: Stylist[];
}

const STEPS = ["Service", "Date & Time", "Details", "Confirm"];

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

function StepIndicator({
  currentStep,
  prefersReduced,
}: {
  currentStep: number;
  prefersReduced: boolean;
}) {
  return (
    <nav aria-label="Booking progress" className="mb-10">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {STEPS.map((label, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <li key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors sm:size-9 sm:text-sm",
                    isCompleted &&
                      "bg-primary text-primary-foreground",
                    isCurrent &&
                      "border-2 border-primary bg-primary/10 text-primary",
                    !isCompleted &&
                      !isCurrent &&
                      "border border-muted-foreground/30 bg-muted text-muted-foreground"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="size-4" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    isCurrent && "text-foreground",
                    isCompleted && "text-muted-foreground",
                    !isCompleted && !isCurrent && "text-muted-foreground/50"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "hidden h-px w-8 transition-colors sm:block md:w-12",
                    i < currentStep
                      ? "bg-primary"
                      : "bg-border"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function CalendarView({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (date: string) => void;
}) {
  const today = startOfToday();
  const [viewDate, setViewDate] = useState(today);

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
          disabled={!isBefore(startOfMonth(subMonths(viewDate, 1)), startOfMonth(today)) && isSameMonth(subMonths(viewDate, 1), today)}
          aria-label="Previous month"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm font-semibold text-foreground">
          {format(viewDate, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Next month"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="py-1.5 text-center text-xs font-medium text-muted-foreground"
          >
            {label}
          </div>
        ))}
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const isDisabled = isBefore(day, addDays(today, 1));
          const isSelected = selected === dateStr;
          const isCurrentMonth = isSameMonth(day, viewDate);

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(dateStr)}
              className={cn(
                "relative flex items-center justify-center rounded-lg py-2 text-sm transition-all",
                !isCurrentMonth && "text-muted-foreground/30",
                isDisabled &&
                  "cursor-not-allowed text-muted-foreground/20",
                !isDisabled &&
                  isCurrentMonth &&
                  "cursor-pointer text-foreground hover:bg-muted",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary",
                isSelected && isDisabled && "bg-primary/50"
              )}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function BookingForm({ services, stylists }: BookingFormProps) {
  const prefersReduced = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const stepRef = useRef<HTMLHeadingElement>(null);

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = form;

  const selectedServiceId = watch("serviceId");
  const selectedStylistId = watch("stylistId");
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId),
    [services, selectedServiceId]
  );

  const groupedServices = useMemo(() => {
    const groups = services.reduce(
      (acc, s) => {
        const cat = s.category.charAt(0).toUpperCase() + s.category.slice(1);
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(s);
        return acc;
      },
      {} as Record<string, Service[]>
    );
    return groups;
  }, [services]);

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
    else if (step === 2)
      fields = ["customerName", "customerEmail", "customerPhone"];

    const valid = await trigger(fields);
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
        setIsSuccess(true);
        toast.success("Booking confirmed!", {
          description:
            "We've sent a confirmation to your email. See you soon!",
        });
        reset();
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
      <section className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
          className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-success/10"
        >
          <Check className="size-10 text-success" />
        </motion.div>
        <h2 className="font-heading text-3xl text-foreground">
          Your Appointment is Confirmed
        </h2>
        <p className="mt-4 text-muted-foreground">
          We&apos;ve sent a confirmation to{" "}
          <span className="font-medium text-foreground">
            {form.getValues("customerEmail")}
          </span>
          . We look forward to welcoming you to the studio.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          {selectedService && (
            <p>
              <span className="font-medium text-foreground">
                {selectedService.name}
              </span>{" "}
              &mdash;{" "}
              {formatDuration(selectedService.duration)}
            </p>
          )}
          {selectedDate && selectedTime && (
            <p className="mt-1">
              {format(new Date(selectedDate + "T12:00:00"), "EEEE, MMMM d, yyyy")}{" "}
              at{" "}
              {TIME_SLOTS.find((t) => t.value === selectedTime)?.label ??
                selectedTime}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setIsSuccess(false);
            setStep(0);
            setDirection(0);
          }}
        >
          Book Another Appointment
        </Button>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <StepIndicator currentStep={step} prefersReduced={prefersReduced} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={prefersReduced ? undefined : slideVariants}
            initial={prefersReduced ? { opacity: 1 } : "enter"}
            animate={prefersReduced ? { opacity: 1 } : "center"}
            exit={prefersReduced ? { opacity: 1 } : "exit"}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0, 1],
            }}
          >
            {/* Step 0: Service Selection */}
            {step === 0 && (
              <div>
                <div className="mb-8 text-center">
                  <h2 ref={stepRef} tabIndex={-1} className="font-heading text-2xl text-foreground sm:text-3xl outline-none">
                    Choose Your Service
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Select the service you&apos;d like to book
                  </p>
                </div>

                <div className="space-y-8">
                  {Object.entries(groupedServices).map(
                    ([category, categoryServices]) => (
                      <div key={category}>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          {category}
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {categoryServices.map((service) => {
                            const isSelected =
                              selectedServiceId === service.id;
                            return (
                              <button
                                key={service.id}
                                type="button"
                                onClick={() => {
                                  setValue("serviceId", service.id, {
                                    shouldValidate: true,
                                  });
                                }}
                                className={cn(
                                  "group relative flex flex-col gap-2 rounded-xl border p-5 text-left transition-all",
                                  isSelected
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                                )}
                                aria-pressed={isSelected}
                              >
                                {isSelected && (
                                  <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Check className="size-3.5" />
                                  </span>
                                )}
                                <div className="flex items-start gap-3">
                                  <div
                                    className={cn(
                                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                      isSelected
                                        ? "bg-primary/20 text-primary"
                                        : "bg-muted text-muted-foreground"
                                    )}
                                  >
                                    <Scissors className="size-5" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <span
                                      className={cn(
                                        "block font-medium",
                                        isSelected
                                          ? "text-primary"
                                          : "text-foreground"
                                      )}
                                    >
                                      {service.name}
                                    </span>
                                    <span className="mt-0.5 block text-sm text-muted-foreground line-clamp-2">
                                      {service.description}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="size-3.5" />
                                    {formatDuration(service.duration)}
                                  </span>
                                  <span className="font-semibold text-foreground">
                                    {formatPrice(service.price)}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Stylist selection (optional) */}
                {stylists.length > 0 && (
                  <div className="mt-10">
                    <div className="mb-4 text-center">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Preferred Stylist
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Optional &mdash; we&apos;ll assign the best available
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setValue("stylistId", "", {
                            shouldValidate: false,
                          })
                        }
                        className={cn(
                          "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                          !selectedStylistId
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-muted-foreground/30"
                        )}
                      >
                        No Preference
                      </button>
                      {stylists.map((stylist) => {
                        const isSelected = selectedStylistId === stylist.id;
                        return (
                          <button
                            key={stylist.id}
                            type="button"
                            onClick={() =>
                              setValue("stylistId", stylist.id, {
                                shouldValidate: false,
                              })
                            }
                            className={cn(
                              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                              isSelected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-muted-foreground/30"
                            )}
                            aria-pressed={isSelected}
                          >
                            {stylist.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {errors.serviceId && (
                  <p className="mt-4 text-center text-sm text-destructive">
                    {errors.serviceId.message}
                  </p>
                )}
              </div>
            )}

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div>
                <div className="mb-8 text-center">
                  <h2 tabIndex={-1} className="font-heading text-2xl text-foreground sm:text-3xl outline-none">
                    Select Date & Time
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Choose your preferred appointment time
                    {selectedService &&
                      ` (${formatDuration(selectedService.duration)})`}
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
                    {errors.date && (
                      <p className="mt-2 text-sm text-destructive">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-foreground">
                      Available Times
                    </h4>
                    {!selectedDate ? (
                      <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border">
                        <div className="text-center text-sm text-muted-foreground">
                          <Calendar className="mx-auto mb-2 size-8 opacity-50" />
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
                              onClick={() =>
                                setValue("time", value, {
                                  shouldValidate: true,
                                })
                              }
                              className={cn(
                                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border text-foreground hover:border-primary/50 hover:bg-muted"
                              )}
                              aria-pressed={isSelected}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {errors.time && (
                      <p className="mt-2 text-sm text-destructive">
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <div>
                <div className="mb-8 text-center">
                  <h2 tabIndex={-1} className="font-heading text-2xl text-foreground sm:text-3xl outline-none">
                    Your Details
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    We&apos;ll send your confirmation to this email
                  </p>
                </div>

                <div className="mx-auto max-w-lg space-y-5">
                  <div>
                    <label
                      htmlFor="customerName"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="customerName"
                        type="text"
                        {...register("customerName")}
                        className={cn(
                          "w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                          errors.customerName
                            ? "border-destructive"
                            : "border-input"
                        )}
                        placeholder="Jane Doe"
                      />
                    </div>
                    {errors.customerName && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="customerEmail"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="customerEmail"
                        type="email"
                        {...register("customerEmail")}
                        className={cn(
                          "w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                          errors.customerEmail
                            ? "border-destructive"
                            : "border-input"
                        )}
                        placeholder="jane@example.com"
                      />
                    </div>
                    {errors.customerEmail && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="customerPhone"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="customerPhone"
                        type="tel"
                        {...register("customerPhone")}
                        className={cn(
                          "w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                          errors.customerPhone
                            ? "border-destructive"
                            : "border-input"
                        )}
                        placeholder="+1 (555) 555-0123"
                      />
                    </div>
                    {errors.customerPhone && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      Special Requests{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                      <textarea
                        id="notes"
                        rows={3}
                        {...register("notes")}
                        className={cn(
                          "w-full resize-none rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                          errors.notes
                            ? "border-destructive"
                            : "border-input"
                        )}
                        placeholder="Any special requests or concerns..."
                      />
                    </div>
                    {errors.notes && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.notes.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Summary */}
            {step === 3 && (
              <div>
                <div className="mb-8 text-center">
                  <h2 tabIndex={-1} className="font-heading text-2xl text-foreground sm:text-3xl outline-none">
                    Review Your Booking
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Please confirm your appointment details
                  </p>
                </div>

                <div className="mx-auto max-w-lg space-y-4">
                  {selectedService && (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Service
                          </p>
                          <p className="mt-0.5 font-medium text-foreground">
                            {selectedService.name}
                          </p>
                        </div>
                        <span className="font-semibold text-foreground">
                          {formatPrice(selectedService.price)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          {formatDuration(selectedService.duration)}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedStylistId && (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <p className="text-sm text-muted-foreground">Stylist</p>
                      <p className="mt-0.5 font-medium text-foreground">
                        {stylists.find((s) => s.id === selectedStylistId)
                          ?.name ?? "Assigned"}
                      </p>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="rounded-xl border border-border bg-card p-5">
                      <p className="text-sm text-muted-foreground">
                        Date & Time
                      </p>
                      <p className="mt-0.5 font-medium text-foreground">
                        {format(
                          new Date(selectedDate + "T12:00:00"),
                          "EEEE, MMMM d, yyyy"
                        )}{" "}
                        at{" "}
                        {TIME_SLOTS.find((t) => t.value === selectedTime)
                          ?.label ?? selectedTime}
                      </p>
                    </div>
                  )}

                  <div className="rounded-xl border border-border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="mt-0.5 font-medium text-foreground">
                      {form.getValues("customerName")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {form.getValues("customerEmail")} &middot;{" "}
                      {form.getValues("customerPhone")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
          <div>
            {step > 0 && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => goToStep(step - 1)}
                disabled={isSubmitting}
              >
                <ChevronLeft className="mr-1.5 size-4" />
                Back
              </Button>
            )}
          </div>
          <div>
            {step < STEPS.length - 1 ? (
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
