import { createMetadata } from "@/lib/metadata";
import { FAQContent } from "./faq-content";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about our services, booking, pricing, and salon policies at Luxe Hair Studio.",
  path: "/faq",
});

export default function FAQPage() {
  return <FAQContent />;
}
