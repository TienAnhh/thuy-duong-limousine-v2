import { prisma } from "./prisma";

export async function getNavPages() {
  return prisma.page.findMany({
    where: { published: true, type: { in: ["route", "service"] } },
    orderBy: { sortOrder: "asc" },
    select: { slug: true, navLabel: true, type: true },
  });
}

export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({ where: { slug, published: true } });
}

export async function getPublishedNews() {
  return prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getNewsBySlug(slug: string) {
  return prisma.newsPost.findUnique({ where: { slug, published: true } });
}
