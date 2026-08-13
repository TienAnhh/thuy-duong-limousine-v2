import { NextResponse } from "next/server";
import { incrementStat } from "@/lib/stats";

export const dynamic = "force-dynamic";

export async function POST() {
  await incrementStat("pageViews");
  return NextResponse.json({ ok: true });
}
