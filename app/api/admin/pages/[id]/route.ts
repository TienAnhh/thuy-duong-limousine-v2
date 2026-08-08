import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) return NextResponse.json({ error: "Không tìm thấy trang" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();

  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) return NextResponse.json({ error: "Không tìm thấy trang" }, { status: 404 });

  const updated = await prisma.page.update({
    where: { id: params.id },
    data: {
      navLabel: data.navLabel ?? page.navLabel,
      h1: data.h1 ?? page.h1,
      metaTitle: data.metaTitle ?? page.metaTitle,
      metaDescription: data.metaDescription ?? page.metaDescription,
      keywords: data.keywords ?? page.keywords,
      bannerUrl: data.bannerUrl ?? page.bannerUrl,
      priceFrom: data.priceFrom ?? page.priceFrom,
      duration: data.duration ?? page.duration,
      bodyHtml: data.bodyHtml ?? page.bodyHtml,
      published: data.published ?? page.published,
      sortOrder: data.sortOrder ?? page.sortOrder,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) return NextResponse.json({ error: "Không tìm thấy trang" }, { status: 404 });

  if (page.slug === "home") {
    return NextResponse.json({ error: "Không thể xóa trang chủ" }, { status: 400 });
  }

  await prisma.page.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
