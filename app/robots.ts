import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const DOMAIN = process.env.SITE_URL || "https://www.thuyduonglimousine.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
