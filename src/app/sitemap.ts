import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/services", "/gallery", "/stylists", "/about", "/testimonials", "/faq", "/contact", "/privacy"].map(
    (route) => ({
      url: `${SITE.url}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })
  );
  return routes;
}
