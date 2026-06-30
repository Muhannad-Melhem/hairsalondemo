import { createMetadata } from "@/lib/metadata";
import { ContactContent } from "./contact-content";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Luxe Hair Studio. Book an appointment, ask a question, or visit our Toronto salon.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
