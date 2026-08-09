import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "/admin";
  draftMode().disable();
  return NextResponse.redirect(new URL(path.startsWith("/") ? path : "/admin", req.url));
}
