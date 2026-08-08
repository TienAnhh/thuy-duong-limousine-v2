import { redirect } from "next/navigation";
import { requireSuperAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import AccountsManager from "@/components/admin/AccountsManager";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  const session = await requireSuperAdmin();
  if (!session) redirect("/admin");

  const accountsRaw = await prisma.admin.findMany({
    select: { id: true, username: true, role: true, active: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  const accounts = accountsRaw.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }));

  return (
    <AdminShell active="accounts">
      <p className="admin-h1">Tài khoản quản trị</p>
      <p className="admin-sub">
        Chỉ tài khoản Super Admin mới thấy và thao tác được ở trang này. Có thể khóa để tạm ngừng quyền truy cập
        của 1 tài khoản mà không cần xóa dữ liệu.
      </p>
      <AccountsManager initialAccounts={accounts} currentUserId={session.sub} />
    </AdminShell>
  );
}
