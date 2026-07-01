import type { UseFormReturn } from "react-hook-form";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

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

export function ContactDetails({ form }: { form: UseFormReturn<FormData> }) {
  const { register, formState: { errors } } = form;

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
          Your Details
        </h2>
        <p className="mt-2 text-muted-foreground">
          We&apos;ll send your confirmation to this email
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5">
        <div>
          <label htmlFor="customerName" className="mb-1.5 block text-sm font-medium text-foreground">
            Full Name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="customerName"
              type="text"
              {...register("customerName")}
              className={cn(
                "w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                errors.customerName ? "border-destructive" : "border-input"
              )}
              placeholder="Jane Doe"
            />
          </div>
          {errors.customerName && (
            <p className="mt-1 text-xs text-destructive">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerEmail" className="mb-1.5 block text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="customerEmail"
              type="email"
              {...register("customerEmail")}
              className={cn(
                "w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                errors.customerEmail ? "border-destructive" : "border-input"
              )}
              placeholder="jane@example.com"
            />
          </div>
          {errors.customerEmail && (
            <p className="mt-1 text-xs text-destructive">{errors.customerEmail.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="customerPhone" className="mb-1.5 block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="customerPhone"
              type="tel"
              {...register("customerPhone")}
              className={cn(
                "w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                errors.customerPhone ? "border-destructive" : "border-input"
              )}
              placeholder="+1 (555) 555-0123"
            />
          </div>
          {errors.customerPhone && (
            <p className="mt-1 text-xs text-destructive">{errors.customerPhone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-foreground">
            Special Requests <span className="text-muted-foreground">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
            <textarea
              id="notes"
              rows={3}
              {...register("notes")}
              className={cn(
                "w-full resize-none rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                errors.notes ? "border-destructive" : "border-input"
              )}
              placeholder="Any special requests or concerns..."
            />
          </div>
          {errors.notes && (
            <p className="mt-1 text-xs text-destructive">{errors.notes.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
