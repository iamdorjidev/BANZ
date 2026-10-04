import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const paths = ["/", "/about", "/executive", "/community", "/events", "/new-to-nz", "/membership", "/donate", "/contact", "/news", "/gallery", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${site.url}${p === "/" ? "" : p}`,
    changeFrequency: p === "/events" ? "weekly" : "monthly",
  }));
}
