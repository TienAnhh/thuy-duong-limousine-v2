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

export const NEWS_PAGE_SIZE = 5;

// Chỉ lấy các cột cần cho danh sách (KHÔNG lấy contentHtml - nội dung đầy đủ
// chỉ cần ở trang chi tiết) để tránh tải nặng khi số bài tăng lên.
const NEWS_LIST_SELECT = {
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  publishedAt: true,
} as const;

export async function getPublishedNews(page = 1, pageSize = NEWS_PAGE_SIZE) {
  const skip = Math.max(0, (page - 1) * pageSize);

  const [posts, total] = await Promise.all([
    prisma.newsPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: NEWS_LIST_SELECT,
      skip,
      take: pageSize,
    }),
    prisma.newsPost.count({ where: { published: true } }),
  ]);

  return { posts, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getNewsBySlug(slug: string) {
  const { isEnabled } = draftMode();
  return prisma.newsPost.findUnique({
    where: isEnabled ? { slug } : { slug, published: true },
  });
}
