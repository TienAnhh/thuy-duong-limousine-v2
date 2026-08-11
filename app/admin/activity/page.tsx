import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/session";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

const actionLabel: Record<string, string> = { create: "Thêm mới", update: "Sửa", delete: "Xóa" };
const typeLabel: Record<string, string> = { page: "Trang", news: "Tin tức", price: "Dòng giá" };

export default async function AdminActivityPage() {
  const session = await requireSuperAdmin();
  if (!session) redirect("/admin");

  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <AdminShell active="activity">
      <p className="admin-h1">Nhật ký hoạt động</p>
      <p className="admin-sub">
        Ghi lại thao tác thêm/sửa/xóa của các tài khoản Admin thường (không ghi hành động của Super Admin). Hiện
        200 hoạt động gần nhất.
      </p>

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Hành động</th>
              <th>Loại</th>
              <th>Đối tượng</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} style={{ color: "var(--admin-muted)" }}>
                  Chưa có hoạt động nào được ghi nhận.
                </td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.adminUsername}</td>
                <td>
                  <span
                    className={`admin-badge ${log.action === "delete" ? "service" : log.action === "create" ? "route" : "static"}`}
                  >
                    {actionLabel[log.action] || log.action}
                  </span>
                </td>
                <td style={{ color: "var(--admin-muted)" }}>{typeLabel[log.targetType] || log.targetType}</td>
                <td>{log.targetLabel}</td>
                <td style={{ color: "var(--admin-muted)", whiteSpace: "nowrap" }}>
                  {new Date(log.createdAt).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
