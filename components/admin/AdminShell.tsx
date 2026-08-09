import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/session";
import { draftMode } from "next/headers";

export default async function AdminShell({
  active,
  children,
}: {
  active: "dashboard" | "pages" | "news" | "contacts" | "accounts";
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
          <span style={{ fontSize: 13, opacity: 0.85 }}>{session?.username}</span>
          <LogoutButton />
        </div>
      </div>
      <div className="admin-layout">
        <nav className="admin-nav">
          <a href="/admin" className={active === "dashboard" ? "active" : ""}>
            Tổng quan
          </a>
          <a href="/admin/pages" className={active === "pages" ? "active" : ""}>
            Trang nội dung
          </a>
          <a href="/admin/news" className={active === "news" ? "active" : ""}>
            Tin tức
          </a>
          {isSuperAdmin && (
            <a href="/admin/contacts" className={active === "contacts" ? "active" : ""}>
              Đăng ký / liên hệ
            </a>
          )}
          {isSuperAdmin && (
            <a href="/admin/accounts" className={active === "accounts" ? "active" : ""}>
              Tài khoản quản trị
            </a>
          )}
          <a href="/" target="_blank" rel="noreferrer" style={{ marginTop: 16, color: "var(--admin-muted)" }}>
            ↗ Xem trang web
          </a>
        </nav>
        <main className="admin-main">{children}</main>
      </div>
    </>
  );
}
