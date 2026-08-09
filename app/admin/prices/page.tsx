import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminPricesList() {
  const rows = await prisma.priceRow.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <AdminShell active="prices">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <p className="admin-h1">Bảng giá</p>
        <a className="admin-btn" href="/admin/prices/new">
          + Thêm dòng giá
        </a>
      </div>
      <p className="admin-sub">
        Toàn bộ dòng ở đây sẽ hiện trong bảng giá ở trang chủ. Mục "Tuyến đường khai thác" trên trang chủ sẽ tự
        chọn ngẫu nhiên 6 dòng từ đây mỗi lần tải trang.
      </p>

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tuyến đường</th>
              <th>Giá vé</th>
              <th>Thời gian</th>
              <th>Ghi chú</th>
              <th>Thứ tự</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ color: "var(--admin-muted)" }}>
                  Chưa có dòng giá nào.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.route}</td>
                <td>{r.price}</td>
                <td style={{ color: "var(--admin-muted)" }}>{r.duration || "—"}</td>
                <td style={{ color: "var(--admin-muted)" }}>{r.note || "—"}</td>
                <td>{r.sortOrder}</td>
                <td>
                  <a className="admin-btn ghost" href={`/admin/prices/${r.id}`}>
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
