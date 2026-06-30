import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getStylistById, updateStylist, deleteStylist } from "@/lib/db";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  bio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  experience: z.coerce.number().optional(),
  image: z.string().optional(),
  instagram: z.string().optional(),
  active: z.boolean().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stylist = await getStylistById(id);
  if (!stylist) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ stylist });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = {
    ...parsed.data,
    specialties: parsed.data.specialties ? JSON.stringify(parsed.data.specialties) : undefined,
  };
  const stylist = await updateStylist(id, data);
  return NextResponse.json({ stylist });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteStylist(id);
  return NextResponse.json({ success: true });
}
