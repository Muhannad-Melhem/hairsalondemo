import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import StylistsContent from "./stylists-content";

export const metadata: Metadata = createMetadata({
  title: "Our Stylists",
  description:
    "Meet the artists behind Luxe Hair Studio — a team of passionate, highly trained professionals dedicated to the craft of hair.",
  path: "/stylists",
});

export default function StylistsPage() {
  return <StylistsContent />;
}
