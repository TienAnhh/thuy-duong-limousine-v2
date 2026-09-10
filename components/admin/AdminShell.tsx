import LogoutButton from "./LogoutButton";
import AdminNav from "./AdminNav";
import { getSession } from "@/lib/session";
import { draftMode } from "next/headers";

export default async function AdminShell({
  active,
  children,
}: {
  active: "dashboard" | "pages" | "prices" | "news" | "contacts" | "accounts" | "activity" | "analytics";
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isSuperAdmin = session?.role === "superadmin";
  const { isEnabled: previewEnabled } = draftMode();

  return (
    <>
      {previewEnabled && (
        <div
          style={{
            background: "#c9a227",
            color: "#0b1f2a",
            fontSize: 13,
            fontWeight: 600,
            padding: "7px 24px",
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span>👁 Trình duyệt này đang bật chế độ Xem trước cho trang public</span>
          <a href="/api/admin/preview/disable?path=/admin" style={{ color: "#0b1f2a", fontWeight: 700 }}>
            Tắt ngay
          </a>
        </div>
      )}
      <div className="admin-topbar">
        <a href="/admin">Thùy Dương Limousine — Quản trị</a>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="admin-username" style={{ fontSize: 13, opacity: 0.85 }}>
            {session?.username}
          </span>
          <LogoutButton />
        </div>
      </div>
      <div className="admin-layout">
        <AdminNav active={active} isSuperAdmin={isSuperAdmin} />
        <main className="admin-main">{children}</main>
      </div>
    </>
  );
}
