import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getServiceById, updateService, deleteService } from "@/lib/db";

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  duration: z.coerce.number().min(5).optional(),
  price: z.coerce.number().min(0).optional(),
  category: z.string().min(1).optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const service = await getServiceById(id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ service });
  } catch (error) {
    console.error("[Admin Services] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const service = await updateService(id, parsed.data);
    return NextResponse.json({ service });
  } catch (error) {
    console.error("[Admin Services] PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin Services] DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
