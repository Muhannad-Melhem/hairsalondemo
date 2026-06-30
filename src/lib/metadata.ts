import { Metadata } from "next";
import { SITE } from "./constants";

interface PageSEO {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

export function createMetadata({ title, description, path = "/", ogImage }: PageSEO): Metadata {
  const url = `${SITE.url}${path}`;
  const image = ogImage || `${SITE.url}/og-image.jpg`;

  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
  };
}
