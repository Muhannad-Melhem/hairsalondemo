import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await getBookings({ limit: 100 });
    return NextResponse.json({ bookings: result.bookings });
  } catch (error) {
    console.error("[Admin Bookings] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
