/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Chặn site bị nhúng vào iframe của trang khác (chống clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Chặn trình duyệt tự đoán loại file sai lệch (giảm rủi ro thực thi mã độc)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Hạn chế lộ URL nguồn khi người dùng click sang site khác
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Bắt buộc trình duyệt luôn dùng HTTPS trong 1 năm tới, kể cả khi gõ http://
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Tắt các quyền trình duyệt không dùng tới (camera, mic, định vị...)
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
