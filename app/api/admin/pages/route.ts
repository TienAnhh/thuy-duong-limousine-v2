import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await prisma.page.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.slug || !data.navLabel || !data.h1 || !data.type) {
    return NextResponse.json({ error: "Thiếu slug, tên hiển thị, tiêu đề hoặc loại trang" }, { status: 400 });
  }

  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugPattern.test(data.slug)) {
    return NextResponse.json(
      { error: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang, ví dụ: tuyen-ha-noi-mong-cai" },
      { status: 400 }
    );
  }

  const existing = await prisma.page.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug này đã tồn tại, chọn slug khác" }, { status: 409 });
  }

  const page = await prisma.page.create({
    data: {
      slug: data.slug,
      type: data.type,
      navLabel: data.navLabel,
      h1: data.h1,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      keywords: data.keywords || null,
      bannerUrl: data.bannerUrl || null,
      icon: data.icon || null,
      priceFrom: data.priceFrom || null,
      duration: data.duration || null,
      bodyHtml: data.bodyHtml || null,
      published: data.published ?? true,
      sortOrder: data.sortOrder ?? 0,
    },
  });

  return NextResponse.json(page, { status: 201 });
}
