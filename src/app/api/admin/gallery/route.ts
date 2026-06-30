import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getGalleryItems, createGalleryItem } from "@/lib/db";

const createSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  category: z.string().min(1),
  stylistId: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await getGalleryItems();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const item = await createGalleryItem(parsed.data);
  return NextResponse.json({ item }, { status: 201 });
}
