import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import PageForm from "@/components/admin/PageForm";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: { id: string } }) {
  const page = await prisma.page.findUnique({ where: { id: params.id } });
  if (!page) notFound();

  return (
    <AdminShell active="pages">
      <p className="admin-h1">Sửa: {page.navLabel}</p>
      <p className="admin-sub">/{page.slug === "home" ? "" : page.slug}</p>
      <div className="admin-card">
        <PageForm
          mode="edit"
          pageId={page.id}
          initial={{
            slug: page.slug,
            type: page.type,
            navLabel: page.navLabel,
            h1: page.h1,
            metaTitle: page.metaTitle || "",
            metaDescription: page.metaDescription || "",
            keywords: page.keywords || "",
            bannerUrl: page.bannerUrl || "",
            priceFrom: page.priceFrom || "",
            duration: page.duration || "",
            bodyHtml: page.bodyHtml || "",
            published: page.published,
            sortOrder: page.sortOrder,
          }}
        />
      </div>
    </AdminShell>
  );
}
