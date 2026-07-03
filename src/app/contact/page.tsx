import { createMetadata } from "@/lib/metadata";
import ContactContent from "./contact-content";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Luxe Hair Studio in Abdoun, Amman.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
