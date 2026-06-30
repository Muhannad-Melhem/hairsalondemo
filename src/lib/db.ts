import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import type {
  Service,
  Stylist,
  GalleryItem,
  Testimonial,
  Booking,
  FAQItem,
  Profile,
} from "@/types";

// ── Users / Auth ─────────────────────────────────────────

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: "admin" | "editor" | "customer" = "customer",
) {
  const passwordHash = await bcrypt.hash(password, 12);
  return prisma.user.create({
    data: { email, passwordHash, name, role },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: string, data: { name?: string; avatar?: string }) {
  return prisma.user.update({ where: { id }, data });
}

// ── Services ─────────────────────────────────────────────

export function mapService(s: Record<string, unknown>): Service {
  return {
    id: s.id as string,
    name: s.name as string,
    description: s.description as string,
    duration: s.duration as number,
    price: Number(s.price),
    category: s.category as string,
    image: (s.image as string) ?? "",
    featured: (s.featured as boolean) ?? false,
    active: (s.active as boolean) ?? true,
    createdAt: (s.created_at ?? s.createdAt) as string,
  };
}

export async function getServices(opts?: { activeOnly?: boolean }) {
  const where = opts?.activeOnly ? { active: true } : {};
  const data = await prisma.service.findMany({ where, orderBy: { name: "asc" } });
  return data.map(mapService);
}

export async function getServiceById(id: string) {
  const data = await prisma.service.findUnique({ where: { id } });
  return data ? mapService(data) : null;
}

export async function createService(data: {
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  image?: string;
  featured?: boolean;
  active?: boolean;
}) {
  return prisma.service.create({ data });
}

export async function updateService(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    image: string;
    featured: boolean;
    active: boolean;
  }>,
) {
  return prisma.service.update({ where: { id }, data });
}

export async function deleteService(id: string) {
  return prisma.service.delete({ where: { id } });
}

// ── Stylists ─────────────────────────────────────────────

export function mapStylist(s: Record<string, unknown>): Stylist {
  let specialties: string[] = [];
  const raw = s.specialties;
  if (typeof raw === "string") {
    try {
      specialties = JSON.parse(raw);
    } catch {
      specialties = [];
    }
  } else if (Array.isArray(raw)) {
    specialties = raw;
  }

  return {
    id: s.id as string,
    name: s.name as string,
    title: s.title as string,
    bio: (s.bio as string) ?? "",
    specialties,
    experience: (s.experience as number) ?? 0,
    image: (s.image as string) ?? "",
    instagram: (s.instagram as string) ?? undefined,
    active: (s.active as boolean) ?? true,
    createdAt: (s.created_at ?? s.createdAt) as string,
  };
}

export async function getStylists(opts?: { activeOnly?: boolean }) {
  const where = opts?.activeOnly ? { active: true } : {};
  const data = await prisma.stylist.findMany({ where, orderBy: { name: "asc" } });
  return data.map(mapStylist);
}

export async function getStylistById(id: string) {
  const data = await prisma.stylist.findUnique({ where: { id } });
  return data ? mapStylist(data) : null;
}

export async function createStylist(data: {
  name: string;
  title: string;
  bio?: string;
  specialties?: string;
  experience?: number;
  image?: string;
  instagram?: string;
  active?: boolean;
}) {
  return prisma.stylist.create({ data });
}

export async function updateStylist(
  id: string,
  data: Partial<{
    name: string;
    title: string;
    bio: string;
    specialties: string;
    experience: number;
    image: string;
    instagram: string;
    active: boolean;
  }>,
) {
  return prisma.stylist.update({ where: { id }, data });
}

export async function deleteStylist(id: string) {
  return prisma.stylist.delete({ where: { id } });
}

// ── Gallery ──────────────────────────────────────────────

export function mapGalleryItem(g: Record<string, unknown>): GalleryItem {
  return {
    id: g.id as string,
    src: g.src as string,
    alt: g.alt as string,
    category: g.category as string,
    stylist: g.stylist as string | undefined,
    createdAt: (g.created_at ?? g.createdAt) as string,
  };
}

export async function getGalleryItems(opts?: { category?: string }) {
  const where = opts?.category && opts.category !== "All" ? { category: opts.category } : {};
  const data = await prisma.galleryItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { stylist: { select: { name: true } } },
  });
  return data.map((item) => ({
    ...item,
    stylist: item.stylist?.name,
  })) as unknown as GalleryItem[];
}

export async function createGalleryItem(data: {
  src: string;
  alt: string;
  category: string;
  stylistId?: string;
}) {
  return prisma.galleryItem.create({ data });
}

export async function deleteGalleryItem(id: string) {
  return prisma.galleryItem.delete({ where: { id } });
}

// ── Testimonials ─────────────────────────────────────────

export function mapTestimonial(t: Record<string, unknown>): Testimonial {
  return {
    id: t.id as string,
    name: t.name as string,
    role: (t.role as string) ?? undefined,
    avatar: (t.avatar as string) ?? undefined,
    rating: (t.rating as number) ?? 5,
    content: t.content as string,
    featured: (t.featured as boolean) ?? false,
    createdAt: (t.created_at ?? t.createdAt) as string,
  };
}

export async function getTestimonials(opts?: { featuredOnly?: boolean }) {
  const where = opts?.featuredOnly ? { featured: true } : {};
  const data = await prisma.testimonial.findMany({ where, orderBy: { createdAt: "desc" } });
  return data.map(mapTestimonial);
}

export async function createTestimonial(data: {
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  content: string;
  featured?: boolean;
}) {
  return prisma.testimonial.create({ data });
}

export async function updateTestimonial(
  id: string,
  data: Partial<{
    name: string;
    role: string;
    avatar: string;
    rating: number;
    content: string;
    featured: boolean;
  }>,
) {
  return prisma.testimonial.update({ where: { id }, data });
}

export async function deleteTestimonial(id: string) {
  return prisma.testimonial.delete({ where: { id } });
}

// ── Bookings ─────────────────────────────────────────────

export function mapBooking(b: Record<string, unknown>): Booking {
  return {
    id: b.id as string,
    serviceId: (b.service_id ?? b.serviceId) as string,
    stylistId: (b.stylist_id ?? b.stylistId) as string | undefined,
    date: b.date as string,
    time: (b.time as string).slice(0, 5),
    customerName: (b.customer_name ?? b.customerName) as string,
    customerEmail: (b.customer_email ?? b.customerEmail) as string,
    customerPhone: (b.customer_phone ?? b.customerPhone) as string,
    notes: (b.notes as string | undefined) ?? undefined,
    status: (b.status as Booking["status"]) ?? "pending",
    createdAt: (b.created_at ?? b.createdAt) as string,
  };
}

export async function getBookings(opts?: {
  status?: string;
  email?: string;
  page?: number;
  limit?: number;
}) {
  const page = opts?.page ?? 1;
  const limit = opts?.limit ?? 50;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (opts?.status && ["pending", "confirmed", "cancelled", "completed"].includes(opts.status)) {
    where.status = opts.status;
  }
  if (opts?.email) {
    where.customerEmail = opts.email;
  }

  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      where: where,
      orderBy: { date: "desc" },
      skip,
      take: limit,
      include: { service: { select: { name: true } }, stylist: { select: { name: true } } },
    } as Parameters<typeof prisma.booking.findMany>[0]),
    prisma.booking.count({ where: where as any }),
  ]);

  return {
    bookings: data.map((b) => ({
      ...mapBooking(b as unknown as Record<string, unknown>),
      serviceName: (b as unknown as Record<string, { name: string }>).service?.name ?? "Unknown",
      stylistName: (b as unknown as Record<string, { name: string }>).stylist?.name,
    })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getBookingById(id: string) {
  const data = await prisma.booking.findUnique({
    where: { id },
    include: { service: { select: { name: true } }, stylist: { select: { name: true } } },
  });
  if (!data) return null;
  return {
    ...mapBooking(data),
    serviceName: data.service.name,
    stylistName: data.stylist?.name,
  };
}

export async function createBooking(data: {
  serviceId: string;
  stylistId?: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status?: string;
}) {
  const booking = await prisma.booking.create({
    data: {
      serviceId: data.serviceId,
      stylistId: data.stylistId ?? null,
      date: data.date,
      time: data.time,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      notes: data.notes ?? null,
      status: data.status ?? "pending",
    },
    include: { service: { select: { name: true } }, stylist: { select: { name: true } } },
  });

  return {
    ...mapBooking(booking),
    serviceName: booking.service.name,
    stylistName: booking.stylist?.name,
  };
}

export async function updateBookingStatus(id: string, status: string) {
  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
    include: { service: { select: { name: true } }, stylist: { select: { name: true } } },
  });
  return {
    ...mapBooking(updated),
    serviceName: updated.service.name,
    stylistName: updated.stylist?.name,
  };
}

export async function deleteBooking(id: string) {
  return prisma.booking.delete({ where: { id } });
}

// ── FAQs ─────────────────────────────────────────────────

export function mapFAQ(f: Record<string, unknown>): FAQItem {
  return {
    id: f.id as string,
    question: f.question as string,
    answer: f.answer as string,
    order: (f.order ?? f.display_order ?? 0) as number,
    active: (f.active as boolean) ?? true,
    createdAt: (f.created_at ?? f.createdAt) as string,
  };
}

export async function getFAQs(opts?: { activeOnly?: boolean }) {
  const where = opts?.activeOnly ? { active: true } : {};
  const data = await prisma.fAQ.findMany({ where, orderBy: { order: "asc" } });
  return data.map(mapFAQ);
}

export async function createFAQ(data: { question: string; answer: string; order?: number; active?: boolean }) {
  return prisma.fAQ.create({ data });
}

export async function updateFAQ(
  id: string,
  data: Partial<{ question: string; answer: string; order: number; active: boolean }>,
) {
  return prisma.fAQ.update({ where: { id }, data });
}

export async function deleteFAQ(id: string) {
  return prisma.fAQ.delete({ where: { id } });
}

// ── Site Settings ────────────────────────────────────────

export async function getSiteSetting(key: string) {
  const setting = await prisma.siteSetting.findUnique({ where: { key } });
  return setting ? JSON.parse(setting.value) : null;
}

export async function upsertSiteSetting(key: string, value: Record<string, unknown>) {
  return prisma.siteSetting.upsert({
    where: { key },
    update: { value: JSON.stringify(value) },
    create: { key, value: JSON.stringify(value) },
  });
}

// ── Dashboard Stats ──────────────────────────────────────

export async function getDashboardStats() {
  const [totalBookings, pendingBookings, activeServices, totalStylists] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.service.count({ where: { active: true } }),
    prisma.stylist.count(),
  ]);

  return { totalBookings, pendingBookings, activeServices, totalStylists };
}
