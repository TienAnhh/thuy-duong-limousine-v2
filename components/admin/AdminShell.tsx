import LogoutButton from "./LogoutButton";

export default function AdminShell({
  active,
  children,
}: {
  active: "dashboard" | "pages" | "news" | "contacts";
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="admin-topbar">
        <a href="/admin">Thùy Dương Limousine — Quản trị</a>
        <LogoutButton />
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
          <a href="/" target="_blank" rel="noreferrer" style={{ marginTop: 16, color: "var(--admin-muted)" }}>
            ↗ Xem trang web
          </a>
        </nav>
        <main className="admin-main">{children}</main>
      </div>
    </>
  );
}
