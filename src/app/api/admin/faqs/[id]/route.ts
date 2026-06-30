import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { updateFAQ, deleteFAQ } from "@/lib/db";

const updateSchema = z.object({
  question: z.string().min(1).optional(),
  answer: z.string().min(1).optional(),
  order: z.coerce.number().optional(),
  active: z.boolean().optional(),
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

  const faq = await updateFAQ(id, parsed.data);
  return NextResponse.json({ faq });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteFAQ(id);
  return NextResponse.json({ success: true });
}
