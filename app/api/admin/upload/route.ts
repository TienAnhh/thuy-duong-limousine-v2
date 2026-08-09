import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Thiếu file ảnh" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Chỉ chấp nhận ảnh JPEG, PNG, WEBP hoặc GIF" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Ảnh vượt quá 5MB" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const key = `uploads/${Date.now()}-${safeName}`;

  try {
    const blob = await put(key, file, { access: "public" });
    return NextResponse.json({ url: blob.url });
  } catch (err: any) {
    return NextResponse.json({ error: "Upload thất bại: " + (err?.message || "lỗi không xác định") }, { status: 500 });
  }
}
