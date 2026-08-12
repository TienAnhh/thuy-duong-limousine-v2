import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import sharp from "sharp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // sharp cần Node.js runtime, không chạy được trên Edge

const MAX_SIZE = 5 * 1024 * 1024; // 5MB - giới hạn file gốc tải lên
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_DIMENSION = 1920; // đủ nét cho web, không cần giữ nguyên ảnh gốc 4000-6000px

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

  const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9\-_]/g, "-");
  const originalBuffer = Buffer.from(await file.arrayBuffer());

  // GIF thường là ảnh động - bỏ qua nén để không làm hỏng animation, upload nguyên bản
  if (file.type === "image/gif") {
    const key = `uploads/${Date.now()}-${baseName}.gif`;
    try {
      const blob = await put(key, originalBuffer, { access: "public", contentType: "image/gif" });
      return NextResponse.json({ url: blob.url });
    } catch (err: any) {
      return NextResponse.json({ error: "Upload thất bại: " + (err?.message || "lỗi không xác định") }, { status: 500 });
    }
  }

  try {
    const image = sharp(originalBuffer, { failOn: "none" });
    const metadata = await image.metadata();

    let pipeline = image.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });

    // Nhiều công cụ (Canva, Photoshop...) xuất PNG kèm kênh alpha dù ảnh
    // không hề có vùng trong suốt thật sự - kiểm tra kỹ để không giữ nhầm PNG
    let reallyTransparent = false;
    if (metadata.hasAlpha) {
      const stats = await sharp(originalBuffer).stats();
      const alphaChannel = stats.channels[stats.channels.length - 1];
      reallyTransparent = alphaChannel.min < 255;
    }

    let outputBuffer: Buffer;
    let contentType: string;
    let ext: string;

    if (reallyTransparent) {
      // Có vùng trong suốt thật (vd logo) - giữ PNG nhưng vẫn nén tối đa
      outputBuffer = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
      contentType = "image/png";
      ext = "png";
    } else {
      // Không có vùng trong suốt thật - chuyển JPEG, giảm dung lượng mạnh hơn nhiều
      outputBuffer = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      contentType = "image/jpeg";
      ext = "jpg";
    }

    const key = `uploads/${Date.now()}-${baseName}.${ext}`;
    const blob = await put(key, outputBuffer, { access: "public", contentType });

    return NextResponse.json({
      url: blob.url,
      originalSize: originalBuffer.length,
      compressedSize: outputBuffer.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Xử lý ảnh thất bại: " + (err?.message || "lỗi không xác định") }, { status: 500 });
  }
}
