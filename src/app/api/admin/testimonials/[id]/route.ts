import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { updateTestimonial, deleteTestimonial } from "@/lib/db";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().optional(),
  avatar: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).optional(),
  content: z.string().min(1).optional(),
  featured: z.boolean().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const testimonial = await updateTestimonial(id, parsed.data);
  return NextResponse.json({ testimonial });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteTestimonial(id);
  return NextResponse.json({ success: true });
}
