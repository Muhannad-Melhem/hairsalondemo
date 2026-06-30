import { NextResponse } from "next/server";
import { z } from "zod";
import { createBooking } from "@/lib/db";
import { sendBookingConfirmation, sendAdminBookingNotification } from "@/lib/email";

const bookingSchema = z.object({
  serviceId: z.string().min(1),
  stylistId: z.string().optional(),
  date: z.string().min(1),
  time: z.string().min(1),
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(1, "Phone is required"),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const booking = await createBooking(parsed.data);

    // Send emails in background
    Promise.all([
      sendBookingConfirmation({
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail,
        serviceName: booking.serviceName ?? "Service",
        stylistName: booking.stylistName,
        date: parsed.data.date,
        time: parsed.data.time,
        notes: parsed.data.notes,
      }),
      sendAdminBookingNotification({
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail,
        serviceName: booking.serviceName ?? "Service",
        stylistName: booking.stylistName,
        date: parsed.data.date,
        time: parsed.data.time,
        notes: parsed.data.notes,
      }),
    ]).catch((err) => console.error("[Booking API] Email error:", err));

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("[Booking API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
