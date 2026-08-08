import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { requireSuperAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Không đủ quyền" }, { status: 403 });

  const admins = await prisma.admin.findMany({
    select: { id: true, username: true, role: true, active: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(admins);
}

export async function POST(req: NextRequest) {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Không đủ quyền" }, { status: 403 });

  const { username, password, role } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Thiếu tài khoản hoặc mật khẩu" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Mật khẩu cần ít nhất 8 ký tự" }, { status: 400 });
  }

  const existing = await prisma.admin.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ error: "Tài khoản này đã tồn tại" }, { status: 409 });
  }

  const admin = await prisma.admin.create({
    data: {
      username,
      passwordHash: await hashPassword(password),
      role: role === "superadmin" ? "superadmin" : "admin",
      active: true,
    },
    select: { id: true, username: true, role: true, active: true, createdAt: true },
  });

  return NextResponse.json(admin, { status: 201 });
}
