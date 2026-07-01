import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Check, Scissors, Clock } from "lucide-react";
import { cn, formatPrice, formatDuration } from "@/lib/utils";
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

interface ServiceSelectionProps {
  form: UseFormReturn<FormData>;
  services: Service[];
  stylists: Stylist[];
}

export function ServiceSelection({ form, services, stylists }: ServiceSelectionProps) {
  const { watch, setValue } = form;
  const selectedServiceId = watch("serviceId");
  const selectedStylistId = watch("stylistId");

  const groupedServices = useMemo(() => {
    return services.reduce(
      (acc, s) => {
        const cat = s.category.charAt(0).toUpperCase() + s.category.slice(1);
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(s);
        return acc;
      },
      {} as Record<string, Service[]>
    );
  }, [services]);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
          Choose Your Service
        </h2>
        <p className="mt-2 text-muted-foreground">
          Select the service you&apos;d like to book
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {category}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {categoryServices.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      setValue("serviceId", service.id, { shouldValidate: true });
                    }}
                    className={cn(
                      "group relative flex flex-col gap-2 rounded-xl border p-5 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border/30 bg-card hover:border-primary/50 hover:bg-muted/30"
                    )}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-3" />
                      </span>
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-lg",
                          isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Scissors className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-medium",
                            isSelected ? "text-primary" : "text-foreground"
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
        ))}
      </div>

      {stylists.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 text-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preferred Stylist
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Optional — we&apos;ll assign the best available
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setValue("stylistId", "", { shouldValidate: false })}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
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
                  onClick={() => setValue("stylistId", stylist.id, { shouldValidate: false })}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
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

      {form.formState.errors.serviceId && (
        <p className="mt-4 text-center text-sm text-destructive">
          {form.formState.errors.serviceId.message}
        </p>
      )}
    </div>
  );
}
