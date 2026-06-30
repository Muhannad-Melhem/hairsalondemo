import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getBookingById, updateBookingStatus, deleteBooking } from "@/lib/db";
import { sendBookingStatusUpdate } from "@/lib/email";

const updateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const booking = await getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("[Booking API] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid status", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const existing = await getBookingById(id);
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updated = await updateBookingStatus(id, parsed.data.status);

    // Send status update email
    sendBookingStatusUpdate({
      customerName: existing.customerName,
      customerEmail: existing.customerEmail,
      serviceName: existing.serviceName ?? "Service",
      stylistName: existing.stylistName,
      date: existing.date,
      time: existing.time,
      status: parsed.data.status,
    }).catch((err) => console.error("[Booking API] Status email error:", err));

    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error("[Booking API] PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteBooking(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Booking API] DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
