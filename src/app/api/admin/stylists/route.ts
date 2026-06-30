import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getStylists, createStylist } from "@/lib/db";

const createSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  bio: z.string().optional(),
  specialties: z.array(z.string()).optional(),
  experience: z.coerce.number().optional(),
  image: z.string().optional(),
  instagram: z.string().optional(),
  active: z.boolean().optional(),
});

function serializeData(data: z.infer<typeof createSchema>) {
  return {
    ...data,
    specialties: data.specialties ? JSON.stringify(data.specialties) : undefined,
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stylists = await getStylists();
  return NextResponse.json({ stylists });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const stylist = await createStylist(serializeData(parsed.data));
  return NextResponse.json({ stylist }, { status: 201 });
}
