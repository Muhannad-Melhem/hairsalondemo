import { createMetadata } from "@/lib/metadata";
import TestimonialsContent from "./testimonials-content";

export const metadata = createMetadata({
  title: "Testimonials",
  description:
    "Hear from our clients about their experiences at Luxe Hair Studio in Amman. Real reviews from real people.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
