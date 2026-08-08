import "./admin.css";

export const metadata = { title: "Quản trị | Thùy Dương Limousine", robots: { index: false, follow: false } };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}
