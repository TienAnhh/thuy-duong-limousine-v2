import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Không đủ quyền" }, { status: 403 });

  if (params.id === session.sub) {
    return NextResponse.json({ error: "Không thể tự khóa hoặc tự đổi quyền của chính mình" }, { status: 400 });
  }

  const target = await prisma.admin.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "Không tìm thấy tài khoản" }, { status: 404 });

  const data = await req.json();
  const updated = await prisma.admin.update({
    where: { id: params.id },
    data: {
      active: typeof data.active === "boolean" ? data.active : target.active,
      role: data.role === "superadmin" || data.role === "admin" ? data.role : target.role,
    },
    select: { id: true, username: true, role: true, active: true, createdAt: true },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Không đủ quyền" }, { status: 403 });

  if (params.id === session.sub) {
    return NextResponse.json({ error: "Không thể tự xóa chính mình" }, { status: 400 });
  }

  const target = await prisma.admin.findUnique({ where: { id: params.id } });
  if (!target) return NextResponse.json({ error: "Không tìm thấy tài khoản" }, { status: 404 });

  await prisma.admin.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
