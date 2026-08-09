import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import PriceRowForm from "@/components/admin/PriceRowForm";

export const dynamic = "force-dynamic";

export default async function EditPriceRow({ params }: { params: { id: string } }) {
  const row = await prisma.priceRow.findUnique({ where: { id: params.id } });
  if (!row) notFound();

  return (
    <AdminShell active="prices">
      <p className="admin-h1">Sửa dòng giá: {row.route}</p>
      <div className="admin-card">
        <PriceRowForm
          mode="edit"
          rowId={row.id}
          initial={{
            route: row.route,
            price: row.price,
            duration: row.duration || "",
            note: row.note || "",
            sortOrder: row.sortOrder,
          }}
        />
      </div>
    </AdminShell>
  );
}
