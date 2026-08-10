import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DOMAIN = process.env.SITE_URL || "https://www.thuyduonglimousine.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await prisma.page.findMany({ where: { published: true } });
  const posts = await prisma.newsPost.findMany({ where: { published: true } });

  const pageEntries: MetadataRoute.Sitemap = pages.map((p) => ({
    url: p.slug === "home" ? DOMAIN : `${DOMAIN}/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: p.slug === "home" ? 1 : 0.8,
  }));

  const newsEntries: MetadataRoute.Sitemap = posts.map((n) => ({
    url: `${DOMAIN}/tin-tuc/${n.slug}`,
    lastModified: n.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const newsIndex: MetadataRoute.Sitemap = [
    { url: `${DOMAIN}/tin-tuc`, changeFrequency: "weekly", priority: 0.6 },
  ];

  return [...pageEntries, ...newsIndex, ...newsEntries];
}
