import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminNewsList() {
  const posts = await prisma.newsPost.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <AdminShell active="news">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <p className="admin-h1">Tin tức</p>
        <a className="admin-btn" href="/admin/news/new">
          + Thêm bài viết
        </a>
      </div>
      <p className="admin-sub">Bài viết đã xuất bản sẽ tự xuất hiện tại /tin-tuc và trong sitemap.</p>

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Ngày đăng</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} style={{ color: "var(--admin-muted)" }}>
                  Chưa có bài viết nào.
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td style={{ color: "var(--admin-muted)" }}>
                  {new Date(p.publishedAt).toLocaleDateString("vi-VN")}
                </td>
                <td>{p.published ? "Đã đăng" : "Bản nháp"}</td>
                <td>
                  <a className="admin-btn ghost" href={`/admin/news/${p.id}`}>
                    Sửa
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
