import { MetadataRoute } from "next";

const DOMAIN = process.env.SITE_URL || "https://www.duongthuylimousine.top";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
