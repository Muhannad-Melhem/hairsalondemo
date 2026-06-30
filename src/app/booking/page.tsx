import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { getServices, getStylists } from "@/lib/supabase/actions";
import { BookingForm } from "@/components/booking/booking-form";
import type { Service, Stylist } from "@/types";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Schedule your appointment at Luxe Hair Studio. Choose from our premium services, select your preferred stylist, and pick the perfect time.",
  openGraph: {
    title: "Book an Appointment | Luxe Hair Studio",
    description:
      "Schedule your appointment at Luxe Hair Studio. Choose from our premium services, select your preferred stylist, and pick the perfect time.",
  },
};

export default async function BookingPage() {
  const [servicesData, stylistsData] = await Promise.all([
    getServices().catch(() => []),
    getStylists().catch(() => []),
  ]);

  const services: Service[] = (servicesData ?? []).map((s: Service) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    duration: s.duration,
    price: Number(s.price),
    category: s.category,
    image: s.image ?? "",
    featured: s.featured ?? false,
    active: s.active ?? true,
    createdAt: s.createdAt ?? "",
  }));

  const stylists: Stylist[] = (stylistsData ?? []).map((s: Stylist) => ({
    id: s.id,
    name: s.name,
    title: s.title,
    bio: s.bio ?? "",
    specialties: s.specialties ?? [],
    experience: s.experience ?? 0,
    image: s.image ?? "",
    instagram: s.instagram ?? undefined,
    active: s.active ?? true,
    createdAt: s.createdAt ?? "",
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BookingAction",
    name: "Book an Appointment",
    description: "Book your appointment at Luxe Hair Studio",
    provider: {
      "@type": "HairSalon",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postcode,
        addressCountry: SITE.address.country,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden bg-muted/30 pb-16 pt-8 sm:pb-24 sm:pt-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--color-brand-gold-light)_0%,_transparent_50%)] opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-brand-rose-light)_0%,_transparent_50%)] opacity-30" />

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl text-foreground sm:text-5xl lg:text-6xl">
            Book Your Appointment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Experience the art of exceptional hair care. Select your service,
            choose your time, and let us take care of the rest.
          </p>
        </div>
      </section>

      <BookingForm services={services} stylists={stylists} />
    </>
  );
}
