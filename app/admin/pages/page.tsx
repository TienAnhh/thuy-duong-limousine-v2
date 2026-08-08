import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

const typeLabel: Record<string, string> = { static: "Cố định", route: "Tuyến đường", service: "Dịch vụ" };

export default async function AdminPagesList() {
  const pages = await prisma.page.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminShell active="pages">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <p className="admin-h1">Trang nội dung</p>
        <a className="admin-btn" href="/admin/pages/new">
          + Thêm trang mới
        </a>
      </div>
      <p className="admin-sub">Trang tuyến/dịch vụ thêm ở đây sẽ tự xuất hiện trên trang chủ, menu và sitemap.</p>

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tên hiển thị</th>
              <th>Loại</th>
              <th>Slug</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id}>
                <td>{p.navLabel}</td>
                <td>
                  <span className={`admin-badge ${p.type}`}>{typeLabel[p.type] || p.type}</span>
                </td>
                <td style={{ color: "var(--admin-muted)" }}>/{p.slug === "home" ? "" : p.slug}</td>
                <td>{p.published ? "Đang hiện" : "Đã ẩn"}</td>
                <td>
                  <a className="admin-btn ghost" href={`/admin/pages/${p.id}`}>
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
