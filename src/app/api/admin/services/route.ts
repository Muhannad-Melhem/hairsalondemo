import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getServices, createService } from "@/lib/db";

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  duration: z.coerce.number().min(5),
  price: z.coerce.number().min(0),
  category: z.string().min(1),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const services = await getServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error("[Admin Services] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const service = await createService(parsed.data);
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("[Admin Services] POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
