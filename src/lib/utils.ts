import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in Jordanian Dinar */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-JO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " JD";
}

/** Format duration in human-readable form */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/** Create URL-safe slug */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** WhatsApp URL with pre-filled message */
export function getWhatsAppUrl(phone: string, message?: string): string {
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}${encoded ? `?text=${encoded}` : ""}`;
}
