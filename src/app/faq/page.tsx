import { createMetadata } from "@/lib/metadata";
import FAQContent from "./faq-content";

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about our hair salon in Amman.",
  path: "/faq",
});

export default function FAQPage() {
  return <FAQContent />;
}
