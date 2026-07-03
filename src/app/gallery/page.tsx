import { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import GalleryContent from "./gallery-content";

export const metadata: Metadata = createMetadata({
  title: "Gallery",
  description:
    "Browse our portfolio of transformations — precision cuts, stunning colour work, bridal styling, and editorial looks crafted by our expert team.",
  path: "/gallery",
});

export default function GalleryPage() {
  return <GalleryContent />;
}
