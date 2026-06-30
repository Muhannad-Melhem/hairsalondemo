import { createMetadata } from "@/lib/metadata";
import { TestimonialsContent } from "./testimonials-content";

export const metadata = createMetadata({
  title: "Testimonials",
  description:
    "Hear from our clients about their experiences at Luxe Hair Studio. Real reviews from real people who trust us with their hair.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
