import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.priceRow.findUnique({ where: { id: params.id } });
  if (!row) return NextResponse.json({ error: "Không tìm thấy dòng giá" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const row = await prisma.priceRow.findUnique({ where: { id: params.id } });
  if (!row) return NextResponse.json({ error: "Không tìm thấy dòng giá" }, { status: 404 });

  const updated = await prisma.priceRow.update({
    where: { id: params.id },
    data: {
      route: data.route ?? row.route,
      price: data.price ?? row.price,
      duration: data.duration ?? row.duration,
      note: data.note ?? row.note,
      sortOrder: data.sortOrder ?? row.sortOrder,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const row = await prisma.priceRow.findUnique({ where: { id: params.id } });
  if (!row) return NextResponse.json({ error: "Không tìm thấy dòng giá" }, { status: 404 });
  await prisma.priceRow.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
