import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminContactsList() {
  const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminShell active="contacts">
      <p className="admin-h1">Đăng ký / liên hệ</p>
      <p className="admin-sub">Danh sách khách hàng gửi form đặt xe từ website.</p>

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>SĐT</th>
              <th>Tuyến đường</th>
              <th>Ghi chú</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 && (
              <tr>
                <td colSpan={5} style={{ color: "var(--admin-muted)" }}>
                  Chưa có yêu cầu nào.
                </td>
              </tr>
            )}
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <a href={`tel:${c.phone}`}>{c.phone}</a>
                </td>
                <td>{c.route || "—"}</td>
                <td>{c.note || "—"}</td>
                <td style={{ color: "var(--admin-muted)", whiteSpace: "nowrap" }}>
                  {new Date(c.createdAt).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
