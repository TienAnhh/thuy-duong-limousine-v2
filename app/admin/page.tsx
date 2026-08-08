import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [pageCount, newsCount, contactCount] = await Promise.all([
    prisma.page.count(),
    prisma.newsPost.count(),
    prisma.contactSubmission.count(),
  ]);

  return (
    <AdminShell active="dashboard">
      <p className="admin-h1">Tổng quan</p>
      <p className="admin-sub">Xin chào, đây là toàn bộ nội dung đang hoạt động trên website.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <a href="/admin/pages" className="admin-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{pageCount}</div>
          <div style={{ color: "var(--admin-muted)", fontSize: 13.5 }}>Trang nội dung</div>
        </a>
        <a href="/admin/news" className="admin-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{newsCount}</div>
          <div style={{ color: "var(--admin-muted)", fontSize: 13.5 }}>Bài tin tức</div>
        </a>
        <a href="/admin/contacts" className="admin-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{contactCount}</div>
          <div style={{ color: "var(--admin-muted)", fontSize: 13.5 }}>Yêu cầu đăng ký</div>
        </a>
      </div>
    </AdminShell>
  );
}
