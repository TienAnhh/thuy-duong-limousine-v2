import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await prisma.newsPost.findMany({ orderBy: { publishedAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.slug || !data.title) {
    return NextResponse.json({ error: "Thiếu slug hoặc tiêu đề" }, { status: 400 });
  }

  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugPattern.test(data.slug)) {
    return NextResponse.json(
      { error: "Slug chỉ được chứa chữ thường, số và dấu gạch ngang" },
      { status: 400 }
    );
  }

  const existing = await prisma.newsPost.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug này đã tồn tại, chọn slug khác" }, { status: 409 });
  }

  const post = await prisma.newsPost.create({
    data: {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || null,
      contentHtml: data.contentHtml || null,
      coverImage: data.coverImage || null,
      published: data.published ?? true,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
    },
  });

  return NextResponse.json(post, { status: 201 });
}
