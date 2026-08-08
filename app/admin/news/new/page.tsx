import AdminShell from "@/components/admin/AdminShell";
import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <AdminShell active="news">
      <p className="admin-h1">Thêm bài viết mới</p>
      <div className="admin-card">
        <NewsForm mode="create" />
      </div>
    </AdminShell>
  );
}
