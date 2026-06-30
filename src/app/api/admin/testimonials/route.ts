import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getTestimonials, createTestimonial } from "@/lib/db";

const createSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  avatar: z.string().optional(),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(1),
  featured: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const testimonials = await getTestimonials();
  return NextResponse.json({ testimonials });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const testimonial = await createTestimonial(parsed.data);
  return NextResponse.json({ testimonial }, { status: 201 });
}
