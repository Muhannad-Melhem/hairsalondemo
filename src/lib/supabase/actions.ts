"use server";

import { z } from "zod";
import { getServices, getStylists, createBooking } from "@/lib/db";
import { sendBookingConfirmation, sendAdminBookingNotification } from "@/lib/email";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  stylistId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7).max(20),
  notes: z.string().max(500).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export async function createBookingAction(data: BookingInput) {
  const validated = bookingSchema.safeParse(data);
  if (!validated.success) {
    return { error: "Invalid data", details: validated.error.flatten() };
  }

  try {
    const booking = await createBooking(validated.data);

    // Send emails in background
    Promise.all([
      sendBookingConfirmation({
        customerName: validated.data.customerName,
        customerEmail: validated.data.customerEmail,
        serviceName: booking.serviceName ?? "Service",
        stylistName: booking.stylistName,
        date: validated.data.date,
        time: validated.data.time,
        notes: validated.data.notes,
      }),
      sendAdminBookingNotification({
        customerName: validated.data.customerName,
        customerEmail: validated.data.customerEmail,
        serviceName: booking.serviceName ?? "Service",
        stylistName: booking.stylistName,
        date: validated.data.date,
        time: validated.data.time,
        notes: validated.data.notes,
      }),
    ]).catch((err) => console.error("[Actions] Email error:", err));

    return { success: true };
  } catch (error) {
    console.error("Booking error:", error);
    return { error: "Failed to create booking" };
  }
}

// Re-export for backward compatibility
export { getServices, getStylists };
export { createBookingAction as createBooking };
