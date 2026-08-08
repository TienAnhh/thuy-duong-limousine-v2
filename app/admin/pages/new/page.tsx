import AdminShell from "@/components/admin/AdminShell";
import PageForm from "@/components/admin/PageForm";

export default function NewPage() {
  return (
    <AdminShell active="pages">
      <p className="admin-h1">Thêm trang mới</p>
      <p className="admin-sub">Tạo trang tuyến đường hoặc dịch vụ mới — sẽ tự xuất hiện trên menu và sitemap.</p>
      <div className="admin-card">
        <PageForm mode="create" />
      </div>
    </AdminShell>
  );
}
