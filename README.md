# Thùy Dương Limousine — Website + Admin

Next.js 14 (App Router) + Prisma + PostgreSQL (Neon qua Vercel).

## Cấu trúc

- `/` — trang chủ (đọc dữ liệu từ bảng `Page`, slug `home`)
- `/[slug]` — trang tuyến/dịch vụ động (mọi trang thêm qua admin tự có URL riêng)
- `/tin-tuc`, `/tin-tuc/[slug]` — danh sách và chi tiết bài viết
- `/admin` — khu vực quản trị (yêu cầu đăng nhập)
- `/sitemap.xml`, `/robots.txt` — tự sinh động từ database

## Lần đầu deploy lên Vercel

1. Import repo này vào Vercel (New Project → chọn repo).
2. Vào tab **Storage** của dự án → **Create Database** → chọn **Neon (Postgres)** → **Connect to Project**.
   Vercel sẽ tự thêm biến `DATABASE_URL` vào Environment Variables.
3. Vào **Settings → Environment Variables**, thêm thêm các biến còn lại (xem `.env.example`):
   - `AUTH_SECRET` — chuỗi ngẫu nhiên dài, dùng `openssl rand -base64 32` để tạo
   - `SEED_ADMIN_USERNAME`, `SEED_ADMIN_PASSWORD` — tài khoản admin đầu tiên
   - `SITE_URL` — domain thật, vd `https://www.duongthuylimousine.top`
4. Deploy lại (Redeploy) sau khi thêm biến môi trường.
5. Khởi tạo dữ liệu ban đầu (tài khoản admin + 4 trang mặc định) — chạy 1 lần duy nhất từ máy có `DATABASE_URL` trỏ tới database production:
   ```bash
   npm install
   npm run seed
   ```
   (Cần Node.js cài trên máy bạn, hoặc chạy qua Vercel CLI: `vercel env pull` rồi `npm run seed`.)
6. Truy cập `https://<domain>/admin/login`, đăng nhập bằng tài khoản vừa seed, **đổi mật khẩu ngay** (tính năng đổi mật khẩu sẽ bổ sung ở bản sau — tạm thời đổi bằng cách chạy lại seed với mật khẩu mới, hoặc sửa trực tiếp trong Neon Data Editor).

## Chạy thử ở máy local

```bash
npm install
cp .env.example .env   # rồi điền DATABASE_URL thật (Neon)
npm run seed
npm run dev
```

## Lưu ý quan trọng

- **`prisma generate` cần internet để tải engine** — nếu build lỗi vì không tải được binary, đó thường là do mạng bị chặn, không phải lỗi code. Vercel có mạng đầy đủ nên không gặp vấn đề này.
- Trang admin không cho index bởi Google (`robots: noindex`) — không cần lo bị lộ ra tìm kiếm.
- Xóa trang `home` bị chặn ở cả API lẫn giao diện để tránh mất trang chủ.
