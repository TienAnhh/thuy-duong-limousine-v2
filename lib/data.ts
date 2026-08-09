import { draftMode } from "next/headers";
import { prisma } from "./prisma";

export async function getNavPages() {
  return prisma.page.findMany({
    where: { published: true, type: { in: ["route", "service"] } },
    orderBy: { sortOrder: "asc" },
    select: { slug: true, navLabel: true, type: true },
  });
}

export async function getPageBySlug(slug: string) {
  const { isEnabled } = draftMode();
  return prisma.page.findUnique({
    where: isEnabled ? { slug } : { slug, published: true },
  });
}

export async function getPriceRows() {
  return prisma.priceRow.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getPublishedNews() {
  return prisma.newsPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getNewsBySlug(slug: string) {
  const { isEnabled } = draftMode();
  return prisma.newsPost.findUnique({
    where: isEnabled ? { slug } : { slug, published: true },
  });
}
