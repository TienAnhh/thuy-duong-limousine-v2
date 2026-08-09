import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "/";

  // chỉ cho phép xem trước trong nội bộ site, chặn redirect ra domain khác
  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "Đường dẫn không hợp lệ" }, { status: 400 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(path, req.url));
}
