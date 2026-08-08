import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.name || !data.phone) {
    return NextResponse.json({ error: "Vui lòng nhập họ tên và số điện thoại" }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: {
      name: String(data.name).slice(0, 200),
      phone: String(data.phone).slice(0, 30),
      route: data.route ? String(data.route).slice(0, 200) : null,
      note: data.note ? String(data.note).slice(0, 1000) : null,
    },
  });

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
