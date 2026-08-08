import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import NewsForm from "@/components/admin/NewsForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const post = await prisma.newsPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <AdminShell active="news">
      <p className="admin-h1">Sửa: {post.title}</p>
      <div className="admin-card">
        <NewsForm
          mode="edit"
          postId={post.id}
          initial={{
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || "",
            contentHtml: post.contentHtml || "",
            coverImage: post.coverImage || "",
            published: post.published,
          }}
        />
      </div>
    </AdminShell>
  );
}
