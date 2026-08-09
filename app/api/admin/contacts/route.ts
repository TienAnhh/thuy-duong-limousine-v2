import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) return NextResponse.json({ error: "Không đủ quyền" }, { status: 403 });

  const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(contacts);
}
