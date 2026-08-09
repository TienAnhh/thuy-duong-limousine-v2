import AdminShell from "@/components/admin/AdminShell";
import PriceRowForm from "@/components/admin/PriceRowForm";

export default function NewPriceRow() {
  return (
    <AdminShell active="prices">
      <p className="admin-h1">Thêm dòng giá</p>
      <div className="admin-card">
        <PriceRowForm mode="create" />
      </div>
    </AdminShell>
  );
}
