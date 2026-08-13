import { NextRequest, NextResponse } from "next/server";
import { incrementStat } from "@/lib/stats";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const type = body?.type;

  if (type !== "call" && type !== "zalo") {
    return NextResponse.json({ error: "type không hợp lệ" }, { status: 400 });
  }

  await incrementStat(type === "call" ? "callClicks" : "zaloClicks");
  return NextResponse.json({ ok: true });
}
