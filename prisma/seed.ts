import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminEmail = "admin@luxehairstudio.com";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        passwordHash: hashed,
        role: "admin",
      },
    });
    console.log(`  ✓ Admin user created (${adminEmail} / admin123)`);
  } else {
    console.log("  - Admin user already exists");
  }

  const services = [
    { name: "Classic Haircut", description: "Precision haircut tailored to your style", duration: 45, price: 65, category: "Haircuts", featured: true, active: true },
    { name: "Blow Dry & Style", description: "Professional blow dry with lasting volume", duration: 45, price: 55, category: "Styling", featured: true, active: true },
    { name: "Full Balayage", description: "Hand-painted highlights for a natural look", duration: 150, price: 200, category: "Color", featured: true, active: true },
    { name: "Keratin Treatment", description: "Smoothing treatment for frizz-free hair", duration: 120, price: 250, category: "Treatments", featured: false, active: true },
    { name: "Bridal Package", description: "Complete bridal hair styling with trial", duration: 180, price: 350, category: "Occasions", featured: true, active: true },
    { name: "Men's Grooming", description: "Cut, beard trim, and hot towel finish", duration: 45, price: 50, category: "Haircuts", featured: false, active: true },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { id: s.name.toLowerCase().replace(/\s+/g, "-"), ...s },
    });
  }
  console.log(`  ✓ ${services.length} services created`);

  const stylists = [
    { name: "Sophia Chen", title: "Master Stylist", bio: "With over 15 years of experience, Sophia specializes in precision cuts and balayage.", specialties: JSON.stringify(["Cuts", "Balayage", "Color"]), experience: 15, image: "/placeholder.svg", active: true },
    { name: "Marcus Johnson", title: "Senior Barber", bio: "Marcus brings urban edge to classic barbering with over 10 years of experience.", specialties: JSON.stringify(["Men's Cuts", "Beard Grooming", "Hot Towel"]), experience: 10, image: "/placeholder.svg", active: true },
    { name: "Isabella Rossi", title: "Color Specialist", bio: "Isabella is an expert in creative color techniques and transformations.", specialties: JSON.stringify(["Balayage", "Highlights", "Creative Color"]), experience: 12, image: "/placeholder.svg", active: true },
  ];

  for (const st of stylists) {
    await prisma.stylist.upsert({
      where: { id: st.name.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: { id: st.name.toLowerCase().replace(/\s+/g, "-"), ...st },
    });
  }
  console.log(`  ✓ ${stylists.length} stylists created`);

  const galleryItems = [
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800", alt: "Modern balayage highlights", category: "color" },
    { src: "https://images.unsplash.com/photo-1701976333339-1d41dad8138b?w=800", alt: "Elegant bridal updo", category: "occasions" },
    { src: "https://images.unsplash.com/photo-1634449571017-5fecfd26ad76?w=800", alt: "Precision haircut", category: "haircuts" },
    { src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800", alt: "Blowout styling", category: "styling" },
  ];

  for (const g of galleryItems) {
    await prisma.galleryItem.create({ data: g });
  }
  console.log(`  ✓ ${galleryItems.length} gallery items created`);

  const testimonials = [
    { name: "Sarah M.", role: "Regular Client", rating: 5, content: "Absolutely love this salon! Sophia gave me the best haircut I've ever had.", featured: true },
    { name: "James K.", role: "VIP Client", rating: 5, content: "Marcus is the only barber I trust. The hot towel shave is incredible.", featured: true },
    { name: "Emily R.", role: "Bride", rating: 5, content: "Isabella created the most beautiful balayage for my wedding. I felt like a queen!", featured: true },
    { name: "David L.", role: "Regular Client", rating: 4, content: "Great atmosphere and talented team. My go-to salon in the city.", featured: false },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`  ✓ ${testimonials.length} testimonials created`);

  const faqs = [
    { question: "How long does a typical appointment take?", answer: "Most services range from 45 minutes to 2.5 hours depending on the treatment.", order: 0, active: true },
    { question: "What is your cancellation policy?", answer: "We ask for 24 hours notice for cancellations. Late cancellations may incur a 50% fee.", order: 1, active: true },
    { question: "Do you offer consultations?", answer: "Yes! We offer free 15-minute consultations for all new clients.", order: 2, active: true },
    { question: "What products do you use?", answer: "We use professional-grade products including Oribe, Olaplex, and Kerastase.", order: 3, active: true },
    { question: "Do you offer bridal services?", answer: "Absolutely! We offer comprehensive bridal packages including trials and on-site styling.", order: 4, active: true },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }
  console.log(`  ✓ ${faqs.length} FAQs created`);

  console.log("\nSeed complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
