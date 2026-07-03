import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ServicesContent from "./services-content";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description: "Explore our premium hair services in Amman.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
