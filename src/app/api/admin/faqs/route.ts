import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getFAQs, createFAQ } from "@/lib/db";

const createSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  order: z.coerce.number().optional(),
  active: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const faqs = await getFAQs();
  return NextResponse.json({ faqs });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const faq = await createFAQ(parsed.data);
  return NextResponse.json({ faq }, { status: 201 });
}
