import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.newsPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();

  const post = await prisma.newsPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });

  const updated = await prisma.newsPost.update({
    where: { id: params.id },
    data: {
      title: data.title ?? post.title,
      excerpt: data.excerpt ?? post.excerpt,
      contentHtml: data.contentHtml ?? post.contentHtml,
      coverImage: data.coverImage ?? post.coverImage,
      published: data.published ?? post.published,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : post.publishedAt,
    },
  });

  await logActivity("update", "news", updated.title);

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.newsPost.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });

  await prisma.newsPost.delete({ where: { id: params.id } });
  await logActivity("delete", "news", post.title);
  return NextResponse.json({ ok: true });
}
