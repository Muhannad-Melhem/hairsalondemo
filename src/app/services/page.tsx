import { createMetadata } from "@/lib/metadata";
import { ServicesContent } from "./services-content";

export const metadata = createMetadata({
  title: "Our Services",
  description:
    "Explore our comprehensive range of premium hair services — precision cuts, expert colour, revitalising treatments, and elegant styling.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
