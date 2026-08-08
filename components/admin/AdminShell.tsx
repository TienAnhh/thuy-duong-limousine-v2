import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/session";

export default async function AdminShell({
  active,
  children,
}: {
  active: "dashboard" | "pages" | "news" | "contacts" | "accounts";
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isSuperAdmin = session?.role === "superadmin";

  return (
    <>
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
          <a href="/admin/contacts" className={active === "contacts" ? "active" : ""}>
            Đăng ký / liên hệ
          </a>
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
