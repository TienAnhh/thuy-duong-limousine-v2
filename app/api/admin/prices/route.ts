import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.priceRow.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.route || !data.price) {
    return NextResponse.json({ error: "Thiếu tên tuyến hoặc giá vé" }, { status: 400 });
  }

  const row = await prisma.priceRow.create({
    data: {
      route: data.route,
      price: data.price,
      duration: data.duration || null,
      note: data.note || null,
      sortOrder: data.sortOrder ?? 0,
    },
  });
  await logActivity("create", "price", row.route);
  return NextResponse.json(row, { status: 201 });
}
