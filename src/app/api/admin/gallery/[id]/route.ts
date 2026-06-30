import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteGalleryItem } from "@/lib/db";

type RouteParams = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteGalleryItem(id);
  return NextResponse.json({ success: true });
}
